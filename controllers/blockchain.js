const smart = require('../api/lib/smartcontract')
const router = require('../api/lib/controllerContract/RouterControler')
const tokenControler = require('../api/lib/controllerContract/TokenControler');
const factoryControler = require('../api/lib/controllerContract/FactoryController');
const txToken = require('../db/controllers/txToken');
const auth = require('../api/lib/auth');
const {checkParams} = require("./helpers/helpController");

module.exports = class BlockchainController {

    async infoFromHome(req, res) {
        try {
            const supply = await tokenControler.totalSupply(global.conf.smartcontract.addressSDB)
                .then(async row => {
                    return await row
                })
                .catch(err => {
                    throw {code: 403, message: err.message}
                })

            const token = await txToken.findAllSumValuesFromToken({
                token_id: 1
            }).catch(err => {
                throw {code: 403, message: err.message}
            })

            res.status(200).json({
                sdbHarvest: 0,
                totalValueLocked: token,
                aprInFarms: 0,
                totalMinted: 0,
                totalSupply: supply,
                totalBurned: 0,
            })

        } catch (err) {
            res.status(err.code).json({"error": err.message})
        }
    }

    async getBlockInfo(req, res) {
        const {number} = req.query;
        await factoryControler.getBlockInfo(number)
            .then(async block => {
                await checkParams(number, 'number');
                res.status(200).json(block)
            })
            .catch(err => {
                res.status(err.code).json({message: err.message})
            })
    }

    async approveToken(req, res) {
        const {token, address, amount, privateKey} = req.body;
        await auth.checkJWT(token)
            .then(async (decode) => {
                const {invoice} = decode;
                await checkParams(address, 'address');
                await checkParams(privateKey, 'privateKey');
                await checkParams(amount, 'amount');
                await tokenControler.ApproveToken(address, amount, invoice, privateKey)
                    .then(async row => {
                        res.status(200).json({"approve": row})
                    })
                    .catch(err => {
                        throw {code: 403, message: err.message}
                    })
            })
            .catch(err => {
                res.status(err.code).json({message: err.message})
            });
    }

    async createPair(req, res) {
        const {token, token_one, token_two, privateKey} = req.body;
        await auth.checkJWT(token)
            .then(async (decode) => {
                const {invoice} = decode;
                await checkParams(token_one, 'token_one');
                await checkParams(token_two, 'token_two');
                await checkParams(privateKey, 'privateKey');

                await factoryControler.createPairs(token_one, token_two, invoice, privateKey)
                    .then(row => {
                        res.status(200).json({"pair": row})
                    })
                    .catch(err => {
                        throw {code: 403, message: err.message}
                    })
            })
            .catch(err => {
                res.status(err.code).json({message: err.message})
            });
    }

    async tokenRead(req, res) {
        try {
            const {address} = req.query;
            await checkParams(address, 'address');
            await tokenControler.readToken(address)
                .then(balance => {
                    res.status(200).json(balance)
                })
                .catch(err => {
                    throw {code: 403, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({"error": err.message})
        }
    }

    async removeLiquidity(req, res) {
        const {token, token_one, token_two, amount, privateKey} = req.body;
        await auth.checkJWT(token).then(async decode => {
            await checkParams(token_one, 'token_one');
            await checkParams(token_two, 'token_two');
            await checkParams(amount, 'amount');
            await checkParams(privateKey, 'privateKey');
            const {invoice} = decode;
            await router.removeLiquidity(token_one, token_two, amount, invoice, privateKey)
                .then(row => {
                    res.status(200).json({"removed": row})
                })
                .catch(err => {
                    throw {code: 403, message: err.message}
                })
        })
            .catch(err => {
                res.status(err.code).json({message: err.message})
            })
    }

    async addLiquidity(req, res) {
        const {token, token_one, token_two, amountA, amountB, amountAMin, amountBMin, privateKey} = req.body;
        await auth.checkJWT(token)
            .then(async (decode) => {
                await checkParams(token_one, 'token_one');
                await checkParams(token_two, 'token_two');
                await checkParams(amountA, 'amountA');
                await checkParams(amountB, 'amountB');
                await checkParams(amountAMin, 'amountAMin');
                await checkParams(amountBMin, 'amountBMin');
                await checkParams(privateKey, 'privateKey');
                const {invoice} = decode;
                await tokenControler.ApproveToken(token_one, amountA, invoice, privateKey).catch(err => {
                    throw {code: 403, message: err.message}
                })
                await tokenControler.ApproveToken(token_two, amountA, invoice, privateKey).catch(err => {
                    throw {code: 403, message: err.message}
                })
                await router.addLiquidity(token_one, token_two, amountA, amountB, amountAMin, amountBMin, invoice, privateKey)
                    .then(row => {
                        res.status(200).json(row)
                    })
                    .catch(err => {
                        throw {code: 403, message: err.message}
                    })
            })
            .catch(err => {
                res.status(err.code).json({message: err.message})
            })
    }

    async fetchPairs(req, res) {
        factoryControler.fetchPairsFromContract()
            .then(pairs => {
                res.status(200).json({"pairs": pairs})
            })
            .catch(err => {
                res.status(403).json({message: err.message})
            })
    }

    async swapTokensForExactTokens(req, res) {
        const {token, token_one, token_two, amountIn, amountOut, privateKey} = req.body;
        await auth.checkJWT(token)
            .then(async (decode) => {
                await checkParams(token_one, 'token_one');
                await checkParams(token_two, 'token_two');
                await checkParams(privateKey, 'privateKey');
                await checkParams(amountIn, 'amountIn');
                await checkParams(amountOut, 'amountOut');
                const {invoice} = decode;
                await smart.swapTokensForExactTokens(token_one, token_two, amountIn, amountOut, invoice, privateKey)
                    .then(row => {
                        res.status(200).json(row)
                    })
                    .catch(err => {
                        throw {code: 403, message: err.message}
                    })
            })
            .catch(err => {
                res.status(err.code).json({message: err.message})
            })
    }

    async swapExactTokensForTokens(req, res) {
        const {token, token_one, token_two, amountIn, amountOut, privateKey} = req.body;
        await auth.checkJWT(token)
            .then(async (decode) => {
                await checkParams(token_one, 'token_one');
                await checkParams(token_two, 'token_two');
                await checkParams(privateKey, 'privateKey');
                await checkParams(amountIn, 'amountIn');
                await checkParams(amountOut, 'amountOut');

                const {invoice} = decode;
                await smart.swapExactTokensForTokens(token_one, token_two, amountIn, amountOut, invoice, privateKey)
                    .then(row => {
                        res.status(200).json(row)
                    })
                    .catch(err => {
                        throw {code: 403, message: err.message}
                    })
            })
            .catch(err => {
                res.status(err.code).json({message: err.message})
            })
    }
}