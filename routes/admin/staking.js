const express = require('express');
const router = express.Router();
const StakingController = require('../../controllers/staking')
const staking = new StakingController;

/**
 * @api {get} /api/admin/staking/fetch fetch
 * @apiGroup admin staking
 * @apiName fetch
 * @apiHeader Authorization
 */
//TODO Документация по админчасти
router.get("/fetch", staking.fetchList)

module.exports = router;