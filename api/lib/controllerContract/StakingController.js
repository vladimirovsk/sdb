const Staking = require("../classesContract/Staking");
const staking = new Staking(global.conf.smartcontract.stakingAddress);

module.exports = {
    async deposited(_pid, _user) {
        return await staking.deposited(_pid, _user)
            .then(deposited => {
                return deposited
            })
            .catch(err => {
                throw err
            })
    },

    async poolInfo(index){
        return await staking.poolInfo(index)
            .then(deposited => {
                return deposited
            })
            .catch(err => {
                throw err
            })
    },

    async poolLength(){
        return await staking.poolLength()
            .then(length => {
                return length
            })
            .catch(err => {
                throw err
            })
    }
}
