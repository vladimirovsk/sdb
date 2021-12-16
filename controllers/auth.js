const {createJWT, decodeJWT, refreshJWT} = require('../api/lib/auth')
const wallet = require('../db/controllers/wallet');
const tokenController =require('../api/lib/controllerContract/TokenControler')
const {checkParams} = require("./helpers/helpController");

module.exports = class AuthController {
    async createToken(req, res) {
        try {
            const {invoice} = req.body;
            await checkParams(invoice, 'invoice');
            if (!Boolean(await tokenController.validateAddress(invoice))) {
                throw {code: 422, name:"Error validated params : invoice"}
            }
            await wallet.findOrCreateWallet(invoice)
                .then(async row => {
                    const wallet_id = await row[0].id
                    const newToken = await createJWT({invoice: invoice, admin:false})
                    const refreshToken = await refreshJWT({invoice: invoice, admin:false})
                    const decodeToken = await decodeJWT(newToken)
                    console.log(refreshToken)
                    res.status(200).json({
                        "token": newToken,
                        "refreshToken": refreshToken,
                        exp: decodeToken.exp,
                        wallet_id: wallet_id
                    })
                })
                .catch(err => {
                    throw {code:403, message: err.message}
                })

        } catch (err) {
            res.status(err.code).json({message: err.message})
        }
    }

    async refreshToken(req, res) {
        try {
            const {authorization} = req.headers;
            await checkParams(authorization, 'authorization');
            const decodeToken = await decodeJWT(authorization)
            if (decodeToken.exp >= Date.now() / 1000) {
                await createJWT({invoice: decodeToken.invoice, admin:false})
                    .then(async newToken => {
                        let refreshToken = await refreshJWT({invoice: decodeToken.invoic, admin:false})
                        res.status(200).json({token: newToken, refreshToken})
                    })
                    .catch(err => {
                        throw {code:403, message:err.message}
                    })
            } else {
                throw {code:301, message: "token expired"}
            }
        } catch (err) {
            res.status(err.code).json({message: err.message})
        }

    }

}