'use strict'

const Web3 = require('web3');
const Contract = require('./Contract')
const SDBPair = global.conf.abi.SDBPairJSON;
const RouterController = require('../controllerContract/RouterControler');
const BigNumber = require('bignumber.js');

module.exports = class Pair extends Contract {
	constructor(address) {
		super(SDBPair.abi, address);
		this.contract = new this.web3.eth.Contract(this.abi, address)
	}

	async getToken0(){
		return await this.contract.methods.token0().call()
			.catch(err=>{throw err})
	}

	async getToken1(){
		return await this.contract.methods.token1().call()
			.catch(err=>{throw err})
	}

	async getName() {
		let name = await this.contract.methods.name()
			.call().catch(err=>{throw err})
		return name;
	}

	async getReserves() {
		try {
			let reserve = await this.contract.methods.getReserves().call()
				.then(async result => {
					return await result
				})
				.catch(err => {
					throw err;
				})
			let decimal = await this.contract.methods.decimals().call()
				.then(async result => {
					return await result
				})
				.catch(err => {
					throw err;
				})
			 return {_reserve0: reserve._reserve0, _reserve1: reserve._reserve1, decimal: decimal}
		}catch (err) {
			throw err;

		}
	}

	async balanceOf() {
		return await this.contract.methods.balanceOf(this.address).call()
			.then(result => {
				return Web3.utils.fromWei(result, 'ether');
			})
			.catch(err => {
				throw err
			})
	}

	async calcLiquidityFromReserves(){
		try{
			let symbol = await this.contract.methods.symbol().call()
				.then(result => {
					return result
				})
				.catch(err => {
					throw err;
				})

			let name = await this.contract.methods.name().call()
				.then(result => {
					return result
				})
				.catch(err => {
					throw err;
				})

			let decimals = await this.contract.methods.decimals().call()
				.then(result => {
					return result
				})
				.catch(err => {
					throw err;
				})

			let reserves = await this.contract.methods.getReserves().call()
				.then(result => {
					return result
				})
				.catch(err => {
					throw err;
				})

			let price0CumulativeLast = await this.contract.methods.price0CumulativeLast().call()
				.then(result => {
					return result
				})
				.catch(err => {
					throw err;
				})

			let price1CumulativeLast = await this.contract.methods.price1CumulativeLast().call()
				.then(result => {
					return result
				})
				.catch(err => {
					throw err;
				})

			const ETHER = Math.pow(10, 18);
			let reserve0 = reserves._reserve0;
			let reserve1 = reserves._reserve1;
			let liquidity = 0;
			if (Number(reserve1 > 0) && Number(reserve0 > 0)) {
				liquidity = (Number(reserve0) / Number(Math.pow(10, decimals))) / (Number(reserve1) / Number(ETHER));
				return {reserve0, reserve1, price0CumulativeLast, price1CumulativeLast, decimals, liquidity, name, symbol}
			}else{
				return {reserve0:0, reserve1:0, price0CumulativeLast, price1CumulativeLast, decimals, liquidity:0, name, symbol}

			}
		}catch (err) {
			throw {error: "Error calcLiquidityFromReserves", err}
		}
	}

	async calcLiquidity(amountIn, token0, token1, ObjectPair) {
		try {
			let decimals = await this.contract.methods.decimals().call()
				.then(result => {
					return result
				})
				.catch(err => {
					throw err;
				})

			let reserves = await this.contract.methods.getReserves().call()
				.then(result => {
					return result
				})
				.catch(err => {
					throw err.message;
				})
			let reserve0 = reserves._reserve0;
			let reserve1 = reserves._reserve1;
			let revers = false;

			if (!Boolean(token0 === ObjectPair[0].token0)) {
				reserve0 = reserves._reserve1;
				reserve1 = reserves._reserve0;
				revers = true;
			}

			if (Number(reserve0 > 0) && Number(reserve0 > 0)) {
				let amount_uint = new BigNumber(amountIn*Math.pow(10, decimals), 10).toString(10)
				let quote = await RouterController.quote(new BigNumber(amount_uint), reserve0, reserve1)
					.then(result => {
						return result
					})
					.catch(err => {
						throw err
					})
				return {reserve0, reserve1, decimals, liquidity: quote, amount_uint:amount_uint, result_uint: quote, revers}
			} else {
				throw `Error calcLiquidity ${reserve0}, ${reserve1}, ${decimals}`
			}

		}catch (err) {
			throw err.message;
		}

	}

	async totalSupply(){
		return await this.contract.methods.totalSupply().call()
			.then(result => {
				return result;
			})
			.catch(err => {
				throw err
			})
	}
}