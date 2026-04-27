import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  password: String,
  phoneNumber: {type: String},
  isVip: Boolean
});

const User = mongoose.model('User', userSchema);

export default User;