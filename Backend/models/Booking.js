const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  vehicle: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  baseAmount: {
    type: Number,
    required: true
  },
  driverAllowance: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  passenger: {
    name: String,
    phone: String,
    email: String,
    idType: String,
    idNumber: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
