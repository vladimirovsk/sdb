const express = require('express');
const router = express.Router();
const CustomerController = require("../controllers/customer.js");
const customer = new CustomerController;

router.get('/fetch', customer.fetchList)

router.post('/create', customer.createCustomer)
router.post('/edit', customer.editCustomer)
module.exports = router;