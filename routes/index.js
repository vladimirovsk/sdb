const express = require('express');
const router = express.Router();

router.use('/contract' , require('./tokens.js'));
router.use('/contract' , require('./pairs.js'));
router.use('/blockchain' , require('./blockchain.js'));
router.use('/customer' , require('./customer.js'));
router.use('/staking' , require('./staking.js'));
router.use('/vendor' , require('./vendor.js'));
router.use('/transaction' , require('./transaction'));
router.use('/auth' , require('./auth.js'));

router.use('/admin/wallet' , require('./admin/wallet.js'));
router.use('/admin/exchanges' , require('./admin/exchanges.js'));
router.use('/admin/staking' , require('./admin/staking.js'));
router.use('/admin' , require('./admin/index.js'));

module.exports = router;
