// routes/offerRoutes.js
const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer"); // ✅ no .js needed, Node resolves automatically

// ✅ Save Offer
router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming Offer:", req.body);

    // Simple validation
    if (!req.body.from || !req.body.to || !req.body.vehicle || !req.body.amount) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const offer = new Offer(req.body);
    await offer.save();

    res.status(201).json({ success: true, data: offer });
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
