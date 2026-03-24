const RoundTripBooking = require('../models/RoundtripbookingModel');

// 1. Nayi Booking Create Karne ke liye
exports.createBooking = async (req, res) => {
    try {
        // 🔥 DEBUG 1: Pehle check karo data aa bhi raha hai ya nahi
        console.log("📥 Incoming Request Body:", req.body);

        const {
            bookingId,
            customerName,
            mobile,
            pickupAddress,
            vehicleName,
            tripDuration,
            minRunningLimit,
            actualRouteDistance,
            extraKm,
            haltCharges,
            totalFare,
            route
        } = req.body;

        const newBooking = new RoundTripBooking({
            bookingId,
            customerName,
            mobile,
            pickupAddress,
            vehicleName,
            tripDuration,
            minRunningLimit,
            actualRouteDistance,
            extraKm,
            haltCharges,
            totalFare,
            route
        });

        // 🔥 DEBUG 2: Save karne ki koshish
        const savedBooking = await newBooking.save();

        console.log("✅ Booking Saved Successfully!");

        res.status(201).json({
            success: true,
            message: "Booking confirmed and saved successfully!",
            data: savedBooking
        });

    } catch (error) {
        // 🔥 DEBUG 3: Yeh line aapko VS Code terminal mein batayegi asali wajah
        console.error("❌ MONGODB SAVE ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: "Booking failed! Server error.",
            error: error.message // Yeh frontend par bhi dikhega
        });
    }
};

// ... baaki functions sahi hain ...
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await RoundTripBooking.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        // Hum MongoDB ki _id use karenge fetch karne ke liye
        const booking = await RoundTripBooking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking nahi mili!" });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        await RoundTripBooking.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Booking Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};