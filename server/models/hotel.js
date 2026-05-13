const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  adminStaff: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  averagePrice: { type: Number, required: true },
  rooms: [
    {
      type: String,
      enum: ['single', 'double', 'suite'],
      required: true
    }
  ],
  specialOffers: String,
  imageUrl: { type: String, default: 'https://via.placeholder.com/300' }
});

module.exports = mongoose.model('Hotel', hotelSchema);