const UserService = require('../services/userService');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }
    const user = await UserService.getOne(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const { email, password } = req.body;
    if (email) {
      const existingUsers = await UserService.getAll();
      const emailExists = existingUsers.find(
        (u) => u.email === email && u._id.toString() !== userId,
      );
      if (emailExists) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }
    }

    const updateData = { ...req.body };
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      updateData.password = bcrypt.hashSync(password, salt);
    }

    const user = await UserService.update(userId, updateData);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const lockUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }
    const user = await UserService.lock(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    res.status(200).json({ message: "Khóa người dùng thành công", user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const register = async (req, res, next) => {
  try {
    const user = await UserService.register(req.body);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    if (error.message === 'Vui lòng nhập đầy đủ thông tin' || 
        error.message === 'Mật khẩu và xác nhận mật khẩu không trùng khớp' || 
        error.message === 'Email đã tồn tại') {
        return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, access_token, refresh_token } = await UserService.login(email, password);
    res.status(200).json({ user, access_token, refresh_token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    const result = await UserService.refreshAccessToken(refresh_token);
    res.status(200).json(result);
  } catch (error) {
    res.status(414).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.userId;
    const user = await UserService.getUserProfile(userId);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  lockUser,
  register,
  login,
  refreshToken,
  getProfile
};
