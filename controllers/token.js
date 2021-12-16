const Token = require('../db/controllers/token.js')
const TxToken = require("../db/controllers/txToken");
const auth = require("../api/lib/auth");
const {checkParams} = require("./helpers/helpController");
const Web3 = require("web3")
const BigNumber = require("bignumber.js")

module.exports = class TokenController {
    async setStatus(req, res) {
        const {authorization} = req.headers;
        const {address} = req.body;
        await auth.checkJWT(authorization)
            .then(async () => {
                await checkParams(address, 'address');
                Token.setStatusToken(req.body)
                    .then(status => {
                            res.status(200).json({status})
                        }
                    )
                    .catch(err => {
                        throw {code: 403, message: err.message}
                    })
            })
            .catch(err => {
                res.status(err.code).json({err: err.message})
            })
    }

    async findToken(req, res) {
        const {name, limit = 15, current_page = 1} = req.query;
        try {
            await checkParams(name, "name");
            await Token.findToken({name, limit, current_page})
                .then(token => {
                    res.status(200).json(token)
                })
                .catch((err) => {
                        throw err;
                    }
                );
        } catch (err) {
            res.status(400).json({err: err})
        }
    }

    async fetchToken(req, res) {
        try {
            const {current_page=1, limit=15, address} = req.query;
            //const {authorization} = req.headers;
            //TODO add Authorization header from client
                await Token.fetchList({current_page, limit, address})
                    .then(async token => {
                        let rows = []
                        token.rows.map(row => {
                            //TODO calc liquidity, volume_24, price - made temporarily
                            rows.push({
                                id: row.id,
                                code: row.code,
                                token: row.token,
                                name: row.name,
                                image: row.image,
                                liquidity: new BigNumber(row.liquidity / Math.pow(10, 18), 10).toFixed(0),
                                volume_24: Web3.utils.toWei(new BigNumber(row.volume_24, 10).toFixed(0), 'wei'),
                                price: parseFloat(row.price).toFixed(3),
                                price24: row.price24,
                                status: row.status,
                                active: row.active,
                                createdAt: row.createdAt,
                                updatedAt: row.updatedAt
                            })
                        })
                        let data = {
                            current_page: token.current_page,
                            rows: rows,
                            count: token.count,
                            last_page: token.last_page
                        }
                        res.status(200).json(data)
                    })
                    .catch((err) => {
                        throw {code: 403, message: err.message}
                    })
        } catch (err) {
            res.status(err.code).json({err: err.message})
        }
    }

    async fetchAllTokens(req, res) {
        try {
            const {current_page=1, limit=15, address} = req.query;
            const {authorization} = req.headers;
            await auth.checkJWT(authorization)
                .then(async (data) => {
                    await Token.fetchAllTokens({current_page, limit, address})
                        .then(async token => {
                            let rows = []
                            token.rows.map(row=>{
                                //TODO calc liquidity, volume_24, price - made temporarily
                                rows.push({
                                    id: row.id,
                                    code: row.code,
                                    token: row.token,
                                    name: row.name,
                                    image: row.image,
                                    liquidity: new BigNumber(row.liquidity/Math.pow(10, 18), 10).toFixed(0),
                                    volume_24: Web3.utils.toWei(new BigNumber(row.volume_24, 10).toFixed(0), 'wei'),
                                    price: parseFloat(row.price).toFixed(3),
                                    price24: row.price24,
                                    status: row.status,
                                    active: row.active,
                                    createdAt: row.createdAt,
                                    updatedAt: row.updatedAt
                                })
                            })
                            let data = {
                                current_page: token.current_page,
                                rows: rows,
                                count: token.count,
                                last_page: token.last_page
                            }
                            res.status(200).json(data)
                        })
                        .catch((err) => {
                            throw {code: 403, message: err.message}
                        })
                })
                .catch(err=>{throw {code:401, message:err.message}})
        } catch (err) {
            res.status(err.code).json({err: err.message})
        }
    }


    async fetchTokenHistoryHour(req, res) {
        try {
            const {token, current_page, limit} = req.query;
            await checkParams(token, "token");
            await TxToken.fetchTokenHistoryHour({token, current_page, limit})
                .then((history) => {
                    res.status(200).json(history)
                })
                .catch(err => {
                    throw {code: 403, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({err: err})
        }
    }

    async fetchTokenHistoryDay(req, res) {
        try {
            const {token, current_page, limit} = req.query;
            await checkParams(token, "token");
            await TxToken.fetchTokenHistoryDay({token, current_page, limit})
                .then((history) => {
                    res.status(200).json(history)
                })
                .catch(err => {
                    throw {code: 403, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({err: err})
        }
    }
}
