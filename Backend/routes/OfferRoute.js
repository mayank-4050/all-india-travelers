const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");
const sendSMS = require("../utils/sendSMS"); // ✅ utility import

// ✅ Save Offer & Send SMS
router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming Offer:", req.body);

    // Simple validation
    if (!req.body.from || !req.body.to || !req.body.vehicle || !req.body.amount) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const offer = new Offer(req.body);
    await offer.save();

    // 📲 SMS text for admin
    const smsText = `📢 New Offer Posted!
From: ${offer.from}
To: ${offer.to}
Vehicle: ${offer.vehicle}
Amount: ₹${offer.amount}`;

    // ✅ Send SMS
    await sendSMS(process.env.ADMIN_PHONE, smsText);

    res.status(201).json({ success: true, data: offer, message: "Offer added & SMS sent to admin" });
  } catch (err) {
    console.error("❌ Offer Save Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Get All Offers
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json({ success: true, data: offers });
  } catch (err) {
    console.error("❌ Fetch Offers Error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch offers" });
  }
});

module.exports = router;
