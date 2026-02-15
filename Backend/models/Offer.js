const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true
    },

    to: {
      type: String,
      required: true,
      trim: true
    },

    vehicle: {
      type: String,
      enum: ["Crysta", "Tavera", "Dzire", "Zest", "Ertiga"],
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    date: {
      type: String,
      required: true
    },

    seats: {
      type: Number,
      required: true
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    },

    distance: {
      type: Number,
      default: 0
    },

    image: {
      type: String,
      default: ""
    },

    // 🔥 Agency Info (Auto from logged-in Agent)
    agencyName: {
      type: String,
      required: true
    },

    agencyPhone: {
      type: String,
      required: true
    },

    // 🔥 Link Offer to Agent
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 🔥 Offer Status (Future Use)
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active"
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
