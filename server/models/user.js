const mongoose = require('mongoose'); // Change from import

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  isVip: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User; // Change from export default