const ClassToken = require("../classesContract/Token");

module.exports = {
	async validateAddress(address) {
		try {
			const token = new ClassToken(address);
			return await token.validateAddress();
		}catch (e) {
			throw err;
		}
	},

	async readToken(address) {
		const token = new ClassToken(address);
		return await token.tokenRead().catch(err=>{
			throw err
		});
	},

	async ApproveToken(address, amount, wallet, privateKey) {
		const token = new ClassToken(address);
		return await token.approveToken(address, amount, wallet, privateKey)
			.then(async result => {
				return await result
			})
			.catch(err => {
				console.log("Error ApproveToken", err)
				throw err
			})
	},

	async BalanceOf(address) {
		const token = new ClassToken(address)
		const name = await token.getName().catch(err => {
			throw err
		})
		const symbol = await token.getSymbol().catch(err => {
			throw err
		})
		const balance = await token.balanceOf().catch(err => {
			throw err
		})
		return {balance, name, symbol}
	},

	async totalSupply(address) {
		const token = new ClassToken(address)
		return await token.totalSupply()
			.then((result)=>{return result})
			.catch((err) => {
			throw err
		})
	}
}