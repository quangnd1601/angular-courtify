const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

const authen = require('../middleware/authen');

// API Xem lịch sử đặt sân
router.get('/history', authen, bookingController.getMyBookings);

// API Đặt sân mới 
router.post('/', authen, bookingController.createBooking);

module.exports = router;
