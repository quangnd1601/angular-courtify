const bookingService = require('../services/bookingService');

const createBooking = async (req, res) => {
  try {
    const savedBooking = await bookingService.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Giữ chỗ thành công! Vui lòng thanh toán trong vòng 10 phút.",
      data: savedBooking
    });
  } catch (error) {
    // check trùng lịch
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Rất tiếc! Một trong các khung giờ bạn chọn vừa có người đặt mất rồi."
      });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id; // Từ token
    const bookings = await bookingService.getMyBookings(userId);
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings
};
