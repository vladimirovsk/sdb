const pairControl = require('../lib/controllerContract/PairController')
const pairs = require('../../db/controllers/pairs')
const txPair = require('../../db/controllers/txPair')
const {validateAddress} = require("../lib/controllerContract/TokenControler");

setInterval(() => {
	pairs.findAllPair()
		.then(rows => {
			if (Boolean(rows)) {
				rows.map(async row => {
					let pair_id = await row.id;
					let pair_address = await row.pair;
					if (pair_id !== undefined && await validateAddress(pair_address)) {
						await pairControl.getReserves(pair_address)
							.then(async reserve => {
								if (Boolean(reserve)) {
									await pairControl.calcValue(reserve, Boolean(reserve._reserve0 === reserve._reserve1))
										.then(async result => {
											if (Boolean(result)) {
												//TODO add write new value24, value7 to DB_PAIR
												eventEmitter.emit("writeValuesToPair", {pair_id})
												await txPair.createTxPair({
													volume: result, fee: 0, pair_id: pair_id
												}).catch(err => {
													throw err;
												})
											}
											return result
										})
										.catch(err => {
											throw err;
										})
								}
							})
							.catch((err) => {
								throw err;
							})
					} else {
						console.log("Error parse pair_id", pair_id)
					}
				})
			}
		})
		.catch(err => {
			throw err
		})
}, global.conf.monitoringAmount * 1000 || 60 * 60 * 1000)