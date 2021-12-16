const ClassPair = require("../classesContract/Pair");
const DbControllerPair = require("../../../db/controllers/pairs")
const DBControllerTxPair = require("../../../db/controllers/txPair")
const BigNumber = require('bignumber.js');

module.exports = {
	async getTokensFromPair(address) {
		try {
			const pair = new ClassPair(address);
			const token0 = await pair.getToken0(address)
				.catch(err => {
					throw err
				});
			const token1 = await pair.getToken1(address)
				.catch(err => {
					throw err
				});
			return {token0, token1}
		} catch (err) {
			throw err;
		}
	},

	async getPairAddressFromTokens(token0, token1){
		return await DbControllerPair.findPairsFromTokens(token0, token1)
			.then(rows =>{
				 	return rows
			})
			.catch(err=>{throw err})
	},

	async getReserves(address) {
		try {
			const pair = new ClassPair(address);
			return await pair.getReserves()
				.then(reserve => {
					return  reserve
				})
				.catch(err => {
					throw err
				});
		}catch (err) {
			throw err

		}
	},

	async calcTokenSumValue(token, rows) {
		const value = rows.map(async (row) => {
			let reserve = await this.getReserves(row.pair).catch(err => {throw err})

			let calcToken = await this.calcReserveFromToken(token, row, reserve).catch(err => {
				throw err
			})
			//console.log("CALC TOKEN", calcToken, token)
			return calcToken;
		})

		 return await Promise.all(value)
		 	.then(tokensValue=>{
				let summaValue = 0;
				let summaPrice = 0;
					tokensValue.map(rowValue=>{
						summaValue =  summaValue + rowValue.valueReserve;
						summaPrice = summaPrice + rowValue.priceReserve;
					})
					summaPrice = new BigNumber((summaPrice /  tokensValue.length), 10).toString(10);
					return {summaValue, summaPrice , tokenDetail: tokensValue}

		 	})
		 	.catch(err=>{throw err})
	},

	async calcReserveFromToken(token, rowPair, result) {
		try {
			let valueReserve = 0;
			return await this.calcValue(result, Boolean(rowPair.token0 === token))
				.then(async priceReserve =>{
					if (rowPair.token0 === token) {
						valueReserve =  parseInt(await result._reserve0)
					}else{
						valueReserve =  parseInt(await result._reserve1)
					}
					return {valueReserve, priceReserve}

				})
				.catch(err=>{
					return {valueReserve:0, priceReserve:0}
					//throw err
				})
		}catch (err){
			console.log("Error calcReserveFromToken", err.message)
		}
	},

	async getCalcLiquidity(token0, token1, amountIn) {
		try {
			const ObjectPair = await this.getPairAddressFromTokens(token0, token1)
			if (Boolean(ObjectPair)) {
				const pair = new ClassPair(ObjectPair[0].pair)
				return await pair.calcLiquidity(amountIn, token0, token1, ObjectPair)
					.catch(err => {
						throw err
					})
			}
		} catch (err) {
			throw "Error getCalcLiquidity " + err.message;
		}
	},

	async getCalcLiquidityFromReserves(address) {
		const pair = new ClassPair(address);
		return await pair.calcLiquidityFromReserves()
			.catch(err => {
				throw err
			})
	},

	async calcValue(reserve, revers = false) {
		if (revers) {
			if (parseInt(reserve._reserve1) !== 0) {
				return parseInt(reserve._reserve0) / parseInt(reserve._reserve1);
			} else {
				return 1
			}
		} else {
			if (parseInt(reserve._reserve0) !== 0) {
				return parseInt(reserve._reserve1) / parseInt(reserve._reserve0);
			} else {
				return 1
			}
		}
	},

	async writeValue24(pair_id){
		const rowValues = await DBControllerTxPair.calcVolumePeriod({pair_id, day:1}).catch(err=>{throw err})
		await DbControllerPair.setValue24({volume:rowValues.volume, pair_id})
	},

	async writeValue7D(pair_id){
		const rowValues = await DBControllerTxPair.calcVolumePeriod({pair_id, day:7}).catch(err=>{throw err})
		await DbControllerPair.setValue7D({volume:rowValues.volume, pair_id})
	},

	async getBalance(address){
		const pair = new ClassPair(address)
		return await pair.getBalance(address)
			.catch(err=>{throw err})
	},

	async balanceOf(address){
		const pair = new ClassPair(address)
		return await pair.balanceOf()
			.catch(err=>{throw err})
	},

	async totalSupply(address){
		const pair = new ClassPair(address)
		return await pair.totalSupply()
			.catch(err=>{throw err})
	}


}
