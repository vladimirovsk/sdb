const Customer = require('../db/controllers/customer')
const auth = require("../api/lib/auth")
const {checkParams} = require("./helpers/helpController");

module.exports = class CustomerController {
    async all(req, res) {
        res.render('customer')
    }

    async fetchList(req, res) {
        try {
            const {token} = req.headers;
            await checkParams(token, 'token');
            await auth.checkJWT(token).then(async () => {
                await Customer.fetchList()
                    .then(async customer => {
                        res.status(200).json({data: customer})
                    })
                    .catch((err) => {
                        throw {code:403, message: err.message};
                    })
            })

        } catch (err) {
            res.status(400).json({err: err})
        }
    }

    async editCustomer(req, res) {
        try {
            const {invoice} = req.body;
            await checkParams(invoice, 'invoice');
            res.status(200).json({data:null});
        } catch (err) {
            res.status(err.code).json({message: err.message})
        }
    }

    async createCustomer(req, res) {
        try {
            const {token} = req.headers;
            const {email, name, status = 1} = req.body
            await checkParams(token, 'token');
            await auth.checkJWT(token)
                .then(async () => {
                    await checkParams(email, 'email');
                    Customer.createCustomer({email: email, name: name, status: status})
                        .then(customer => {
                            res.status(200).json({data: customer})
                        })
                        .catch((err) => {
                            throw {code:403, message:err.message};
                        })
                })
                .catch(err => {
                    throw err
                })
        } catch (err) {
            res.status(err.code).json({message: err.message})
        }
    }
}