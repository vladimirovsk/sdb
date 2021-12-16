const pairControl = require('../lib/controllerContract/PairController')
const tokenControl = require('../lib/controllerContract/TokenControler')
const stakingContract = require('../lib/controllerContract/StakingController')
const pairsDb = require('../../db/controllers/pairs')
const tokenDb = require('../../db/controllers/token')
const factoryController = require('../lib/controllerContract/FactoryController')
const TransactionChecker = require('../lib/transactionChecker');
const tokenController = require("../../db/controllers/token");
const pairController = require("../../db/controllers/pairs");
const txChecker = new TransactionChecker(global.conf.smartcontract.routerAddress);

/**
 *
 * @param address
 * @returns {Promise<null|number>}
 * lpToken: '0xBD03D753C6295c18c3B822CE7663536F15d34B20',
 * allocPoint: '1000000',
 * lastRewardBlock: '12959065',
 * accERC20PerShare: '2720000000000000000000000000000000'
 */
async function fetchStakingPool(address){

	const poolLenght = await stakingContract.poolLength();
	for (let x=0; x<poolLenght; x++){
			const info = await stakingContract.poolInfo(x);
			if (info.lpToken === address) {
				eventEmitter.emit('updateStaking', info);
				return x;
			}else
			{
				return null;
			}
	}
}

async function StartParsePairAndToken() {
	const pairsArray = await factoryController.fetchPairsFromContract()
	for (let row of pairsArray) {
		await parseFetchPairs(row)
			.catch(err => {
		        console.log("Error parse pair", err)
		        throw err;
			 })
	}
}

async function parseFetchPairs({pair, index}) {
	await pairsDb.findOnePair(pair)
		.then(async result => {
			if (!Boolean(result)) {
				const tokens = await pairControl.getTokensFromPair(pair)
					.catch(err => {
						throw err
					})
				try {
					if (Boolean(tokens.token0) && Boolean(tokens.token1)) {
						await parseRecordToken(tokens.token0)
							.catch(err=>{throw err})

						await parseRecordToken(tokens.token1)
							.catch(err=>{throw err})

						await pairsDb.createPayer({pair: pair, token0: tokens.token0, token1: tokens.token1, index: index})
					}
				} catch (e) {
					console.log("Error find tokens from pair ", pair, tokens)
				}
			} else {
				try {
					if (Boolean(result.active)) {
						await updatePairsRecord(pair).catch(err=>{throw err})
						await parseRecordToken(result.token0)
							.catch(err=>{throw err})
						await parseRecordToken(result.token1)
							.catch(err=>{throw err})

					}
				} catch (err) {
					throw err;
				}
			}
			return result;
		})
		.catch(err => {
			throw err
		})
}

async function parseRecordToken(address) {
	await tokenDb.findOneToken(address)
		.then(async (result) => {
			if (!Boolean(result)) {
				console.log("parseRecordToken", address, result)
				await tokenControl.readToken(address)
					.then(async (dataToken) => {
						console.log('dataToken', dataToken)
						await tokenDb.createToken({
							token: address,
							name: dataToken.name,
							decimals: dataToken.decimals,
							symbol: dataToken.symbol
						}).catch(err => {
							console.log('Error createToken', {
								token: address,
								dataToken
							})
							throw err;
						})
					})
					.catch((err) => {
						console.log("Error readToken ", address)
						throw err;
					})
			}
			else{
				//console.log("Update TOKEN", result.token)
			}
		})
		.catch((err) => {
			throw err
		})
}

async function updatePairsRecord(pair) {
	let totalSupply = await pairControl.totalSupply(pair).catch(err=>{throw err})
	//TODO update pool_index
	let pool_index = await fetchStakingPool(pair).catch(err=>{throw err});

	await pairControl.getCalcLiquidityFromReserves(pair)
		.then(async value => {
			if (Boolean(value)) {
				value = {...value, tvl:totalSupply, pool_index:pool_index}
				await pairsDb.editPair(pair, value)
					.catch(err => {
						console.log("Error edit pair", err)
					})
			}
		})
		.catch(err => {
			console.log("Error updatePairsRecord", pair, err)
			throw err;
		})
}

setInterval(async () => {
	await StartParsePairAndToken();
	await fetchAllAddressToken();
}, global.conf.monitoringAmount * 1000 || 60 * 60 * 1000)


module.exports = {
	StartParsePairAndToken,
	fetchAllAddressToken
}

StartParsePairAndToken();

txChecker.subscribe('newBlockHeaders');

async function fetchAllAddressToken() {
	try {
		let arrayToken = [
			global.conf.smartcontract.routerAddress,
			global.conf.smartcontract.factoryAddress,
			global.conf.smartcontract.stakingAddress
		]
		await tokenController.findAllToken()
			.then(async token => {
				token.map(async row => {
					arrayToken.push(row.token)
				})
			})
			.catch(err => {
				throw err
			});

		await pairController.findAllPair()
			.then(async (pair) => {
				pair.map(async row => {
					arrayToken.push(await row.pair)
				})

			})
			.catch(err => {
				throw err
			});
		global. arrayTokens = arrayToken;
	} catch (err) {
		throw err;
	}

}
