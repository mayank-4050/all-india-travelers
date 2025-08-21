const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    from: { type: String, required: true, trim: true },
    to: { type: String, required: true, trim: true },
    vehicle: { type: String, enum: ["Crysta", "Tavera", "Dzire","Zest","Ertiga"], required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    seats: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    distance: { type: Number },
    image: { type: String }, // optional (if you want car image)
  },
  { timestamps: true }
);

// ✅ Correct export
module.exports = mongoose.model("Offer", offerSchema);