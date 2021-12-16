const db = require('../../db')
const Wallet = db.sequelize.model("Wallet");
const {fetchFormatPagination} = require("./helpers/returnFormatPagination")
const {Op} = require("sequelize");

/**
 * Find one wallet from invoice
 * @param customer_id
 * @param invoice
 * @returns {Promise<*[]>}
 */
async function findWallet(invoice) {
    const options = {
        where: {
            invoice: invoice
        }
    }
    return Wallet.findAll(options)
        .then((rows) => {
            return rows
        })
        .catch(err => {
            throw err
        })
}


async function findLikeWallet(invoice) {
    const options = {
        where: {
            invoice: {
                [Op.substring]: invoice
            }
        }
    }
    return Wallet.findAll(options)
        .then((rows) => {
            return rows
        })
        .catch(err => {
            throw err
        })
}

/**
 * Create new Wallet
 * @param customer_id
 * @param invoice
 * @param name - default = 'new invoice'
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
async function createWallet(invoice, name = 'new invoice', customer_id = 0) {
    return await Wallet.findOrCreate({
        where: {
            invoice: invoice
        },
        defaults: {
            status: 1,
            active: 1,
            name: name,
            customer_id: customer_id,
            invoice: invoice
        }
    })
        .then(rows => {
            return rows
        })
        .catch(err => {
            throw err
        })
}

async function findOrCreateWallet(invoice) {
    return Wallet.findOrCreate({
        where: {invoice: invoice},
        defaults: {invoice: invoice}
    })
        .then(rows => {
            return rows.map(row => {
                return row.dataValues;
            })
        })
}

/**
 * Fetch list wallet from customer
 * @param customer_id
 * @returns {Promise<*[]>}
 */
async function fetchListPagination(params) {

    let options = {
        limit: parseInt(params.limit), offset: parseInt(params.current_page - 1) * parseInt(params.limit),
        where: {
            active: true,
        }
    }

    if (Boolean(params.address)) {
        options.where = {
            ...options.where, invoice: {
                [Op.substring]: params.address
            }
        }
    }
    console.log(options, params.address)
    return await Wallet.findAndCountAll(options)
        .then(async (rows) => {
            return await fetchFormatPagination(params, rows)
        })
        .catch(err => {
            throw err
        })
}

module.exports = {
    findOrCreateWallet,
    findWallet,
    fetchListPagination,
    findLikeWallet,
}
