const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true },
  
  payment_method: { type: String, required: true }, // e.g., 'VNPAY', 'MOMO', 'CASH'
  payment_provider: { type: String },
  transaction_id: { type: String },
  
  paid_amount: { type: Number, required: true },
  payment_status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
  
  paid_at: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
