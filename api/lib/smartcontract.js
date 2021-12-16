'use strict'
const ClassContract = require('./classesContract/Contract')
const InputDataDecoder = require('ethereum-input-data-decoder');
/**
 * From testing function smart contracts
 */
const factoryController = require('../lib/controllerContract/FactoryController')

module.exports = {
    async validateAnswerTransactionFromHash(txHash){
        try {
            const arrayAbi = [global.conf.abi.SDBRouterJSON.abi,
                global.conf.abi.SDBTokenJSON.abi,
                global.conf.abi.SDBPairJSON.abi,
                global.conf.abi.SDBswapFactoryJSON.abi
            ];
            return factoryController.getTransaction(txHash)
                .then((txr) => {
                    let result = null;
                    for (let abi of arrayAbi) {
                        const decoder = new InputDataDecoder(abi);
                        result = decoder.decodeData(txr.input);
                        if (Boolean(result.method)) {
                            return result;
                        }
                    }
                    return result;
                })
                .catch(err => {
                    console.log(err.message)
                    throw err
                })
        }catch (e) {
            console.log(e.message)
        }

    },

    async swapExactTokensForTokens(token0, token1, amountIn, amountOutMin, wallet, secretKey) {
        try {
            console.log()
            let myContract = await new ClassContract(global.conf.abi.SDBRouterJSON.abi, global.conf.smartcontract.routerAddress)
            let swapExactTokensForTokens = await myContract.swapExactTokensForTokens(
                amountIn,
                amountOutMin,
                [token0, token1],
                global.conf.smartcontract.routerAddress,
                150000000000,
                wallet,
                secretKey
            )
            return swapExactTokensForTokens;

        } catch (e) {
            console.log(e.message)
            return e.message
        }
    },

    async swapTokensForExactTokens(token0, token1, amountIn, amountOutMin, wallet, secretKey) {
        try {
            let myContract = await new ClassContract(global.conf.abi.SDBRouterJSON.abi, global.conf.smartcontract.routerAddress)
            let swapTokensForExactTokens = await myContract.swapTokensForExactTokens(
                amountIn,
                amountOutMin,
                [token0, token1],
                global.conf.smartcontract.routerAddress,
                150000000000,
                wallet,
                secretKey
            )
            return swapTokensForExactTokens;

        } catch (err) {
            throw {code: 403, message:err.message}
        }
    }
}

