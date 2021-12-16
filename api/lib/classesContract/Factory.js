const Contract = require('./Contract')
const SDBswapFactory = global.conf.abi.SDBswapFactoryJSON;

module.exports = class Pair extends Contract {
	constructor() {
		super(SDBswapFactory.abi, global.conf.smartcontract.factoryAddress);
		this.contract = new this.web3.eth.Contract(this.abi, this.address)
	}

	async allPairs(number) {
		return await this.contract.methods.allPairs(number).call()
			.catch(err => {
				throw err
			})
	}

	async allPairsLength() {
		return await this.contract.methods.allPairsLength().call()
			.catch(err => {
				throw err
			})
	}

	async getPair(token0, token1) {
		return await this.contract.methods.getPair(token0, token1).call()
			.catch(err => {
				throw err
			})
	}

	async fetchPairsFromContract(){
		let countPair = await this.contract.methods.allPairsLength().call()
			.catch(err => {
				throw err
			})
		let pairs =[]
		for (let indexPair = 0; indexPair<countPair; indexPair++){
			const pair = await this.allPairs(indexPair)
			pairs.push({pair, index:indexPair})
		}
		return pairs;
	}

	async fetchPairCreated() {
		try {
			console.log('Fetch pair created transactions...');
			const filter = {fromBlock: 0, toBlock: 'latest'};
			const event = await this.contract.getPastEvents("PairCreated", filter)
				.then(async event => {
					return await event
				})
				.catch((err) => {
					console.log("Error fetchPairCreated", err.message)
					//return null
					throw err;
				})
			return event;
		} catch (err) {
			throw err;
		}
	}

	async createPair(wallet, privateKey, token_one, token_two) {
		try {
			this.web3.eth.accounts.wallet.add({
				address: wallet,
				privateKey: privateKey
			})

			let pairs_encode = await this.contract.methods.createPair(token_one, token_two).encodeABI()

			let result = await this.web3.eth.sendTransaction({
				from: wallet,
				to: this.contractAddress,
				data: pairs_encode,
				gas: await this.estimateGas(pairs_encode, wallet),
				nonce: this.web3.utils.toHex(this.nonce)
			}).catch(err=>{throw err})
			return result

		} catch (err) {
			throw err
		}
	}

	async getBlockInfo(number) {
		try {
			return await this.web3.eth.getBlock(number)
				.then(result => {
					return result
				})
				.catch(err => {
					console.log(err)
				})
		} catch (err) {
			throw err;
		}
	}

	async getTransaction(txHash){
		try {
			return await this.web3.eth.getTransaction(txHash)
				.then(result => {
					return result
				})
				.catch(err => {
					console.log(err)
				})
		} catch (err) {
			throw err;
		}
	}

	async getTransactionReceipt(txHash){
		try {
			return await this.web3.eth.getTransactionReceipt(txHash)
				.then(result => {
					return result
				})
				.catch(err => {
					console.log(err)
				})
		} catch (err) {
			throw err;
		}
	}




}