const Offer = require("../models/Offer");
const sendSMS = require("../utils/sendSMS");


// =================================================
// ✅ CREATE OFFER (with agency auto-attach + SMS)
// =================================================
exports.createOffer = async (req, res) => {
  try {
    console.log("📥 Incoming Offer:", req.body);

    if (!req.body.from || !req.body.to || !req.body.vehicle || !req.body.amount) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    const offer = new Offer({
      from: req.body.from,
      to: req.body.to,
      vehicle: req.body.vehicle,
      amount: req.body.amount,
      date: req.body.date,
      seats: req.body.seats,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      distance: req.body.distance,
      image: req.body.image,

      agencyName: req.user.travelerName,
      agencyPhone: req.user.mobile,

      // 🔥 Ownership field (IMPORTANT)
      createdBy: req.user._id
    });

    await offer.save();

    const smsText = `📢 New Offer Posted!
From: ${offer.from}
To: ${offer.to}
Vehicle: ${offer.vehicle}
Amount: ₹${offer.amount}
Agency: ${offer.agencyName}
Phone: ${offer.agencyPhone}`;

    await sendSMS(process.env.ADMIN_PHONE, smsText);

    res.status(201).json({
      success: true,
      data: offer,
      message: "Offer added & SMS sent to admin"
    });

  } catch (err) {
    console.error("❌ Offer Save Error:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};


// =================================================
// ✅ GET ALL OFFERS
// =================================================
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: offers
    });

  } catch (err) {
    console.error("❌ Fetch Offers Error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch offers"
    });
  }
};


// =================================================
// ✅ GET MY OFFERS (Agent Dashboard)
// =================================================
exports.getMyOffers = async (req, res) => {
  try {
    const offers = await Offer.find({
      createdBy: req.user._id
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: offers
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your offers"
    });
  }
};


// =================================================
// 🔴 DELETE OFFER (Only Owner)
// =================================================
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found"
      });
    }

    // Ownership check
    if (offer.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this offer"
      });
    }

    await offer.deleteOne();

    res.json({
      success: true,
      message: "Offer deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed"
    });
  }
};


// =================================================
// 🟢 UPDATE OFFER (Only Owner)
// =================================================
exports.updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found"
      });
    }

    // Ownership check
    if (offer.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit this offer"
      });
    }

    // Update fields
    offer.from = req.body.from || offer.from;
    offer.to = req.body.to || offer.to;
    offer.vehicle = req.body.vehicle || offer.vehicle;
    offer.amount = req.body.amount || offer.amount;
    offer.date = req.body.date || offer.date;
    offer.seats = req.body.seats || offer.seats;
    offer.startTime = req.body.startTime || offer.startTime;
    offer.endTime = req.body.endTime || offer.endTime;
    offer.distance = req.body.distance || offer.distance;

    await offer.save();

    res.json({
      success: true,
      message: "Offer updated successfully",
      data: offer
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed"
    });
  }
};
