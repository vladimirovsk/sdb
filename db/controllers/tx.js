const db = require('../../db')
const {fetchFormatPagination} = require("./helpers/returnFormatPagination");
const Tx = db.sequelize.model("Tx");
const {Op} = require("sequelize");

module.exports = {
    /**
     * Create new Transaction
     * @param customer_id
     * @param token
     * @param hash
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    async create(data) {
        const {hash, address, from, contract_type, event_type, block_number, method, status} = data;
        return await Tx.create({
            status: status,
            address: address,
            from: from,
            hash: hash,
            method: method,
            contract_type_id: contract_type,
            event_type_id: event_type,
            block_number: block_number
        })
            .then(rows => {
                return rows
            })
            .catch(err => {
                throw err
            })
    },

    /**
     * Fetch list transaction from customer
     * @param customer_id
     * @returns {Promise<*[]>}
     */
    async fetchList(customer_id) {
        const options = {
            order: [['updatedAt', 'DESC']],
            where: {
                customer_id: customer_id
            }
        }
        return Tx.findAll(options)
            .then((rows) => {
                return rows.map((r) => {
                    return r.dataValues
                })
            })
            .catch(err => {
                throw err
            })
    },

    async fetchListPagination(params) {
        const options = {
            order: [['updatedAt', 'DESC']],
            limit: parseInt(params.limit),
            offset: parseInt(params.current_page - 1) * parseInt(params.limit),
            where: {}
        }
        return await Tx.findAndCountAll(options)
            .then(async (rows) => {
                return await fetchFormatPagination(params, rows)
            })
            .catch(err => {
                throw err
            })
    },

    async fetchListFromPagination(params) {
        const options = {
            order: [['updatedAt', 'DESC']],
            limit: parseInt(params.limit), offset: parseInt(params.current_page - 1) * parseInt(params.limit),
            where: {from: params.address}
        }
        return await Tx.findAndCountAll(options)
            .then(async (rows) => {
                return await fetchFormatPagination(params, rows)
            })
            .catch(err => {
                throw err
            })
    },

    async fetchListToPagination(params) {
        console.log(params.param)

        const options = {
            order: [['updatedAt', 'DESC']],
            limit: parseInt(params.limit), offset: parseInt(params.current_page-1) * parseInt(params.limit),
            where: {
                address: {
                    [Op.or]: [
                        params.pair.token0,
                        params.pair.token1,
                        params.pair.pair
                    ]
                },
                from: params.walletAddress
            }
        }
        return await Tx.findAndCountAll(options)
            .then(async (rows) => {
                return await fetchFormatPagination(params, rows)
            })
            .catch(err => {
                throw err
            })
    }

}
