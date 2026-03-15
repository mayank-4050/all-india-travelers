const express = require("express");
const router = express.Router();
const MarriageBooking = require("../models/MarriageBooking");

// create booking
router.post("/create", async (req, res) => {
  try {

    const booking = new MarriageBooking(req.body);
    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking submitted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all bookings (admin)
router.get("/all", async (req, res) => {

  const bookings = await MarriageBooking.find().sort({createdAt:-1});

  res.json(bookings);
});

module.exports = router;