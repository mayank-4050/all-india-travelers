const mongoose = require("mongoose");

const marriageBookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("MarriageBooking", marriageBookingSchema);