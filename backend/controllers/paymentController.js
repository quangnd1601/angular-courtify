const paymentService = require('../services/paymentService');

const createPayment = async (req, res) => {
  try {
    const payment = await paymentService.processPayment(req.body);
    res.status(201).json({
      success: true,
      message: "Thanh toán thành công! Sân của bạn đã được chốt.",
      data: payment
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPayment
};
