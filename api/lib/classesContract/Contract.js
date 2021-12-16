'use strict'
const Web3 = require('web3');
const Web3HttpProvider = require('web3-providers-http');

module.exports = class Contract {

    constructor(abi, contractAddress) {
        const provider  = new Web3(new Web3HttpProvider(global.conf.uri))
        this.web3 = new Web3(provider);
        this.abi = abi;
        this.address = contractAddress;
        this.contract = new this.web3.eth.Contract(this.abi, this.address);
    }

    async estimateGas(data, wallet) {
        try {
            const nonce = await this.web3.eth.getTransactionCount(wallet).catch(err=>{throw err})
            return await this.web3.eth.estimateGas({
                "from": wallet,
                "nonce": nonce,
                "to": this.address,
                "data": data
            }).then((gas) => {
                return gas
            }).catch(() => {
                return 150000
            })
        } catch (err) {
            console.log('estimateGas', err.message)
        }
    }

    async getBalance(address) {
        return this.web3.eth.getBalance(address)
            .then(result => {
                return Web3.utils.fromWei(result, 'ether');
            })
            .catch(err => {
                console.log('Huston we have a promblem: ', err);
                throw err;
            })
    }

    async removeLiquidity(
        wallet,
        privateKey,
        tokenA,
        tokenB,
        liquidity,
        amountAMin,
        amountBMin,
        deadline = 150000000000
    ) {

        this.contract.defaultAccount = wallet;

        this.web3.eth.accounts.wallet.add({
            address: wallet,
            privateKey: privateKey
        })

        let remove = this.contract.methods.removeLiquidity(
            tokenA,
            tokenB,
            liquidity,
            amountAMin,
            amountBMin,
            wallet,
            deadline
        ).encodeABI()

        let result = await this.web3.eth.sendTransaction({
            from: wallet,
            to: this.address,
            data: remove,
            gas: await this.estimateGas(remove, wallet),
            nonce: this.web3.utils.toHex(this.nonce)
        }).catch(err=>{throw err})
        return result;

    }

    async swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        path,
        to,
        deadline,
        wallet,
        secretKey
    ) {
        try {
            this.web3.eth.accounts.wallet.add({
                address: wallet,
                privateKey: secretKey
            })
            let tokenToToken = this.contract.methods.swapExactTokensForTokens(
                amountIn,
                amountOutMin,
                path,
                to,
                deadline
            ).encodeABI()
            const gas = await this.estimateGas(tokenToToken, wallet)
            const nonce = this.web3.utils.toHex(await this.web3.eth.getTransactionCount(wallet));

            let result = await this.web3.eth.sendTransaction({
                from: wallet,
                to: to,
                data: tokenToToken,
                gas: gas,
                nonce: this.web3.utils.toHex(nonce)
            })
            return result
        } catch (e) {
            return e.message;
        }

    }

}