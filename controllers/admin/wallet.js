const Wallet = require('../../db/controllers/wallet')
const auth = require('../../api/lib/auth')
const {checkParams} = require("../helpers/helpController");

module.exports = class WalletController {
    async fetchListPagination(req, res) {
        try {
            const {authorization} = req.headers;
            const {current_page = 1, limit = 15, address} = req.query;
            await auth.checkJWT(authorization)
                .then(async () => {
                    // if (Boolean(address)){
                    //     await Wallet.findLikeWallet(address)
                    //         .then(rows => {
                    //             res.status(200).json({data: rows})
                    //         })
                    //         .catch((err) => {
                    //             throw {code: 403, message: err.message}
                    //         });
                    // }else {
                        await Wallet.fetchListPagination({current_page, limit, address})
                            .then(async rows => {
                                res.status(200).json({data: rows})
                            })
                            .catch((err) => {
                                throw {code: 403, message: err.message}
                            })
                    // }
                })
                .catch(err => {
                    throw {code: 401, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({message: err.message})
        }
    }

    async findLikeWallet(req, res){
        try{
            const {authorization} = req.headers;
            const {address} = req.query;
            await auth.checkJWT(authorization)
                .then(async()=>{
                    await checkParams(address, 'address');
                    await Wallet.findLikeWallet(address)
                        .then(rows => {
                            res.status(200).json({data: rows})
                        })
                        .catch((err) => {
                            throw {code: 403, message: err.message}
                        });
                })
                .catch(err => {
                    throw {code:401, message: err.message}
                })

        }catch (err) {
            res.status(err.code).json({message: err.message})
        }

    }

    async findWallet(req, res) {
        try {
            const {authorization} = req.headers;
            const {address} = req.params;
            await auth.checkJWT(authorization)
                .then(async () => {
                    await checkParams(address, 'address');
                    await Wallet.findWallet(address)
                        .then(rows => {
                            res.status(200).json({data: rows})
                        })
                        .catch((err) => {
                            throw {code: 403, message: err.message}
                        });
                })
                .catch(err => {
                    throw {code:401, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({message: err.message})
        }
    }
}