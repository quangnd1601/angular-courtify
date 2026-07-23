const sportCenterService = require('../services/sportCenterService');

const getAllCenters = async (req, res) => {
  try {
    const centers = await sportCenterService.getAllCenters();
    res.status(200).json({ success: true, data: centers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCenterById = async (req, res) => {
  try {
    const center = await sportCenterService.getCenterById(req.params.id);
    if (!center) return res.status(404).json({ success: false, message: 'Không tìm thấy trung tâm' });
    res.status(200).json({ success: true, data: center });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createCenter = async (req, res) => {
  try {
    const newCenter = await sportCenterService.createCenter(req.body);
    res.status(201).json({ success: true, data: newCenter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCenter = async (req, res) => {
  try {
    const updated = await sportCenterService.updateCenter(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Không tìm thấy trung tâm' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCenter = async (req, res) => {
  try {
    const deleted = await sportCenterService.deleteCenter(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Không tìm thấy trung tâm' });
    res.status(200).json({ success: true, message: 'Xóa trung tâm thành công' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllCenters,
  getCenterById,
  createCenter,
  updateCenter,
  deleteCenter
};
