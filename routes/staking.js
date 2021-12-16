const express = require('express');
const router = express.Router();
const StakingController = require('../controllers/staking')
const staking = new StakingController;

/**
 * @api {get} /api/staking/fetch fetch
 * @apiDescription staking default 0., staking=1 only staking pair
 * @apiGroup staking
 * @apiName fetch
 * @apiHeader Authorization
 * @apiQuery {Number} staking
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
    "data": [
        {
            "id": 3,
            "code": "BMW/AMD",
            "pair": "0xBD03D753C6295c18c3B822CE7663536F15d34B20",
            "token0": "0x3Cfa1eF60B81C9196E22337D494ED0aC9eb5Cba5",
            "token1": "0x650ec7bB36C924EdFB0C18C8d8C1A1FCa50e83C2",
            "tvl": 4.585751544613865e+23,
            "apr": 0,
            "earn_amount": 2.72e+33,
            "staking": 1,
            "status": 1,
            "active": 1,
            "token0_code": "BMW",
            "token1_code": "AMD",
            "symbol": "SDB LP",
            "image0": "https://wtgazhty2ter.corp.merehead.xyz/api/static/image/tokens/WEX.png",
            "image1": "https://wtgazhty2ter.corp.merehead.xyz/api/static/image/tokens/ALPACA.png"
        }
    ]
    }
 */
router.get("/fetch", staking.fetchList)

module.exports = router;