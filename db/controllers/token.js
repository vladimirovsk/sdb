const db = require('../../db')
const Token = db.sequelize.model("Token");
const {Op} = require("sequelize");
const {fetchFormatPagination} = require("./helpers/returnFormatPagination");

/**
 * Fetch list pairs
 * @returns {Promise<*[]>}
 */
module.exports = {

    async fetchList(data) {
        let {current_page, limit, address} = data
        const options = {
            limit: parseInt(limit), offset: parseInt(current_page - 1) * parseInt(limit),
            where: {active: true, status: true}
        }

        if (Boolean(address)) {
            options.where = {
                ...options.where, token: {
                    [Op.substring]: address
                }
            }
        }

        return await Token.findAndCountAll(options)
            .then(async (rows) => {
                return await fetchFormatPagination({current_page, limit}, rows);
            })
            .catch(err => {
                throw err
            })
    },

    async findAllToken() {
        return await Token.findAll({
            where: {active: true}})
            .then(async rows => {
                return await rows
            })
            .catch(err => {
                throw err
            })

    },

    async findOneToken(token) {
        const options = {
            where: {
                token: token
            }
        }
        return await Token.findOne(options)
            .then(rows => {
                return rows
            })
            .catch(err => {
                throw err
            })
    },

    async createToken(data) {
        return await Token.findOrCreate({
            where: {
                token: data.token,
            },
            defaults: {
                token: data.token,
                name: data.name,
                code: data.symbol
            }
        })
    },

    async editToken(data) {
        let {
            liquidity = 0,
            symbol = '',
            price = 0,
            price24 = 0,
            volume_24 = 0
        } = data;

        if (Boolean(data.liquidity)) {
            liquidity = data.liquidity
        }
        if (Boolean(data.price)) {
            price = data.price
        }
        if (Boolean(data.price24) && !isNaN(data.price24)) {
            price24 = data.price24
        }
        if (Boolean(data.volume_24)) {
            volume_24 = data.volume_24
        }
        if (Boolean(data.symbol)) {
            symbol = data.symbol.symbol
        }

        return await Token.update(
            {
                liquidity: liquidity,
                code: symbol,
                price: price,
                price24: price24,
                volume_24: volume_24,
                name: data.symbol.name
            },
            {
                where: {
                    token: data.token
                }
            }
        )
            .then(token => {
                return token
            })
            .catch(err => {
                throw err
            })
    },

    async findToken(params) {
        if (params.name === null) {
            params.name = ''
        }
        const options = {
            limit: parseInt(params.limit), offset: parseInt(params.current_page - 1) * parseInt(params.limit),
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: `%${params.name}%`
                    }
                },
                active: true
            }
        }
        return await Token.findAndCountAll(options)
            .then(async rows => {
                return await fetchFormatPagination(params, rows);
            })
            .catch(err => {
                throw err
            });
    },


    //FOR ADMIN
    async setStatusToken(data) {
        return await Token.update(
            {
                status: Boolean(data.status),
            },
            {
                where: {
                    token: data.address
                }
            }
        )
            .then(token => {
                if ((token[0] > 0)) {
                    return data.status
                } else {
                    throw "Dont fount address token " + data.address
                }
            })
            .catch(err => {
                throw err
            })
    },

    async fetchAllTokens(data) {
        let {current_page, limit, address} = data
        const options = {
            limit: parseInt(data.limit), offset: parseInt(current_page - 1) * parseInt(limit),
            where: {active: true}
        }
        if (Boolean(address)) {
            options.where = {
                ...options.where, token: {
                    [Op.substring]: address
                }
            }
        }
        return await Token.findAndCountAll(options)
            .then(async (rows) => {
                return await fetchFormatPagination({current_page, limit}, rows);
            })
            .catch(err => {
                throw err
            })
    }

}
