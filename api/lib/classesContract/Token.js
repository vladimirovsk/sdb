'use strict'
const Web3 = require('web3');
const Contract = require('./Contract')
const BEP20 = global.conf.abi.BEP20JSON
const BigNumber = require('bignumber.js');

module.exports = class Token extends Contract {
	constructor(address) {
		super(BEP20.abi, address);
		this.contract = new this.web3.eth.Contract(this.abi, this.address)
	}

	async validateAddress() {
		try {
			return Web3.utils.isAddress(this.address);
		} catch (e) {
			console.log("Error validate address", e.message)
			return false
		}
	}

	async getName() {
		return await this.contract.methods.name().call()
			.catch(err=>{throw err})
	}

	async getSymbol() {
		return await this.contract.methods.symbol().call().catch(err=>{throw err})
	}

	async balanceOf() {
		return await this.contract.methods.balanceOf(this.address).call()
			.then(result => {
				return Math.pow(result, -18)
			})
			.catch(err => {
				throw err
			})
	}

	async totalSupply() {
		return await this.contract.methods.totalSupply().call()
			.then(async (result) => {
				let decimal = await this.decimals();
				let param = BigNumber(result*Math.pow(10, -1*decimal), 10).toString(10)
				// return Web3.utils.fromWei(result, 'ether');
				return param
			})
			.catch(err => {
				throw err
			})
	}

	async decimals() {
		return await this.contract.methods.decimals().call()
			.catch(err => {
				throw err;
			})
	}

	async tokenRead() {
		try {
			let symbol = await this.contract.methods.symbol().call()
				.catch(err => {
					throw err;
				})

			let name = await this.contract.methods.name().call()
				.catch(err => {
					throw err;
				})

			let decimals = await this.contract.methods.decimals().call()
					.catch(err => {
						throw err;
					})
			return {name, decimals, symbol}

		}catch (err) {
			console.log("Error tokenRead()", err.message)
		}
	}

	async approveToken(RouterAddress, amount, wallet, secretKey) {
		try {
			let approve = this.contract.methods.approve(RouterAddress, new BigNumber(amount)).encodeABI()
			this.web3.eth.accounts.wallet.add({
				address: wallet,
				privateKey: secretKey
			})

			return this.web3.eth.sendTransaction({
				from: wallet,
				to: this.address,
				data: approve,
				gas: await this.estimateGas(approve, wallet),
				nonce: this.web3.utils.toHex(this.nonce)
			})
				.then(result => {
					return result
				})
				.catch(err => {
					console.log('ApproveToken, sendTransaction', err)
					throw err
				})

		} catch (e) {
			throw e
		}
	}
}