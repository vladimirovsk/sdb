'use strict'
const Contract = require('./Contract')
const Vendor = global.conf.abi.VendorJSON;
const address =  global.conf.smartcontract.vendorAddress;

module.exports = class Pair extends Contract {

    constructor() {
        super(Vendor.abi, address);
        this.address =address;
        this.contract = new this.web3.eth.Contract(this.abi, this.address)
    }

    async poolInfo(pool_id=0){
        return await this.contract.methods.poolInfo(pool_id).call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async totalAllocPoint(){
        return await this.contract.methods.totalAllocPoint().call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async tokenperUSD(){
        return await this.contract.methods.tokenperUSD().call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async totalMoneyPoint(){
        return await this.contract.methods.totalMoneyPoint().call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

}