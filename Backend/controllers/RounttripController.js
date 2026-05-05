const RoundTripBooking = require('../models/RoundtripbookingModel');
const nodemailer = require('nodemailer');

// 1. Nayi Booking Create Karne ke liye
exports.createBooking = async (req, res) => {
    try {
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

        const savedBooking = await newBooking.save();

        // ==========================================
        // 📧 EMAIL NOTIFICATION SYSTEM (Round Trip)
        // ==========================================
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Round Trip Booking" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `🔄 New Round Trip Booking - ${bookingId}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #6366f1; text-align: center;">Round Trip Booking Confirmed</h2>
                    <hr />
                    
                    <h3 style="color: #444;">Customer Info</h3>
                    <p><strong>Name:</strong> ${customerName}</p>
                    <p><strong>Mobile:</strong> ${mobile}</p>
                    <p><strong>Pickup:</strong> ${pickupAddress}</p>

                    <h3 style="color: #444;">Trip Details</h3>
                    <p><strong>Vehicle:</strong> ${vehicleName}</p>
                    <p><strong>Duration:</strong> ${tripDuration}</p>
                    <p><strong>Route:</strong> ${route}</p>
                    <p><strong>Distance:</strong> ${actualRouteDistance} km (Min Limit: ${minRunningLimit} km)</p>
                    
                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 15px;">
                        <p style="margin: 5px 0;">Halt Charges: ₹${haltCharges}</p>
                        <p style="margin: 5px 0;">Extra Km Rate: ₹${extraKm}</p>
                        <h3 style="margin: 10px 0 0 0; color: #1e1b4b;">Total Fare: ₹${totalFare}</h3>
                    </div>
                    
                    <p style="font-size: 11px; color: #999; margin-top: 20px; text-align: center;">
                        Booking Reference: ${savedBooking._id}
                    </p>
                </div>
            `,
        };

        // Send Email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log("❌ RoundTrip Email Error:", error);
            else console.log("📧 RoundTrip Email Sent:", info.response);
        });

        res.status(201).json({
            success: true,
            message: "Booking confirmed and saved successfully!",
            data: savedBooking
        });

    } catch (error) {
        console.error("❌ MONGODB SAVE ERROR:", error.message);
        res.status(500).json({
            success: false,
            message: "Booking failed! Server error.",
            error: error.message 
        });
    }
};

// ... Rest of the functions stay the same
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