const express = require('express');
const router = express.Router();


const TokenController = require("../controllers/token.js");
const token = new TokenController;

/**
 @api {put} /api/contract/token-set-status token-set-status
 @apiDescription Set status active = true|false
 @apiName token-set-status
 @apiGroup token
 @apiBody {String} address ="address token"
 @apiBody {Boolean} status
 @apiHeader {String} Authorization
 @apiSuccessExample {json} Success-Response:
    HTTP/1.1 200 OK
    {
        status: true
    }
 @apiErrorExample {json} Error-Response:
    HTTP/1.1 400 Bad request
    {
        "err": "Dont fount address token 0xc3142810057713BB7651240C86671c7966Be75fd0"
    }
 */
router.put('/token-set-status', token.setStatus)

/**
 @api {get} /api/contract/fetch-tokens fetch-tokens
 @apiDescription get list tokens from clients, only status = true
 @apiGroup token
 @apiName fetch-tokens
 @apiQuery {Number} current_page = 1
 @apiQuery {Number} limit = 15
 @apiQuery {String} address = ''
 @apiHeader {String} Authorization
 */
router.get('/fetch-tokens', token.fetchToken)

/**
 @api {get} /api/contract/fetch-all-tokens fetch-all-tokens
 @apiDescription get list tokens from admin, all token status
 @apiGroup token
 @apiName  fetch-all-tokens
 @apiQuery {Number} current_page = 1
 @apiQuery {Number} limit = 15
 @apiQuery {String} address = ''
 @apiHeader {String} Authorization
 */
router.get('/fetch-all-tokens', token.fetchAllTokens)

/**
 @api {get} /api/contract/find-tokens find-tokens
 @apiGroup token
 @apiName find-tokens
 @apiParam current_page = 1
 @apiParam limit = 15
 @apiParam name
 */
router.get('/find-tokens', token.findToken)

/**
 @api {get} /api/contract/fetch-token-history-day fetch-token-history-day
 @apiGroup token
 @apiName fetch-token-history-day
 @apiParam current_page = 0
 @apiParam limit = 15
 @apiParam token
 */
router.get('/fetch-token-history-day', token.fetchTokenHistoryDay)

/**
 @api {get} /api/contract/fetch-token-history-hour fetch-token-history-hour
 @apiGroup token
 @apiName fetch-token-history-hour
 @apiParam current_page = 0
 @apiParam limit = 15
 @apiParam token
 */
router.get('/fetch-token-history-hour', token.fetchTokenHistoryHour)

module.exports = router;