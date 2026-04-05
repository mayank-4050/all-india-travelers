const express = require('express');
const router = express.Router();

// Controller ko import karein
const { createBooking, getAllBookings } = require('../controllers/OnewaybookingController');

// 1. Nayi Booking save karne ke liye (User click karega tab ye chalega)
// Endpoint: POST /api/bookings/new-booking
router.post('/new-booking', createBooking);

// 2. Saari Bookings fetch karne ke liye (Admin Dashboard ke liye)
// Endpoint: GET /api/bookings/all
router.get('/all', getAllBookings);

// 3. (Optional) Kisi specific booking ka status update karne ke liye
// router.patch('/update-status/:id', updateBookingStatus);

module.exports = router;