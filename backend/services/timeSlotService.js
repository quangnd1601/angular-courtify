const TimeSlot = require('../models/TimeSlot');

const getAllTimeSlots = async () => {
  return await TimeSlot.find().sort({ start_time: 1 }); // Sắp xếp theo giờ tăng dần
};

const getTimeSlotById = async (id) => {
  return await TimeSlot.findById(id);
};

const createTimeSlot = async (slotData) => {
  const newSlot = new TimeSlot(slotData);
  return await newSlot.save();
};

const updateTimeSlot = async (id, slotData) => {
  return await TimeSlot.findByIdAndUpdate(id, slotData, { new: true });
};

const deleteTimeSlot = async (id) => {
  return await TimeSlot.findByIdAndDelete(id);
};

module.exports = {
  getAllTimeSlots,
  getTimeSlotById,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot
};
