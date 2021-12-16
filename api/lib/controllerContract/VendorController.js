const Vendor = require("../classesContract/Vendor");
const vendor = new Vendor;

module.exports = {
    async poolInfo(pool_id) {
        return await vendor.poolInfo(pool_id)
            .then(data => {
                return data
            })
            .catch(err => {
                throw err
            })
    },

    async totalAllocPoint(){
        return await vendor.totalAllocPoint()
            .then(data => {
                return data
            })
            .catch(err => {
                throw err
            })
    },

    async totalMoneyPoint(){
        return await vendor.totalMoneyPoint()
            .then(data => {
                return data
            })
            .catch(err => {
                throw err
            })
    },

    async tokenperUSD(){
        return await vendor.tokenperUSD()
            .then(data => {
                return data
            })
            .catch(err => {
                throw err
            })
    }
}