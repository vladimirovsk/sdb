pairControl = require('../lib/controllerContract/PairController');
eventEmitter.on('writeValuesToPair', async (data) => {

    pairControl.writeValue24(data.pair_id).catch(err => {
        console.log("Error write writeValue24", err.message)
    })
    pairControl.writeValue7D(data.pair_id).catch(err => {
        console.log("Error write writeValue7D", err.message)
    })
})