const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");


// CREATE BOOKING
router.post(
  "/",
  authMiddleware,
  authorizeRoles("Customer"),
  bookingController.createBooking
);


// CUSTOMER BOOKINGS
router.get(
  "/",
  authMiddleware,
  authorizeRoles("Customer"),
  bookingController.getCustomerBookings
);


// CUSTOMER CANCEL
router.put(
  "/:id/status",
  authMiddleware,
  authorizeRoles("Customer"),
  bookingController.cancelBookingByCustomer
);


// AGENT BOOKINGS
router.get(
  "/agent/confirmed-bookings",
  authMiddleware,
  authorizeRoles("Agent"),
  bookingController.getAgentConfirmedBookings
);


// ADMIN → ONLY ONE WAY BOOKINGS
router.get(
  "/all",
  authMiddleware,
  authorizeRoles("Admin"),
  bookingController.getAllBookingsForAdmin
);

module.exports = router;
