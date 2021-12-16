const auth = require("../api/lib/auth");
const stakingController = require("../api/lib/controllerContract/StakingController");
const Pairs = require('../db/controllers/pairs')
const {checkParams} = require("./helpers/helpController");

module.exports = class StakingController {
    async fetchList(req, res){
        const {authorization} = req.headers;
        const {limit=15, staking=0} = req.query;
        await auth.checkJWT(authorization)
            .then(async () => {
                Pairs.fetchAllStaking({limit:limit, staking:staking})
                    .then(rows =>{
                        res.status(200).json({
                            data:rows
                        })
                    })
                    .catch(err=>{throw {code:422, message:err.message}})
            })
            .catch((err)=>{
                res.status(err.code).json({message: err.message})
            })
    }

    async deposited(req, res) {
        const {authorization} = req.headers;
        const {pid, address} = req.query;
        await auth.checkJWT(authorization)
            .then(async () => {
                await checkParams(address, 'address');
                await checkParams(pid, 'pid');
                res.status(200).json({data:await stakingController.deposited(pid, address)})
            })
            .catch((err)=>{
                res.status(400).json({err: err.message})
            })
    }
}