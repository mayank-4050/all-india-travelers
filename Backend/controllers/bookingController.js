const Booking = require("../models/Booking");
const Offer = require("../models/Offer");


// =============================
// CREATE BOOKING
// =============================
exports.createBooking = async (req, res) => {
  try {
    const {
      offerId,
      from,
      to,
      date,
      time,
      vehicle,
      seats,
      distance,
      baseAmount,
      driverAllowance,
      totalAmount,
      passenger
    } = req.body;

    let offer = null;

    if (offerId) {
      offer = await Offer.findById(offerId);
      if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
      }
    }

    const booking = new Booking({
      user: req.user._id,
      offerId: offer ? offer._id : null,
      from,
      to,
      date,
      time,
      vehicle,
      seats,
      distance,
      baseAmount,
      driverAllowance,
      totalAmount,
      passenger,
      status: "confirmed"
    });

    await booking.save();

    res.status(201).json({
      success: true,
      data: booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =============================
// GET CUSTOMER BOOKINGS
// =============================
exports.getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =============================
// CANCEL BOOKING (Customer)
// =============================
exports.cancelBookingByCustomer = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancelled by the customer";
    await booking.save();

    res.json({
      success: true,
      data: booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =============================
// AGENT CONFIRMED BOOKINGS
// =============================
exports.getAgentConfirmedBookings = async (req, res) => {
  try {

    const offers = await Offer.find({
      createdBy: req.user._id
    });

    const offerIds = offers.map(o => o._id);

    const bookings = await Booking.find({
      offerId: { $in: offerIds },
      status: "confirmed"
    })
      .populate("user", "fullName email mobile")
      .populate("offerId", "from to vehicle amount date");

    res.json({
      success: true,
      data: bookings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =============================
// ADMIN → ONLY ONE WAY BOOKINGS
// =============================
exports.getAllBookingsForAdmin = async (req, res) => {
  try {

    const bookings = await Booking.find({
      offerId: null   // 🔥 only one way bookings
    })
      .populate("user", "fullName email mobile")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
