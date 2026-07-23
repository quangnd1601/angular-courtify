const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const BookedSlot = require('../models/BookedSlot');

const processPayment = async (paymentData) => {
  const { booking_id, payment_method, paid_amount } = paymentData;

  // 1. Kiểm tra hóa đơn tồn tại và chưa được thanh toán
  const booking = await Booking.findById(booking_id);
  if (!booking) throw new Error('Hóa đơn không tồn tại');
  if (booking.status !== 'PENDING') throw new Error('Hóa đơn này đã được xử lý hoặc đã hủy');

  // 2. Tạo bản ghi thanh toán
  const newPayment = new Payment({
    booking_id,
    payment_method,
    paid_amount,
    payment_status: 'SUCCESS',
    paid_at: new Date()
  });
  await newPayment.save();

  // 3. Cập nhật trạng thái Hóa Đơn và Khung Giờ (Lock cứng) thành CONFIRMED
  booking.status = 'CONFIRMED';
  await booking.save();

  await BookedSlot.updateMany(
    { booking_id: booking_id },
    { $set: { status: 'CONFIRMED' } }
  );

  return newPayment;
};

module.exports = {
  processPayment
};
