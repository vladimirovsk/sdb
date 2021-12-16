const express = require('express');
const router = express.Router();

const PairsController = require("../controllers/pairs.js");
const pairs = new PairsController;

/**
 @api {put} /api/contract/info-lp-token info-lp-token
 @apiDescription Info from lp tokens from contracts
 @apiName info-lp-token
 @apiGroup pair
 @apiHeader {String} Authorization
 */
router.get("/info-lp-token", pairs.getInfoLPTokens)

/**
 @api {put} /api/contract/pair-set-status pair-set-status
 @apiDescription Set status status = true|false
 @apiName pair-set-status
 @apiGroup pair
 @apiBody {String} [address]="address pair"
 @apiBody {Boolean} [status]=true
 @apiHeader {String} Authorization
 */
router.put('/pair-set-status', pairs.setStatus)

/**
 @api {put} /api/contract/pair-set-staking pair-set-staking
 @apiDescription Set status staking = true|false
 @apiName pair-set-staking
 @apiGroup pair
 @apiBody {String} [address]="address pair"
 @apiBody {Boolean} [staking]=false
 @apiHeader {String} Authorization
 */
router.put('/pair-set-staking', pairs.setStaking)

/**
 @api {put} /api/contract/pair-edit-params pair-edit-params
 @apiDescription Set params swap snd earn from pair  staking = true|false
 @apiName pair-edit-params
 @apiGroup pair
 @apiBody {String} [address]="address pair"
 @apiBody {Number} [swap] = 0.5
 @apiBody {Number} [earn] = 0.5
 @apiHeader {String} Authorization
 */
router.put('/pair-edit-params', pairs.pairEditParams)

/**
 @api {get} /api/contract/fetch-pairs fetch-pairs:address
 @apiDescription get list pairs from clients, only status = true
    When address parameter, information on a specific pair is selected
 @apiName fetch-pair
 @apiGroup pair
 @apiParam {String} address = "" Optional parameter
 @apiParam {Number} current_page = 1
 @apiParam {Number} limit = 15
 @apiQuery {String} address = ''
 @apiHeader {String} Authorization
 */
router.get('/fetch-pairs', pairs.fetchPairs)
router.get('/fetch-pairs/:address', pairs.fetchPairsFromToken)

/**
 @api {get} /api/contract/fetch-all-pairs fetch-all-pairs
 @apiDescription get list pairs from admin, all status
 @apiName fetch-all-pair
 @apiGroup pair
 @apiQuery {Number} current_page = 1
 @apiQuery {Number} limit = 15
 @apiQuery {String} address = ''
 @apiHeader {String} Authorization
 */
router.get('/fetch-all-pairs', pairs.fetchAllPairs)

/**
 @api {get} /api/contract/fetch-pair-history-day fetch-pair-history-day
 @apiGroup pair
 @apiName fetch-pair-history-day
 @apiParam {String} pair
 @apiParam {Number} current_page = 1
 @apiParam {Number} limit = 15
 */
router.get('/fetch-pair-history-day', pairs.fetchPairHistoryDay)

/**
 @api {get} /api/contract/fetch-pair-history-hour fetch-pair-history-hour
 @apiGroup pair
 @apiName fetch-pair-history-hour
 @apiParam {String }pair
 @apiParam {Number} current_page=0
 @apiParam {Number} limit=15
 */
router.get('/fetch-pair-history-hour', pairs.fetchPairHistoryHour)

/**
 @api {get} /api/contract/find-pairs find-pairs
 @apiGroup pair
 @apiName find-pairs
 @apiParam {String} code
 @apiParam {Number} current_page =0
 @apiParam {Number} limit=15
 */
router.get('/find-pairs', pairs.findPairs)

/**
 @api {get} /api/contract/calc-token calc-token
 @apiGroup pair
 @apiName calc-token
 @apiParam {String} token
 */
router.get('/calc-token', pairs.calcToken)

/**
 @api {get} /api/contract/calc-swap calc-swap
 @apiGroup pair
 @apiName calc-swap
 @apiParam {String} token0
 @apiParam {String} token1
 @apiParam {Number} amountIn
 */
router.get('/calc-swap', pairs.calcSwap)

/**
 @api {get} /api/contract/calc-liquidity calc-liquidity
 @apiGroup pair
 @apiName calc-liquidity
 @apiParam {String} token0
 @apiParam {String} token1
 @apiParam {Number} amountIn

 */
router.get("/calc-liquidity", pairs.calcLiquidity)

/**
 @api {get} /api/contract/select-token-from-pair select-token-from-pair
 @apiGroup pair
 @apiName select-token-from-pair
 @apiParam tokenIn
 @apiDescription Selecting a list of token addresses that are paired with the tokenIn
 */
router.get('/select-token-from-pair', pairs.selectTokenInPair)

module.exports = router;