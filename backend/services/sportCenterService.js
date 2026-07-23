const SportCenter = require('../models/SportCenter');

const getAllCenters = async () => {
  return await SportCenter.find().populate('owner_id', 'name email phone').populate('sport_id', 'name');
};

const getCenterById = async (id) => {
  return await SportCenter.findById(id).populate('owner_id', 'name email phone').populate('sport_id', 'name');
};

const createCenter = async (centerData) => {
  const newCenter = new SportCenter(centerData);
  return await newCenter.save();
};

const updateCenter = async (id, updateData) => {
  return await SportCenter.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCenter = async (id) => {
  return await SportCenter.findByIdAndDelete(id);
};

module.exports = {
  getAllCenters,
  getCenterById,
  createCenter,
  updateCenter,
  deleteCenter
};
