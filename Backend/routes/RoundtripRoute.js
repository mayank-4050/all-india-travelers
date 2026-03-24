const express = require('express');
const router = express.Router();
const { 
    createBooking, 
    getAllBookings, 
    getBookingById,
    deleteBooking
} = require('../controllers/RounttripController');

// 1. Nayi booking save karne ke liye
// Path: /api/roundtrip/new
router.post('/new', createBooking);

// 2. Saari bookings fetch karne ke liye (Admin ke liye)
// Path: /api/roundtrip/all
router.get('/all', getAllBookings);

// 3. Kisi ek specific booking ki detail dekhne ke liye ID se
// Path: /api/roundtrip/:id
router.get('/:id', getBookingById);

router.delete('/:id', deleteBooking);

module.exports = router;