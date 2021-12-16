const db = require('../../db')
const Pairs = db.sequelize.model("Pairs");
const {Op} = require("sequelize");
const query = require('./query/pairs')
const DbTokenController = require('../../db/controllers/token')
const {fetchFormatPagination} = require("./helpers/returnFormatPagination");
const helpers = require("./helpers/calculationValues")
const Sequelize = require('sequelize');
/**
 * Fetch list pairs
 * @returns {Promise<*[]>}
 */
module.exports = {
    async fetchAllStaking({limit, staking}) {
        return await Pairs.sequelize.query(query.fetchListStaking.text,
            {
                attributes: [
                    'id',
                    'code',
                    'pair',
                    'token0',
                    'token1',
                    'tvl',
                    'apr',
                    'earn_amount',
                    'staking',
                    'active',
                    'token0_code',
                    'token1_code',
                    'symbol',
                    'image0',
                    'image1'
                ],
                replacements: {limit: parseInt(limit), staking: staking},
                type: db.sequelize.QueryTypes.SELECT
            })
            .then(async (rows) => {
                return await rows
            })
            .catch(err => {
                throw err
            })
    },

    async fetchAllPairs(data) {
        let {current_page = 1, limit = 15, address} = data;
        const count = await rowCountPairs().catch(err => {
            throw err
        })
        if (!Boolean(address)) {
            address = '%'
        } else {
            address = '%' + address + '%'
        }

        return await Pairs.sequelize.query(query.fetchListAll.text,
            {
                replacements: {
                    limit: parseInt(limit),
                    offset: parseInt(current_page - 1) * parseInt(limit),
                    address: address
                },
                type: db.sequelize.QueryTypes.SELECT
            })
            .then(async (rows) => {
                return await fetchFormatPagination({current_page, limit}, {count: count, rows: rows})
            })
            .catch(err => {
                throw err
            })
    },

    async fetchList(data) {
        let {current_page, limit, address} = data
        const count = await rowCountPairs().catch(err => {
            throw err
        })
        if (!Boolean(address)) {
            address = '%'
        } else {
            address = '%' + address + '%'
        }

        return await Pairs.sequelize.query(query.fetchList.text,
            {
                replacements: {
                    limit: parseInt(limit),
                    offset: parseInt(current_page - 1) * parseInt(limit),
                    address: address
                },
                type: db.sequelize.QueryTypes.SELECT
            }
        ).then(async rows => {
            return await fetchFormatPagination({current_page, limit}, {count: count, rows: rows})
        })
            .catch(err => {
                throw err
            })
    },

    async findOnePairById(pair_id) {
        const options = {
            where: {
                id: pair_id
            }
        }
        return await Pairs.findOne(options)
            .then(row => {
                return row.dataValues
            })
            .catch(err => {
                throw err
            })
    },

    async findAllPair() {
        return await Pairs.findAll({
            where: {
                active: true
            }
        })
            .then(rows => {
                return rows
            })
            .catch(err => {
                throw err
            })
    },

    async findOnePair(pair) {
        try {
            return await Pairs.sequelize.query(query.fetchOnePair.text,
                {
                    replacements: {pair: pair},
                    type: db.sequelize.QueryTypes.SELECT
                }
            ).then(async rows => {
                return await rows[0]
            })
                .catch(err => {
                    throw err
                })
        } catch (err) {
            throw err;
        }
    },

    async selectTokenInPair(tokenIn) {
        let resultList = [];
        try {
            await Pairs.findAll({where: {token0: tokenIn}})
                .then(async rows => {
                    let result = await rows.map(async (row) => {
                        let token = await DbTokenController.findOneToken(row.token1)
                        return token;
                    })
                    let tokens = await Promise.all(result);
                    tokens.map(async token => {
                        resultList.push({
                            code: token.code,
                            id: token.id, image: token.image,
                            name: token.name,
                            token: token.token
                        })
                    })
                })
                .catch(err => {
                    throw err
                })
            await Pairs.findAll({where: {token1: tokenIn}})
                .then(async rows => {
                    let result = await rows.map(async (row) => {
                        let token = await DbTokenController.findOneToken(row.token0)
                        return token;
                    })
                    let tokens = await Promise.all(result);
                    tokens.map(async token => {
                        resultList.push({
                            code: token.code,
                            id: token.id, image: token.image,
                            name: token.name,
                            token: token.token
                        })
                    })
                })
                .catch(err => {
                    throw err
                })
            return resultList;
        } catch (err) {
            throw err;
        }
    },

    /** Find pairs on two tokens, output pairs list
     * @param token0 uint256
     * @param token1 uint256
     * @returns {Promise<*>}
     */
    async findPairsFromTokens(token0, token1) {
        return await Pairs.sequelize.query(query.findPairsFromTokens.text, {
            replacements: {
                token0: `${token0}`,
                token1: `${token1}`
            },
            type: db.sequelize.QueryTypes.SELECT
        })
            .then(rows => {
                return rows
            })
            .catch(err => {
                throw err
            })
    },

    /**Find enter tokens from pair, output list pair
     * @param token
     * @returns {Promise<[undefined, number]>}
     */
    async fetchPairsListFromToken(token) {
        return await Pairs.sequelize.query(query.fetchPairsListFromToken.text, {
            replacements: {
                token: token,
            },
            type: db.sequelize.QueryTypes.SELECT
        })
            .then(async rows => {
                return await rows
            })
            .catch(err => {
                console.log("SQL fetchPairsListFromToken Err", err);
                throw err;
            })
    },

    async findPairs(context) {
        const count = await rowCountPairs().catch(err => {
            throw err
        });
        return await Pairs.sequelize.query(query.findPairs.text,
            {
                replacements: {
                    code: `%${context.code}%`,
                    limit: parseInt(context.limit),
                    offset: parseInt(context.current_page - 1) * parseInt(context.limit)
                },
                type: db.sequelize.QueryTypes.SELECT
            },
        )
            .then(async rows => {
                return await fetchFormatPagination({
                    current_page: context.current_page,
                    limit: context.limit
                }, {count: count, rows: rows})
            })
            .catch(err => {
                console.log("SQL findPairs Err", err)
                throw err
            })
    },

    async createPayer(data) {
        return await Pairs.findOrCreate({
            where: {
                pair: data.pair,
                token0: data.token0,
                token1: data.token1,
                index: data.index
            },
            defaults: {
                pair: data.pair,
                token0: data.token0,
                token1: data.token1,
                index: data.index
            }
        }).catch(err => {
            console.log("SQL createPayer err", err)
        })
    },

    async pairEditParams(data) {
        return await Pairs.update(
            {
                swap: parseFloat(data.swap),
                earn: parseFloat(data.earn),
            },
            {
                where: {
                    pair: data.address
                }
            }
        ).then(pair => {
            if ((pair[0] > 0)) {
                return true
            } else {
                throw "Dont fount address pair " + data.address
            }
        })
    },

    async setStakingPair(data) {
        return await Pairs.update(
            {
                staking: Boolean(data.staking),
            },
            {
                where: {
                    pair: data.address
                }
            }
        )
            .then(pair => {
                if ((pair[0] > 0)) {
                    return pair
                } else {
                    throw "Dont fount address pair " + data.address
                }
            })
            .catch(err => {
                throw err
            })
    },

    async setStatusPair(data) {
        return await Pairs.update(
            {
                status: Boolean(data.status),
            },
            {
                where: {
                    pair: data.address
                }
            }
        )
            .then(pair => {
                if ((pair[0] > 0)) {
                    return data.status
                } else {
                    throw "Dont fount address pair " + data.address
                }
            })
            .catch(err => {
                throw err
            })
    },

    async editPair(pair, data) {
        return await Pairs.update(
            {
                liquidity: data.liquidity,
                code: data.symbol,
                tvl: data.tvl,
                amount_token0: data.reserve0,
                amount_token1: data.reserve1,
                pool_index: data.pool_index
            },
            {
                where: {
                    pair: pair
                }
            }
        )
            .then(pair => {
                return pair
            })
            .catch(err => {
                throw err
            })
    },

    async setValue24(data) {
        let row = await this.findOnePairById(data.pair_id);
        return Pairs.update({
                volume_24: data.volume,
                fees_24: await helpers.calcFees({volume: data.volume}),
                fees_year: await helpers.calcFeesYear({volume:data.volume}),
                apr: await helpers.calcApr({volume: data.volume, liquidity:row.liquidity})
            },
            {
                where: {
                    id: data.pair_id
                }
            }
        )
            .then(pair => {
                return pair
            })
            .catch(err => {
                throw err
            })
    },

    async setValue7D(data) {
        return Pairs.update({
                volume_7: data.volume,
                fees_7: data.volume / parseFloat(global.conf.smartcontract.Fees || 0.17) * 100

            },
            {
                where: {
                    id: data.pair_id
                }
            }
        )
            .then(pair => {
                return pair
            })
            .catch(err => {
                throw err
            })
    },

    editPairEarnAmount(pair, data) {
        return Pairs.update({
                earn_amount: data.accERC20PerShare,
            },
            {
                where: {
                    pair: pair
                }
            }
        )
            .then(pair => {
                return pair
            })
            .catch(err => {
                throw err
            })
    }
}

async function rowCountPairs() {
    const count = await Pairs.sequelize.query(query.recordCount.text).catch(err => {
        throw err
    });
    return count[0][0].count;
}
