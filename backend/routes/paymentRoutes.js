const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authen = require('../middleware/authen');

router.post('/', authen, paymentController.createPayment);

module.exports = router;
