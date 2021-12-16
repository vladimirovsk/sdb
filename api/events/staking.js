const Pairs = require('../../db/controllers/pairs');

eventEmitter.on('updateStaking', async(data)=>{
        Pairs.editPairEarnAmount(data.lpToken, data).catch(err=>{console.log("Error update earn_amount", data, err.message)})
})