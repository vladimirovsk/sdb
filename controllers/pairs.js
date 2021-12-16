const Pairs = require('../db/controllers/pairs')
const Tokens = require('../db/controllers/token')
const auth = require('../api/lib/auth')
const pairController = require("../api/lib/controllerContract/PairController");
const routerController = require("../api/lib/controllerContract/RouterControler");
const {checkParams} = require("./helpers/helpController");

const BigNumber = require('bignumber.js');

const TxPair = require('../db/controllers/txPair')

module.exports = class PairsController {

    async getInfoLPTokens(req, res) {
        const {authorization} = req.headers;
        await auth.checkJWT(authorization)
            .then((data) => {
                Pairs.fetchAllPairs({})
                    .then(async data => {
                        let total = new BigNumber(0, 10);
                        let rows = [];
                        data.rows.forEach((item, index) => {
                            total = BigNumber(item.tvl, 10).plus(total);
                            rows.push({
                                id: item.id,
                                code: item.code,
                                pair: item.pair,
                                symbol:item.symbol,
                                token0_code: item.token0_code,
                                token1_code: item.token1_code,
                                image0: item.image0,
                                image1: item.image1,
                                token0: item.token0,
                                token1: item.token1,
                                tvl: BigNumber(item.tvl).toString(10)
                            })
                        })
                        res.status(200).json({
                            total: total.toString(10),
                            rows: rows
                        })
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(err.code).json({message: err.message})
            })

    }

    async pairEditParams(req, res) {
        const {address, earn, swap} = req.body;
        const {authorization} = req.headers;
        await auth.checkJWT(authorization)
            .then(async () => {
                await checkParams(swap, 'swap');
                await checkParams(earn, 'earn');
                await checkParams(address, 'address');
                Pairs.pairEditParams(req.body)
                    .then(edited => {
                            res.status(200).json({edited})
                        }
                    )
                    .catch(err => {
                        res.status(err.code).json({err: err.message})
                    })
            })
            .catch(err => {
                res.status(err.code).json({err: err.message})
            })
    }

    async setStatus(req, res) {
        const {address} = req.body;
        const {authorization} = req.headers;
        await auth.checkJWT(authorization)
            .then(async () => {
                await checkParams(address, 'address')
                Pairs.setStatusPair(req.body)
                    .then(async status => {
                         await Pairs.findOnePair(address).then(async pair=>{
                             await Tokens.setStatusToken({status:status, address:pair.token0})
                                 .catch(err=>{throw {code:422, message:err.message}});
                             await Tokens.setStatusToken({status:status, address:pair.token1})
                                 .catch(err=>{throw {code:422, message:err.message}});
                         })
                            res.status(200).json({status})
                        }
                    )
                    .catch(err => {
                        res.status(422).json({err: err.message})
                    })
            })
            .catch(err => {
                res.status(err.code).json({err: err.message})
            })
    }

    async setStaking(req, res) {
        const {address} = req.body;
        const {authorization} = req.headers;
        await auth.checkJWT(authorization)
            .then(async () => {
                await checkParams(address, 'address')
                Pairs.setStakingPair(req.body)
                    .then(staking => {
                            res.status(200).json({staking})
                        }
                    )
                    .catch(err => {
                        res.status(err.code).json({err: err.message})
                    })
            })
            .catch(err => {
                res.status(err.code).json({err: err.message})
            })
    }

    async createPairs(req, res) {
        try {
            const {token, name, pair, token0, token1} = req.body;
            await auth.checkJWT(token)
                .then(async () => {
                    await checkParams(name, 'name');
                    await checkParams(pair, 'pair');
                    await checkParams(token0, 'token0');
                    await checkParams(token1, 'token1');
                    await Pairs.createPayer(req.body)
                        .then(newPayer => {
                                res.status(200).json({data: newPayer})
                            }
                        )
                        .catch(err => {
                            throw {code: 403, message: err.message}
                        })
                })
                .catch(err => {
                    throw err
                })
        } catch (err) {
            res.status(err.code).json({err: err.message})
        }
    }

    async fetchPairHistoryHour(req, res) {
        try {
            const {pair, current_page, limit} = req.query;
            await checkParams(pair, 'pair');
            await TxPair.fetchPairHistoryHour({pair, current_page, limit})
                .then((history) => {
                    res.status(200).json(history)
                })
                .catch(err => {
                    throw {code: 403, message: err.message}
                })
        } catch (err) {
            res.status(400).json({err: err})
        }
    }

    async fetchPairHistoryDay(req, res) {
        try {
            const {pair, current_page, limit} = req.query;
            await checkParams(pair, 'pair');
            await TxPair.fetchPairHistoryDay({pair, current_page, limit})
                .then((history) => {
                    res.status(200).json(history)
                })
                .catch(err => {
                    throw {code: 403, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({err: err.message})
        }
    }

    async fetchPairsFromToken(req, res) {
        const {address} = req.params;
        await checkParams(address, 'address');
        try {
            await Pairs.findOnePair(address)
                .then(async pairs => {
                    res.status(200).json(pairs)
                })
                .catch((err) => {
                    throw {code: 403, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({err: err.message})
        }
    }

    async fetchPairs(req, res) {
        try {
            const {current_page = 1, limit = 15, address} = req.query;
            await Pairs.fetchList({current_page, limit, address})
                .then(async pairs => {
                    res.status(200).json(pairs)
                })
                .catch((err) => {
                    throw {code: 403, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({err: err.message})
        }
    }

    async fetchAllPairs(req, res) {
        try {
            const {current_page = 1, limit = 15, address} = req.query;
            const {authorization} = req.headers;
            await auth.checkJWT(authorization)
                .then(async () => {
                    await Pairs.fetchAllPairs({current_page, limit, address})
                        .then(async pairs => {
                            res.status(200).json(pairs)
                        })
                        .catch((err) => {
                            throw {code: 403, message: err.message}
                        })
                })
                .catch(err => {
                    throw {code: 401, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({err: err.message})
        }
    }

    async findPairs(req, res) {
        const {code, current_page = 1, limit = 15} = req.query;
        try {
            await Pairs.findPairs({code, current_page, limit})
                .then(rows => {
                    res.status(200).json(rows)
                })
                .catch((err) => {
                        throw {code: 403, message: err.message}
                    }
                );
        } catch (err) {
            res.status(err.code).json({err: err.message})
        }
    }

    async selectTokenInPair(req, res) {
        const {tokenIn} = req.query;
        try {
            await checkParams(tokenIn, 'tokenIn');
            await Pairs.selectTokenInPair(tokenIn)
                .then(async data => {
                    res.status(200).json(data)
                })
                .catch(err => {
                    throw {code: 403, message: err.message}
                })
        } catch
            (err) {
            res.status(err.code).json({err: err.message})
        }
    }

    async calcLiquidity(req, res) {
        try {
            const {token0, token1, amountIn} = req.query;
            await checkParams(amountIn, 'amountIn');
            await checkParams(token0, 'token0');
            await checkParams(token1, 'token1');
            await pairController.getCalcLiquidity(token0, token1, amountIn)
                .then(calc => {
                    res.status(200).json(calc)
                })
                .catch(err => {
                    throw {code: 403, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({err: err.message})
        }
    }

    async calcSwap(req, res) {
        const {token0, token1, amountIn = 0} = req.query;
        try {
            await checkParams(amountIn, 'amountIn');
            await checkParams(token0, 'token0');
            await checkParams(token1, 'token1');
            await Pairs.findPairsFromTokens(token0, token1)
                .then(rows => {
                    if (rows.length === 0) {
                        throw 'Dont found pair from tokens'
                    }
                    return rows.map(async (row) => {
                        await pairController.getReserves(row.pair)
                            .then(async data => {
                                let reserve = await data;
                                BigNumber.config({DECIMAL_PLACES: 0})

                                let amount_uint = new BigNumber(amountIn * Math.pow(10, reserve.decimal), 10)
                                if (Boolean(reserve)) {
                                    let revers = !Boolean(row.token0 === token0);
                                    let result_uint_token = await routerController.getAmountsOut(amount_uint, token0, token1)
                                        .catch(err => {
                                            throw err
                                        })
                                    // let result_uint = await routerController.getAmountOut(amount_uint, reserve)
                                    // 	.catch(err => {throw err})

                                    let value = await pairController.calcValue(reserve, revers).catch(() => {
                                        return null
                                    })
                                    let amount_uint_str = new BigNumber(amount_uint).toString(10);
                                    let result_uint_str = new BigNumber(result_uint_token).toString(10);
                                    let result_uint_token_str = new BigNumber(result_uint_token).toString(10);

                                    let result_uint_reserve = (new BigNumber(amount_uint * new BigNumber(value)).toString(10));
                                    res.status(200).json({
                                        revers,
                                        amount_uint: amount_uint_str,
                                        result_uint: result_uint_token_str,
                                        result_uint_token_str,
                                        result_uint_reserve,
                                        reserve,
                                    })
                                } else {
                                    res.status(400).json({"error": "Dont count reserve"})
                                }
                            })
                            .catch(err => {
                                res.status(400).json({"error": "Dont count reserve", code: err})
                                throw err
                            })
                    })
                })
                .catch(err => {
                    throw {code: 403, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({err: err.message})
        }
    }

    async calcToken(req, res) {
        try {
            const {token} = req.query;
            await checkParams(token, 'token');
            /**Returning all pairs from databases selected in tokens
             */
            await Pairs.fetchPairsListFromToken(token)
                .then(async rows => {
                    const summa = await pairController.calcTokenSumValue(token, rows)
                    res.status(200).json({
                        summaValue: summa.summaValue,
                        summaPrice: summa.summaPrice,
                        tokenDetail: summa.tokenDetail,
                    })
                })
                .catch(err => {
                    throw {code: 403, message: err.message}
                })

        } catch
            (err) {
            res.status(err.code).json({err: err.message})
        }
    }
}

