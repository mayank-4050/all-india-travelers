const express = require("express");
const router = express.Router();
const { confirmBooking } = require("../controllers/OfferBookingCotroller.js");

// @route   POST /api/bookings/offer-confirm
// @desc    Confirm a booking from the one-way offer page
// @access  Public
router.post("/offer-confirm", confirmBooking);

// Optional: GET route if you want to see all bookings in an Admin Panel later
// router.get("/all-bookings", getAllBookings);

module.exports = router; 