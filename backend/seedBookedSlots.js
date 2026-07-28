/**
 * Script tạo dữ liệu mẫu cho bảng BookedSlot
 * Dữ liệu được tạo trùng khớp với các Booking đã có trong database
 * 
 * Chạy: node seedBookedSlots.js
 * 
 * LƯU Ý: 
 *  - BookedSlot có TTL index (expires: 600) trên created_at.
 *  - MongoDB TTL chỉ xóa document khi created_at + 600s < now.
 *  - Để tránh bị xóa tự động, các record CONFIRMED sẽ dùng thời gian hiện tại.
 *  - Các record CANCELLED sẽ có created_at trong quá khứ (đã bị cancel rồi nên TTL không ảnh hưởng vì partial index chỉ unique trên PENDING/CONFIRMED).
 */

const mongoose = require('mongoose');
require('./models/BookedSlot');

const BookedSlot = mongoose.model('BookedSlot');

// Dữ liệu mẫu BookedSlot khớp 1-1 với details của từng Booking
const bookedSlotsData = [
  // ===== Booking 1: user 60d5ecb8b392d223c8a4c101, ngày 2026-07-20, COMPLETED =====
  // Đã hoàn thành -> status CONFIRMED (hoặc đã xong, giữ CONFIRMED vì không có COMPLETED trong BookedSlot enum)
  {
    booking_id: new mongoose.Types.ObjectId('671000000000000000000001'),
    court_id: new mongoose.Types.ObjectId('66c000000000000000000001'), // Sân A1
    booking_for_date: '2026-07-20',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c307'), // 07:00-08:00
    status: 'CONFIRMED',
  },
  {
    booking_id: new mongoose.Types.ObjectId('671000000000000000000001'),
    court_id: new mongoose.Types.ObjectId('66c000000000000000000001'), // Sân A1
    booking_for_date: '2026-07-20',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c308'), // 08:00-09:00
    status: 'CONFIRMED',
  },

  // ===== Booking 2: user 6a616b0c87674253cbee5b25, ngày 2026-07-21, COMPLETED =====
  {
    booking_id: new mongoose.Types.ObjectId('671000000000000000000002'),
    court_id: new mongoose.Types.ObjectId('66c000000000000000000005'), // Pickle 1
    booking_for_date: '2026-07-21',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c317'), // 17:00-18:00
    status: 'CONFIRMED',
  },

  // ===== Booking 3: user 60d5ecb8b392d223c8a4c101, ngày 2026-07-22, COMPLETED =====
  {
    booking_id: new mongoose.Types.ObjectId('671000000000000000000003'),
    court_id: new mongoose.Types.ObjectId('66c000000000000000000003'), // Hard Court 1
    booking_for_date: '2026-07-22',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c317'), // 17:00-18:00
    status: 'CONFIRMED',
  },

  // ===== Booking 4: user 6a616b0c87674253cbee5b25, ngày 2026-07-22, COMPLETED =====
  {
    booking_id: new mongoose.Types.ObjectId('671000000000000000000004'),
    court_id: new mongoose.Types.ObjectId('66c00000000000000000000b'), // Star 1
    booking_for_date: '2026-07-22',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c309'), // 09:00-10:00
    status: 'CONFIRMED',
  },
  {
    booking_id: new mongoose.Types.ObjectId('671000000000000000000004'),
    court_id: new mongoose.Types.ObjectId('66c00000000000000000000b'), // Star 1
    booking_for_date: '2026-07-22',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c310'), // 10:00-11:00
    status: 'CONFIRMED',
  },

  // ===== Booking 5: user 60d5ecb8b392d223c8a4c101, ngày 2026-07-23, CONFIRMED =====
  {
    booking_id: new mongoose.Types.ObjectId('671000000000000000000005'),
    court_id: new mongoose.Types.ObjectId('66c000000000000000000002'), // Sân A2
    booking_for_date: '2026-07-23',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c306'), // 06:00-07:00
    status: 'CONFIRMED',
  },

  // ===== Booking 6: user 6a616b0c87674253cbee5b25, ngày 2026-07-23, CONFIRMED =====
  {
    booking_id: new mongoose.Types.ObjectId('671000000000000000000006'),
    court_id: new mongoose.Types.ObjectId('66c000000000000000000008'), // Center Court
    booking_for_date: '2026-07-23',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c318'), // 18:00-19:00
    status: 'CONFIRMED',
  },

  // ===== Booking 7: user 60d5ecb8b392d223c8a4c101, ngày 2026-07-24, PENDING =====
  {
    booking_id: new mongoose.Types.ObjectId('671000000000000000000007'),
    court_id: new mongoose.Types.ObjectId('66c000000000000000000005'), // Pickle 1
    booking_for_date: '2026-07-24',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c319'), // 19:00-20:00
    status: 'CONFIRMED', // Đặt CONFIRMED thay vì PENDING để tránh bị TTL xóa
  },

  // ===== Booking 8: user 6a616b0c87674253cbee5b25, ngày 2026-07-24, PENDING =====
  {
    booking_id: new mongoose.Types.ObjectId('671000000000000000000008'),
    court_id: new mongoose.Types.ObjectId('66c000000000000000000007'), // Sân B1
    booking_for_date: '2026-07-24',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c320'), // 20:00-21:00
    status: 'CONFIRMED', // Đặt CONFIRMED thay vì PENDING để tránh bị TTL xóa
  },

  // ===== Booking 9: user 60d5ecb8b392d223c8a4c101, ngày 2026-07-25, PENDING =====
  {
    booking_id: new mongoose.Types.ObjectId('671000000000000000000009'),
    court_id: new mongoose.Types.ObjectId('66c00000000000000000000d'), // Hub Court 1
    booking_for_date: '2026-07-25',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c309'), // 09:00-10:00
    status: 'CONFIRMED', // Đặt CONFIRMED thay vì PENDING để tránh bị TTL xóa
  },

  // ===== Booking 10: user 60d5ecb8b392d223c8a4c101, ngày 2026-07-18, COMPLETED =====
  {
    booking_id: new mongoose.Types.ObjectId('67100000000000000000000a'),
    court_id: new mongoose.Types.ObjectId('66c000000000000000000003'), // Hard Court 1
    booking_for_date: '2026-07-18',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c308'), // 08:00-09:00
    status: 'CONFIRMED',
  },

  // ===== Booking 11: user 6a616b0c87674253cbee5b25, ngày 2026-07-19, COMPLETED =====
  {
    booking_id: new mongoose.Types.ObjectId('67100000000000000000000b'),
    court_id: new mongoose.Types.ObjectId('66c000000000000000000006'), // Pickle 2
    booking_for_date: '2026-07-19',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c318'), // 18:00-19:00
    status: 'CONFIRMED',
  },

  // ===== Booking 12: user 60d5ecb8b392d223c8a4c101, ngày 2026-07-19, CANCELLED =====
  {
    booking_id: new mongoose.Types.ObjectId('67100000000000000000000c'),
    court_id: new mongoose.Types.ObjectId('66c000000000000000000007'), // Sân B1
    booking_for_date: '2026-07-19',
    time_slot_id: new mongoose.Types.ObjectId('60d5ecb8b392d223c8a4c307'), // 07:00-08:00
    status: 'CANCELLED',
  },
];

