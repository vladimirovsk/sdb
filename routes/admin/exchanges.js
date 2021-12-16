const express = require('express');
const router = express.Router();
const ExchangesController = require("../../controllers/admin/exchanges");
const exchanges = new ExchangesController;

/**
 @api {get} /api/admin/exchanges/fetch fetch
 @apiGroup exchanges
 @apiName fetch
 @apiQuery {Number} limit DefaultValue =15
 @apiQuery {Number} current_page DefaultValue=1
 @apiHeader {String} Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 @apiDescription Selecting All Transaction Records
 */
router.get('/fetch', exchanges.fetchListPagination);

/**
 @api {get} /api/admin/exchanges/find find:wallet
 @apiGroup exchanges
 @apiName find
 @apiParam {Number} limit DefaultValue = 15
 @apiParam {Number} current_page DefaultValue = 1
 @apiParam {String} wallet = "0x33295b5De6e00"
 @apiHeader {String} Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 @apiDescription Selecting All Transaction Records
 */
router.get('/find/:wallet', exchanges.fetchListFromWalletPagination);


module.exports = router;