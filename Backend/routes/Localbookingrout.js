const express = require('express');
const router = express.Router();

const {
    createLocalBooking,
    getallLocalBookings, // Updated name to match the controller
    deleteLocalBooking
} = require('../controllers/LocalbookingController');

// POST: Create a new booking
router.post('/new-booking', createLocalBooking);

// GET: Fetch all bookings for Admin
router.get('/all', getallLocalBookings);

// DELETE: Remove a booking by ID
router.delete('/delete/:id', deleteLocalBooking);

module.exports = router;