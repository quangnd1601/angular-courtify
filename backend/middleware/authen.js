const jwt = require('jsonwebtoken');

const authen = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'quang');
      req.user = decoded.user;
      return next();
    }
    return res.status(401).json({ error: 'Không tìm thấy Token xác thực' });
  } catch (error) {
    return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn: ' + error.message });
  }
};

module.exports = authen;
