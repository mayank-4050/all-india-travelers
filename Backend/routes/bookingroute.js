const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');

// CREATE BOOKING
router.post('/', authMiddleware, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user.id
    });

    await booking.save();
    
    res.status(201).json({
      success: true,
      data: booking
    });
    
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// GET USER BOOKINGS
router.get('/', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings
    });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;
