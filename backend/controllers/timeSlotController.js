const timeSlotService = require('../services/timeSlotService');

const getAllTimeSlots = async (req, res) => {
  try {
    const slots = await timeSlotService.getAllTimeSlots();
    res.status(200).json({ success: true, data: slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTimeSlotById = async (req, res) => {
  try {
    const slot = await timeSlotService.getTimeSlotById(req.params.id);
    if (!slot) return res.status(404).json({ success: false, message: "Không tìm thấy khung giờ" });
    res.status(200).json({ success: true, data: slot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTimeSlot = async (req, res) => {
  try {
    const savedSlot = await timeSlotService.createTimeSlot(req.body);
    res.status(201).json({ success: true, message: "Tạo khung giờ thành công", data: savedSlot });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateTimeSlot = async (req, res) => {
  try {
    const updatedSlot = await timeSlotService.updateTimeSlot(req.params.id, req.body);
    if (!updatedSlot) return res.status(404).json({ success: false, message: "Không tìm thấy khung giờ" });
    res.status(200).json({ success: true, message: "Cập nhật thành công", data: updatedSlot });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteTimeSlot = async (req, res) => {
  try {
    const deletedSlot = await timeSlotService.deleteTimeSlot(req.params.id);
    if (!deletedSlot) return res.status(404).json({ success: false, message: "Không tìm thấy khung giờ" });
    res.status(200).json({ success: true, message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllTimeSlots,
  getTimeSlotById,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot
};
