const express = require('express');
const router = express.Router();
const VendorController = require('../controllers/vendor')
const vendor = new VendorController;

/**
 * @api {post} /api/vendor/calc-vendor calc-vendor
 * @apiGroup vendor
 * @apiName calc-vendor
 * @apiBody {Number} [amount]
 * @apiHeader Authorization
 */
router.post("/calc-vendor", vendor.calcVendor);

/**
 * @api {get} /api/vendor/alloc-point alloc-point
 * @apiDescription How much can you sell SDB
 * @apiGroup vendor
 * @apiName alloc-point
 * @apiHeader Authorization
 */
router.get("/alloc-point", vendor.totalAllocPoint);

/**
 * @api {get} /api/vendor/money-point money-point
 * @apiDescription How much USD have accumulated
 * @apiGroup vendor
 * @apiName money-point
 * @apiHeader Authorization
 */
router.get("/money-point", vendor.totalMoneyPoint);


/**
 * @api {get} /api/vendor/pool-info pool-info
 * @apiGroup vendor
 * @apiName pool-info
 * @apiHeader Authorization
 */
router.get("/pool-info", vendor.poolInfo);

module.exports = router;