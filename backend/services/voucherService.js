const Voucher = require('../models/Voucher');

const getAllVouchers = async () => {
  return await Voucher.find({ status: 'ACTIVE' });
};

const getVoucherById = async (id) => {
  return await Voucher.findById(id);
};

const createVoucher = async (voucherData) => {
  const newVoucher = new Voucher(voucherData);
  return await newVoucher.save();
};

const updateVoucher = async (id, voucherData) => {
  return await Voucher.findByIdAndUpdate(id, voucherData, { new: true });
};

const deleteVoucher = async (id) => {
  return await Voucher.findByIdAndDelete(id);
};

const getVoucherByCode = async (code) => {
  return await Voucher.findOne({ code, status: 'ACTIVE' });
};

module.exports = {
  getAllVouchers,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  getVoucherByCode
};
