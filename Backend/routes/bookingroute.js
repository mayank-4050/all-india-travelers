const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// CREATE BOOKING (Customer)
// CREATE BOOKING (Customer)
// bookingroute.js
router.post('/', authMiddleware, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user.id
    });

    await booking.save();

    // ✅ Emit event to all connected admins
    const io = req.app.get('io');
    io.emit('newBooking', booking);

    res.status(201).json({
      success: true,
      data: booking
    });

  } catch (err) {
    console.error("❌ Booking creation failed:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Update booking status by ID
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    // Find booking and update status
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // return updated doc
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


// GET USER BOOKINGS (Customer)
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

// GET ALL BOOKINGS (Admin)
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'fullName email mobile')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// UPDATE BOOKING STATUS (Admin)
// UPDATE BOOKING STATUS (Admin)
router.patch('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled', 'cancelled by the customer'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }
    // ...


    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
