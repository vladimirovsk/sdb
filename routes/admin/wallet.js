const express = require('express');
const router = express.Router();
const WalletController = require("../../controllers/admin/wallet");
const wallet = new WalletController;

/**
 @api {get} /api/admin/wallet/fetch fetch
 @apiDescription fetch list wallet for a wallet by parameter :address
 @apiGroup wallet
 @apiName fetch
 @apiParam {Number }limit = 15
 @apiParam {Number} current_page = 1
 @apiParam {String} address = '' Optional
 @apiHeader {String} Authorization
 */
router.get('/fetch', wallet.fetchListPagination);

/**
 @api {get} /api/admin/wallet/find find:wallet
 @apiDescription Search for a wallet by parameter :address
 @apiGroup wallet
 @apiName find
 @apiParam {String} address
 @apiHeader {String} Authorization
 */
router.get('/find/:address', wallet.findWallet);


module.exports = router;