'use strict'
const Web3 = require('web3');
const Web3WsProvider = require('web3-providers-ws');

const options = {
	timeout: 30000,
	clientConfig: {
		// Useful if requests are large
		maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
		maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
		// Useful to keep a connection alive
		keepalive: true,
		keepaliveInterval: 60000 // ms
	},
	reconnect: {
		auto: true,
		maxAttempts: 0,
		onTimeout: true
	}
}

/**
 * Default array tokens from all contracts
 * @type {*[]}
 */
module.exports = class TransactionChecker {
	web3ws
	provider_ws
	address

	constructor(address) {
		this.provider_ws = new Web3WsProvider(global.conf.uri_ws, options)
		this.address = address;
		this.web3ws = new Web3(this.provider_ws);

		 this.provider_ws.on('connect', function () {
		  	console.log('microservis ws connected');
		 });

		 this.provider_ws.on('error', err => {
			 console.log('WS Error', err);
			 this.provider_ws = new Web3.providers.WebsocketProvider(global.conf.uri_ws);
		 	 this.web3ws.setProvider(this.provider_ws);
		 });

		 this.provider_ws.on('end', async () => {
			 console.log('WS closed');
			 console.log('Attempting to reconnect...');
			 this.provider_ws = new Web3.providers.WebsocketProvider(global.conf.uri_ws);
			 this.web3ws.setProvider(this.provider_ws);
		 });
	}

	subscribe(topic) {
		this.subscription = this.web3ws.eth.subscribe(topic, async (err, res) => {
			if (err) {
				console.error('Error subscribe')
			} else {
				if (Boolean(res.number)) {
					console.log(res.number)
					this.web3ws.eth.getBlock(res.number).then(async blockData => {
						if (blockData !== undefined) {
							if (typeof blockData.transactions !== undefined) {
								for (let txHash of blockData.transactions) {
									this.web3ws.eth.getTransaction(txHash)
										.then(async tx => {
											if (Boolean(tx) && Boolean(tx.to)) {
												if (Boolean(checkAvailability(global.arrayTokens, (tx.to).toString()))) {
													let receipt = await this.web3ws.eth.getTransactionReceipt(txHash).catch(err=>{throw err})
													eventEmitter.emit('addTransaction', {tx, receipt})
												}
											}
										})
										.catch(err => {
//									 		throw err
										})
								}
							}
						}
					})
				}
			}
		});

		this.subscription.on('connected', (result, error) => {
			if (!error) {
				console.log('subscription connected', result)
			} else {
				console.log("subscription connected error", error)
			}
		})
	}
}

function checkAvailability(arr, val) {
	try {
		return arr.some(arrVal => val === arrVal)
	} catch (e) {
		return false;
	}
}












