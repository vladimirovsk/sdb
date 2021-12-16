const db = require('../../db')
const {Op} = require("sequelize");
const Wallet = db.sequelize.model("Wallet")
const Customer = db.sequelize.model("Customer")

const findCustomerFromInvoice = async (invoice) => {
    const options = {
        where: {
            invoice: invoice
        },
        defaults: {
            invoice: invoice
        }
    }
    await Wallet.findOne(options)
        .then(rows => {
            return (rows.map(row => {
                return row.dataValues;
            }))
        })
        .catch(err => {
            throw err
        });
}

const createCustomer = async (data) => {
    return await Customer.findOrCreate({
        where: {
            email: data.email
        },
        defaults: {
            email: data.email || '',
            valid_id: data.valid_id,
            name: data.name || 'default name',
            status: data.status || 1
        }
    })
}

const editDataCustomer = (data) => {

}

const fetchList = async () => {
    return await Customer.findAll({})
        .then((rows) => {
            return rows.map(r => {
                return r.dataValues;
            })
        })
        .catch(err => {
            throw err
        })
}

module.exports = {
    findCustomerFromInvoice,
    createCustomer,
    editDataCustomer,
    fetchList
}