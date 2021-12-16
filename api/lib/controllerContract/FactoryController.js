const FactoryContract = require("../classesContract/Factory");

module.exports = {
	async fetchPairsFromContract() {
		try {
			const contract = new FactoryContract();
			let result = await contract.fetchPairsFromContract()
				.then(async block=>{
					let result = await block;

					return result
				})
				.catch(err => {
					throw err
				})
			return result
		} catch (e) {
			throw e.message;
		}
	},

	async createPairs(token_one, token_two, wallet, privateKey) {
		try {
			let contract = new FactoryContract()
			return await contract.createPair(wallet, privateKey, token_one, token_two)
				.then(pair => {
					return pair
				})
				.catch(err => {
					throw err
				})
		} catch (err) {
			console.log("Error class contract", err);

		}
	},

	async getBlockInfo(number) {
		try {
			const contract = new FactoryContract()
			const info = await contract.getBlockInfo(number).catch(err => {
				throw err
			})
			return await info;
		} catch (err) {
			throw err;
		}
	},

	async getTransactionReceipt(txHash){
		const contract = new FactoryContract()
		const tx = await contract.getTransactionReceipt(txHash)
			.catch(err=>{throw err});
		return tx;
	},

	async getTransaction(txHash){
		const contract = new FactoryContract()
		const tx = await contract.getTransaction(txHash)
			.catch(err=>{throw err});
		return tx;
	},
}