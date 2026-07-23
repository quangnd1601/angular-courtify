const Booking = require('../models/Booking');
const BookedSlot = require('../models/BookedSlot');

// Hàm kiểm tra lịch trống (Dùng cho UI check trước khi ấn đặt)
const checkAvailability = async (courtId, date, timeSlotIds) => {
  const existingHolds = await BookedSlot.find({
    court_id: courtId,
    booking_for_date: date,
    time_slot_id: { $in: timeSlotIds },
    status: { $in: ['PENDING', 'CONFIRMED'] }
  });
  return existingHolds;
};

// tạo đơn + chống trùng lịch
const createBooking = async (bookingData) => {
  // 1. Cố gắng ghi vào bảng BookedSlot để KHÓA LỊCH
  // Nếu có người khác đã đặt trùng Sân + Ngày + Giờ, đoạn code này sẽ văng lỗi MongoDB 11000 (Duplicate Key)
  const holdPromises = bookingData.details.map(detail => {
    return BookedSlot.create({
      court_id: detail.court_id,
      booking_for_date: bookingData.booking_for_date,
      time_slot_id: detail.time_slot_id,
      status: 'PENDING' // Bắt đầu đếm ngược 10 phút tự hủy
    });
  });

  const heldSlots = await Promise.all(holdPromises);

  // 2. Chỉ khi nào Khóa Lịch thành công 100%, mới tạo Hóa đơn Booking
  const newBooking = new Booking({
    user_id: bookingData.user_id,
    booking_for_date: bookingData.booking_for_date,
    subtotal: bookingData.total_price, // Tạm lấy bằng total_price cho đơn giản
    total_price: bookingData.total_price,
    details: bookingData.details,
    services: bookingData.services || [],
    status: 'PENDING'
  });

  const savedBooking = await newBooking.save();

  // 3. Gắn booking_id ngược lại vào các Slot đã khóa để biết Slot này thuộc hóa đơn nào
  await BookedSlot.updateMany(
    { _id: { $in: heldSlots.map(s => s._id) } },
    { $set: { booking_id: savedBooking._id } }
  );

  return savedBooking;
};

const getMyBookings = async (userId) => {
  return await Booking.find({ user_id: userId })
    .populate('details.court_id', 'court_name')
    .sort({ created_at: -1 }); // Sắp xếp mới nhất
};

module.exports = {
  checkAvailability,
  createBooking,
  getMyBookings
};
