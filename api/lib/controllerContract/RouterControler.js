const ClassRouter = require("../classesContract/Router");

module.exports = {

	async quote(amountA, reserveA, reserveB){
		try{
			const router = new ClassRouter(global.conf.smartcontract.routerAddress);
			return await router.quote(amountA, reserveA, reserveB)
				.catch(err=>{throw err});
		}
		catch (err) {
			throw err;
		}
	},

	async addLiquidity(token_one, token_two, amountA, amountB, amountAMin, amountBMin, wallet, privateKey) {
		try {
			const router = new ClassRouter(global.conf.smartcontract.routerAddress);
		    return  await router.addLiquidity(
		        wallet,
		        privateKey,
				token_one,
				token_two,
				amountA,
				amountB,
				1,
				1
			)
				.then(result =>{return result})
				.catch(err=>{throw err});
		} catch (err) {
			return err.message
		}
	},

	async getAmountsOut(amount, token0, token1){
		try {
			const contract = new ClassRouter(global.conf.smartcontract.routerAddress);
			return await contract.getAmountsOut(amount, token0, token1)
				.then(data => {
					return data
				})
				.catch(err => {
					throw err;
				})
		}catch (err){
			throw err;
		}
	},

	async getAmountOut(amountOut, reserve) {
		try {
			const contract = new ClassRouter(global.conf.smartcontract.routerAddress);
			return await contract.getAmountOut(amountOut, reserve)
				.then( data=>{return data})
				.catch(err=>{
					throw err
				})
		}catch (err) {
			throw err;
		}
	},

	async getAmountOutReverse(amountIn, reserve) {
		try {
			const contract = new ClassRouter(global.conf.smartcontract.routerAddress)
			return await contract.getAmountOutReverse(amountIn, reserve)
				.then( data=>{return data})
				.catch(err=>{
					throw err
				})
		}catch (err) {
			throw err;
		}
	},

}