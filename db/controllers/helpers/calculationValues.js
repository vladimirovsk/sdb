module.exports = {
    async calcFees(data){
        try {
            return (data.volume/parseFloat(global.conf.smartcontract.Fees))*100
        }catch (e) {
            return 0
        }
    },

    async calcFeesYear(data){
        try {
            const fees = parseFloat(data.volume / parseFloat(global.conf.smartcontract.Fees) * 100);
            return parseFloat(fees * 365)
        }catch (e) {
            return 0
        }
    },

    async calcApr(data){
        try {
            const fees = parseFloat(data.volume / parseFloat(global.conf.smartcontract.Fees) * 100);
            const feesYear = parseFloat(fees * 365)
            return parseFloat(feesYear / data.liquidity * 100)
        } catch (e){
            return 0
        }

    }
}