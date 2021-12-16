const express = require('express');
const router = express.Router();
const TransactionController = require("../controllers/transaction");
const transaction = new TransactionController;

/**
 @api {get} /api/transaction/fetch fetch
 @apiGroup transaction
 @apiName fetch
 @apiQuery {Number} limit DefaultValue =15
 @apiQuery {Number} current_page DefaultValue=1
 @apiHeader {String} Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 @apiDescription Selecting All Transaction Records
 */
router.get('/fetch', transaction.fetchListPagination);

/**
 @api {get} /api/transaction/find-from find-from:address
 @apiDescription Filtering record transaction from field 'from' from = you wallet
 @apiGroup transaction
 @apiName find-from
 @apiParam {Number} limit DefaultValue = 15
 @apiParam {Number} current_page DefaultValue = 1
 @apiParam {String} address = "0x33295b5De6e00"
 @apiHeader {String} Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
router.get('/find-from/:address', transaction.fetchListFromPagination);

/**
 @api {get} /api/transaction/find-to find-to
 @apiDescription Filtering record transaction from field 'to'
 @apiGroup transaction
 @apiName find-to
 @apiQuery {Number} limit DefaultValue = 15
 @apiQuery {Number} current_page DefaultValue = 1
 @apiQuery {String} [pairAddress]  ""
 @apiQuery {String} [walletAddress] ""
 @apiHeader {String} Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
router.get('/find-to', transaction.fetchListToPagination);

/**
 @api {post} /api/transaction/addTransaction addTransaction
 @apiDescription Add manual transaction from Swap and addLiquidity
 @apiGroup transaction
 @apiName addTransaction
 @apiQuery {String} [pairAddress]  ""
 @apiQuery {String} [walletAddress] ""
 @apiQuery {String} [method] "Swap/addLiquidity"
 @apiQuery {String} hash "hash transaction"
 @apiQuery {String} block_number "Number block in Blockchain"
 @apiQuery {Boolean} status DefaultValues=true
 @apiHeader {String} Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
router.post('/addTransaction', transaction.addTransaction)


module.exports = router;