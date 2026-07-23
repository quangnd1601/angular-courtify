const Court = require('../models/Court');

const getCourtsByCenter = async (centerId) => {
  return await Court.find({ sport_center_id: centerId });
};

const getCourtById = async (id) => {
  return await Court.findById(id);
};

const createCourt = async (courtData) => {
  const newCourt = new Court(courtData);
  return await newCourt.save();
};

const updateCourt = async (id, updateData) => {
  return await Court.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCourt = async (id) => {
  return await Court.findByIdAndDelete(id);
};

const bulkUpdatePrice = async (centerId, price) => {
  return await Court.updateMany(
    { sport_center_id: centerId },
    { $set: { price_per_hour: price } }
  );
};

module.exports = {
  getCourtsByCenter,
  getCourtById,
  createCourt,
  updateCourt,
  deleteCourt,
  bulkUpdatePrice
};
