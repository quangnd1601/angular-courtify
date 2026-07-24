const SportCenter = require('../models/SportCenter');

const getAllCenters = async (filters = {}) => {
  const query = {};

  // Search by name or address
  if (filters.search) {
    const regex = new RegExp(filters.search, 'i');
    query.$or = [{ name: regex }, { address: regex }];
  }

  // Filter by sport
  if (filters.sport_id) {
    query.sport_id = filters.sport_id;
  }

  // Filter by price range
  if (filters.min_price) {
    query.default_price = { ...query.default_price, $gte: Number(filters.min_price) };
  }
  if (filters.max_price) {
    query.default_price = { ...query.default_price, $lte: Number(filters.max_price) };
  }

  // Filter by minimum rating
  if (filters.min_rating) {
    query.average_rating = { $gte: Number(filters.min_rating) };
  }

  // Only active centers
  query.status = 'ACTIVE';

  // Sort
  let sortOption = {};
  switch (filters.sort) {
    case 'price_asc':
      sortOption = { default_price: 1 };
      break;
    case 'price_desc':
      sortOption = { default_price: -1 };
      break;
    case 'rating_desc':
      sortOption = { average_rating: -1 };
      break;
    case 'bookings_desc':
      sortOption = { total_bookings: -1 };
      break;
    case 'newest':
      sortOption = { created_at: -1 };
      break;
    default:
      sortOption = { total_bookings: -1 }; // Default: phổ biến nhất
  }

  return await SportCenter.find(query)
    .populate('owner_id', 'name email phone')
    .populate('sport_id', 'name')
    .sort(sortOption);
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
