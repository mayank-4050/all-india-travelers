const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  password: { type: String, required: true },
  // Agent-only fields
  travelerName: String,
  idProofType: String,
  idProofImage: String,
});


module.exports = mongoose.model('User', userSchema);
