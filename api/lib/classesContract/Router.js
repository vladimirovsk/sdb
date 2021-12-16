'use strict'
const Web3 = require('web3');
const Contract = require('./Contract')
const RouterController = require('../controllerContract/RouterControler')
const RouterAbi = global.conf.abi.SDBRouterJSON;
const BigNumber = require('bignumber.js');

module.exports = class Router extends Contract {
	constructor(address) {
		super(RouterAbi.abi, address);
		this.contract = new this.web3.eth.Contract(this.abi, address)
	}

	async quote(amountA, reserveA, reserveB){
		return await this.contract.methods.quote(new BigNumber(amountA), reserveA, reserveB).call()
			.then(result =>{return result})
			.catch(err=>{throw err})
	}

	async removeLiquidity(token_one, token_two, amount = 1000, wallet, privateKey) {
		try {
			let removeLiquidity = await Contract.removeLiquidity(
				wallet,
				privateKey,
				token_one,
				token_two,
				1000,
				0,
				0
			)
				.then(result => {
					return result
				})
				.catch(err => {
					console.log("removeLiquidity", err)
					throw err
				})
			return removeLiquidity

		} catch (err) {
			return err.message
		}
	}

	async addLiquidity(
		wallet,
		privateKey,
		tokenA,
		tokenB,
		amountADesired,
		amountBDesired,
		amountAMin,
		amountBMin,
		deadline = 1500000000000
	) {

		this.web3.eth.accounts.wallet.add({
			address: wallet,
			privateKey: privateKey
		})

		this.contract.defaultAccount = wallet;

		let liquidity = this.contract.methods.addLiquidity(
			tokenA,
			tokenB,
			BigNumber(amountADesired),
			BigNumber(amountBDesired),
			amountAMin,
			amountBMin,
			wallet,
			deadline
		).encodeABI()

		const nonce = await this.web3.eth.getTransactionCount(wallet).catch(err=>{throw err});

		return this.web3.eth.sendTransaction({
			from: wallet,
			to: this.address,
			data: liquidity,
			gas: await this.estimateGas(liquidity, wallet),
			nonce: this.web3.utils.toHex(nonce)
		}).catch(err=>{throw err})
	}

	async getAmountsOut(amount, token0, token1){
		try {
			return await this.contract.methods.getAmountsOut(amount, [token0, token1]).call()
				.then(result => {
					return result[1]
				})
				.catch(err => {
					throw err;
				})

		} catch (err) {
			throw err;
		}
	}

	async getAmountOut(amountOut, reserve){
		try {
			if (Boolean(reserve)) {
				return await this.contract.methods.getAmountOut(amountOut, reserve._reserve0, reserve._reserve1).call()
					.then(async result => {
						return await result
					})
					.catch(err => {
						throw err;
					})
			}
		} catch (err) {
			throw err;
		}
	}

	async getAmountOutReverse(amountIn, reserve){
		try {
			if (Boolean(reserve)) {
				return await this.contract.methods.getAmountOut(amountIn, reserve._reserve1, reserve._reserve0).call()
					.then(async result => {
						return await result
					})
					.catch(err => {
						throw err;
					})
			}
		} catch (err) {
			throw err;
		}
	}
}