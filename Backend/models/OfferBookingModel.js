import mongoose from "mongoose";

const OfferBookingSchema = new mongoose.Schema({
  // --- User Form Data ---
  customerName: {
    type: String,
    required: [true, "Customer name is required"],
    trim: true,
  },
  customerPhone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
  pickupAddress: {
    type: String,
    required: [true, "Address is required"],
  },

  // --- Data Captured from Offer Page ---
  offerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer", 
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
  },
  distance: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  travelDate: {
    type: String, 
    required: true,
  },
  travelTime: {
    type: String, 
    required: true,
  },
  agencyName: {
    type: String,
    default: "Official All India Travel",
  },
  agencyPhone: {
    type: String,
  },

  // --- Management Fields ---
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    default: "Pending",
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const OfferBooking = mongoose.model("OfferBooking", OfferBookingSchema);

// Export using ES Module syntax
export default OfferBooking;