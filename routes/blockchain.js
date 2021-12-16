const express = require('express');
const router = express.Router();
const BlockchainController = require('../controllers/blockchain')
const blockchain = new BlockchainController;

router.get("/block-info", blockchain.getBlockInfo)
router.get("/token-read", blockchain.tokenRead)
router.post("/remove-liquidity", blockchain.removeLiquidity)
router.get("/fetch-pair", blockchain.fetchPairs)

/**
 @api {get} /api/blockchain/swap-tokens-tokens swap-tokens-tokens
 @apiGroup blockchain
 @apiName swap-tokens-tokens
 @apiDescription for testing swap function in backend
 */
router.post("/swap-tokens-tokens", blockchain.swapExactTokensForTokens)

/**
 @api {get} /api/blockchain/add-liquidity add-liquidity
 @apiGroup blockchain
 @apiName add-liquidity
  @apiDescription for testing add-liquidity function in backend
 */
router.post("/add-liquidity", blockchain.addLiquidity)

/**
 @api {get} /api/blockchain/create-pair create-pair
 @apiGroup blockchain
 @apiName create-pair
  @apiDescription for testing create-pair function in backend
 */
router.post("/create-pair", blockchain.createPair)

/**
 @api {get} /api/blockchain/approve-token approve-token
 @apiGroup blockchain
 @apiName approve-token
 @apiDescription approve-token in backend
 */
router.post("/approve-token", blockchain.approveToken)

/**
 @api {get} /api/blockchain/home-info home-info
 @apiGroup blockchain
 @apiName home-info
 @apiDescription Output info from home page SDB
 */
router.get('/home-info', blockchain.infoFromHome)

module.exports = router;
