const pairControl = require('../lib/controllerContract/PairController')
const tokenDb = require('../../db/controllers/token')
const txTokenDb = require('../../db/controllers/txToken')
const pairsDb = require("../../db/controllers/pairs");
const tokenControl = require("../lib/controllerContract/TokenControler");

setInterval(async () => {
	await tokenDb.findAllToken()
		.then(arrayToken => {
			arrayToken.map(async row => {
				let token_id = row.id;
				let summaValue = 0;
				let summaPrice = 0;

				const summa = await pairsDb.fetchPairsListFromToken(row.token)
					.then(async pairsList => {
						if (Boolean(pairsList.length > 0)) {
							return await pairControl.calcTokenSumValue(row.token, pairsList)
								.then(summa => {
									return summa
								})
								.catch(err => {

									throw err;
								})
						}
					})
					.catch(err => {
						throw err
					})

				const value24 = await txTokenDb.findAllSumValuesFromToken({token_id: token_id})
					.then(async value24 => {
						return await value24
					})
					.catch(err => {
						throw err
					})

				const price24 = await txTokenDb.findPrice24FromToken({token_id: token_id})
					.then(price24 => {
						return price24
					})
					.catch(err => {
						throw err
					})

				const dataToken = await tokenControl.readToken(row.token)
					.then(dataToken => {
						return dataToken
					})
					.catch(err => {
						throw err
					})

				try {
					if (Boolean(summa.summaValue)) {
						summaValue = summa.summaValue
					}
				}catch(e) {
					console.log("ERROR SUMMA VALUE", summa, token_id, price24, dataToken)
					summaValue = 0
				}

				try {
					if (Boolean(summa.summaPrice)) {
						summaPrice = summa.summaPrice
					}
				}catch (e) {
					console.log("ERROR SUMMA PRICE", summa, token_id, price24, dataToken)
					summaPrice = 0
				}

					const data = {
						token: row.token,
						liquidity: summaValue,
						volume_24: value24,
						price24: price24,
						price: summaPrice,
						symbol: dataToken
					}

					tokenDb.editToken(data)
						.then((row) => {
						})
						.catch(err => {
							console.log("Error edit token", err)
						})

					txTokenDb.createTxToken({
						volume: summaValue,
						price: summaPrice,
						fee: 0,
						token_id: token_id,
					}).catch(err => {
						console.log("Error createTxToken", err)
					})

			})
		}).catch(err => {
			console.log("Error createTxToken", err.message)
		})

}, global.conf.monitoringAmount * 1000 || 60 * 60 * 1000)