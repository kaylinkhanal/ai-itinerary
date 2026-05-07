const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  averagePrice: { type: Number, required: true },
  specialOffers: String,
  imageUrl: { type: String, default: 'https://via.placeholder.com/300' }
});

module.exports = mongoose.model('Hotel', hotelSchema);