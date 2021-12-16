const auth = require('../api/lib/auth')
const {checkParams} = require("./helpers/helpController");
const Tx = require("../db/controllers/tx");
const Pair = require('../db/controllers/pairs');

module.exports = class TransactionController {
    async addTransaction(req, res){
        try {
            const {authorization} = req.headers;
            const {
                pairAddress,
                walletAddress,
                status=true,
                method='undefined',
                hash='',
                block_number=0,
            } = req.body;
            console.log(pairAddress, walletAddress)
            await checkParams(pairAddress, 'pairAddress');
            await checkParams(walletAddress, 'walletAddress');
            await checkParams(method, 'method');
            await auth.checkJWT(authorization)
                .then(async () => {
                    Tx.create({address:pairAddress, from:walletAddress, status, hash, block_number, method})
                        .then(()=>{
                            res.status(200).json({status:true})
                        })
                        .catch(err=>{
                            throw {code: 403, message: err.message}
                        })
                })
                .catch(err => {
                    throw {code: 401, message: err.message}
                })
        }catch (err) {
            res.status(err.code).json({err: err.message})
        }
    }

    async fetchListPagination(req, res) {
        try {
            const {authorization} = req.headers;
            const {current_page = 1, limit = 15} = req.query;
            await checkParams(authorization, 'authorization');
            await auth.checkJWT(authorization)
                .then(async () => {
                    await Tx.fetchListPagination({current_page, limit})
                        .then(async wallet => {
                            res.status(200).json({data: wallet})
                        })
                        .catch((err) => {
                            throw {code: 403, message: err.message}
                        })
                })
                .catch(err => {
                    throw {code: 401, message: err.message}
                })
        } catch (err) {
            res.status(err.code).json({message: err.message})
        }
    }

    async fetchListFromPagination(req, res) {
        try {
            const {authorization} = req.headers;
            const {current_page = 1, limit = 500} = req.query;
            const {address} = req.params;
            await checkParams(address, 'address');
            await checkParams(authorization, 'authorization');
            await auth.checkJWT(authorization)
                .then(async () => {
                    await Tx.fetchListFromPagination({address, current_page, limit})
                        .then(async rows => {
                            res.status(200).json({data: rows})
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

    async fetchListToPagination(req, res) {
        try {
            const {authorization} = req.headers;
            const {pairAddress, walletAddress, current_page = 1, limit = 15} = req.query;
            await checkParams(pairAddress, 'pairAddress');
            await checkParams(walletAddress, 'walletAddress');
            await checkParams(authorization, 'authorization');
            await auth.checkJWT(authorization)
                .then(async () => {
                    const pairData = await Pair.findOnePair(pairAddress);
                    await Tx.fetchListToPagination({pair:pairData, current_page, limit, walletAddress})
                        .then(async rows => {
                            res.status(200).json({data: rows})
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

}