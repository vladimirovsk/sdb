const auth = require("../api/lib/auth");
const vendorController = require("../api/lib/controllerContract/VendorController");
const {checkParams} = require("./helpers/helpController");

module.exports = class VendorController {
    async calcVendor(req, res) {
        const {authorization} = req.headers;
        const {amount} = req.body;
        await auth.checkJWT(authorization)
            .then(async () => {
                await checkParams(amount, 'amount');
                const tokenPerUSD = await vendorController.tokenperUSD();
                res.status(200).json({calc: parseFloat(amount * tokenPerUSD)})
            })
            .catch((err) => {
                res.status(400).json({err: err.message})
            })
    }

    async totalAllocPoint(req, res) {
        const {authorization} = req.headers;
        await auth.checkJWT(authorization)
            .then(async () => {
                res.status(200).json({ amount: await vendorController.totalAllocPoint()})
            })
            .catch((err) => {
                res.status(400).json({err: err.message})
            })
    }

    async totalMoneyPoint(req, res) {
        const {authorization} = req.headers;
        await auth.checkJWT(authorization)
            .then(async () => {
                res.status(200).json({amount: await vendorController.totalMoneyPoint()})
            })
            .catch((err) => {
                res.status(400).json({err: err.message})
            })
    }

    async poolInfo(req, res) {
        const {authorization} = req.headers;
        await auth.checkJWT(authorization)
            .then(async () => {
                res.status(200).json({data: await vendorController.poolInfo()})
            })
            .catch((err) => {
                res.status(400).json({err: err.message})
            })
    }

}