async function seedBookedSlots() {
  try {
    await mongoose.connect('mongodb://localhost:27017/Courtify');
    console.log('✅ Kết nối MongoDB thành công');

    // Xóa dữ liệu cũ trong collection BookedSlot
    const deleted = await BookedSlot.deleteMany({});
    console.log(`🗑️  Đã xóa ${deleted.deletedCount} BookedSlot cũ`);

    // Insert dữ liệu mẫu
    const inserted = await BookedSlot.insertMany(bookedSlotsData);
    console.log(`✨ Đã tạo ${inserted.length} BookedSlot mẫu thành công!`);

    // In ra kết quả
    console.log('\n📋 Danh sách BookedSlot đã tạo:');
    console.log('─'.repeat(90));
    console.log(
      'Booking ID'.padEnd(28),
      'Court ID'.padEnd(28),
      'Ngày'.padEnd(13),
      'TimeSlot'.padEnd(28),
      'Status'
    );
    console.log('─'.repeat(90));
    
    for (const slot of inserted) {
      console.log(
        slot.booking_id.toString().padEnd(28),
        slot.court_id.toString().padEnd(28),
        slot.booking_for_date.padEnd(13),
        slot.time_slot_id.toString().padEnd(28),
        slot.status
      );
    }

    console.log('─'.repeat(90));
    console.log('\n🎉 Seed hoàn tất!');
  } catch (error) {
    console.error('❌ Lỗi khi seed BookedSlot:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Đã ngắt kết nối MongoDB');
  }
}

seedBookedSlots();
