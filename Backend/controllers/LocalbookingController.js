const LocalBooking = require('../models/LocalbookingModel');

// @desc    Create new local city cab booking
// @route   POST /api/bookings/local
// @access  Public
const createLocalBooking = async (req, res) => {
    try {
        const { bookingDetails } = req.body;

        // 1. Validation: Check if bookingDetails exists and is an array
        if (!bookingDetails || !Array.isArray(bookingDetails) || bookingDetails.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No booking details provided"
            });
        }

        // 2. Calculate Total Amount (Safety check on backend)
        const totalAmount = bookingDetails.reduce((sum, trip) => sum + Number(trip.amount), 0);

        // 3. Create a new booking instance using the Model
        const newBooking = new LocalBooking({
            trips: bookingDetails.map(trip => ({
                startPoint: trip.startPoint,
                vehicle: trip.vehicle,
                date: trip.date,
                time: trip.time,
                runningKm: trip.runningKm,
                amount: trip.amount,
                extraHr: trip.extraHr || 0,
                extraKm: trip.extraKm || 0
            })),
            totalAmount: totalAmount
        });

        // 4. Save to MongoDB
        const savedBooking = await newBooking.save();

        // 5. Send Success Response
        res.status(201).json({
            success: true,
            message: "Booking confirmed successfully!",
            bookingId: savedBooking.bookingId,
            data: savedBooking
        });

    } catch (error) {
        console.error("Error in LocalBooking Controller:", error);
        res.status(500).json({
            success: false,
            message: "Server Error: Could not save booking",
            error: error.message
        });
    }
};

// @desc    Get all local bookings (For Admin Panel)
const getLocalBookings = async (req, res) => {
    try {
        const bookings = await LocalBooking.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Saari bookings fetch karne ke liye
const getallLocalBookings = async (req, res) => {
    try {
        // .sort({ createdAt: -1 }) se latest bookings sabse upar aayengi
        const bookings = await LocalBooking.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error: Bookings nahi mil payi."
        });
    }
};

// LocalbookingController.js mein ye function add karein:

const deleteLocalBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await LocalBooking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ 
                success: false, 
                message: "Booking nahi mili!" 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: "Booking successfully delete ho gayi." 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};




module.exports = {
    createLocalBooking,
    getLocalBookings,
    getallLocalBookings,
    deleteLocalBooking
};

