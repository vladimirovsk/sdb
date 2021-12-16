'use strict'
const Web3 = require('web3');
const Contract = require('./Contract')
const Staking = global.conf.abi.SDBStakingJSON;

module.exports = class Pair extends Contract {

    constructor(address) {
        super(Staking.abi, address);
        this.address = address;
        this.contract = new this.web3.eth.Contract(this.abi, this.address)
    }

    async deposited(_pid, _user){
        return await this.contract.methods.deposited(_pid, _user).call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async endBlock(){
        return await this.contract.methods.endBlock().call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async erc20(){
        return await this.contract.methods.erc20().call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async owner(){
        return await this.contract.methods.owner().call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async paidOut(){
        return await this.contract.methods.paidOut().call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async pending(_pid, _user){
        return await this.contract.methods.pending(_pid, _user).call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async poolInfo(index) {
        return await this.contract.methods.poolInfo(index).call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async poolLength() {
        return await this.contract.methods.poolLength().call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async rewardPerBlock(){
        return await this.contract.methods.rewardPerBlock().call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async startBlock() {
        return await this.contract.methods.startBlock().call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }


    async totalAllocPoint() {
        return await this.contract.methods.totalAllocPoint().call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async totalPending() {
        return await this.contract.methods.totalPending().call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }

    async userInfo(user, address) {
        return await this.contract.methods.userInfo(user, address).call()
            .then(result => {
                return result
            })
            .catch(err => {
                throw err
            })
    }
}