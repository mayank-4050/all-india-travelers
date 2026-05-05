const Booking = require("../models/OnewaybookingModel");
const nodemailer = require("nodemailer");

// --- Transporter Setup ---
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const createBooking = async (req, res) => {
    try {
        // UPDATED: Destructure customer data from req.body
        const { 
            from, to, pickupDate, dropDate, startTime, vehicle, seats, amount, pickupInfo,
            customerName, customerMobile, customerAddress, distance, perKmRate 
        } = req.body;

        // 1. Save to Database (including Customer Details)
        const newBooking = new Booking({
            from,
            to,
            pickupDate,
            dropDate,
            startTime,
            vehicle,
            seats,
            amount,
            pickupInfo,
            customerName,    // Added
            customerMobile,  // Added
            customerAddress, // Added
            distance,        // Added
            perKmRate,       // Added
            status: "Pending" 
        });

        const savedBooking = await newBooking.save();

        // 2. Real-time Notification Trigger
        const io = req.app.get("io");
        if (io) {
            io.emit("new_booking_alert", {
                message: "New One-Way Booking Received!",
                customer: customerName || `${from} to ${to}`, // Use name if available
                amount: amount
            });
        }

        // 3. Admin Notification via Email (Updated with Customer Info)
        const mailOptions = {
            from: `"Trip Notification" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `🚨 New Booking from ${customerName || 'Customer'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                    <div style="background-color: #ea580c; padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 22px;">New One-Way Booking!</h1>
                    </div>
                    <div style="padding: 25px; background-color: #ffffff;">
                        <h3 style="color: #ea580c; border-bottom: 2px solid #fed7aa; padding-bottom: 5px;">Customer Details</h3>
                        <p><b>Name:</b> ${customerName}</p>
                        <p><b>Mobile:</b> ${customerMobile}</p>
                        <p><b>Pickup Address:</b> ${customerAddress}</p>

                        <h3 style="color: #ea580c; border-bottom: 2px solid #fed7aa; padding-bottom: 5px; margin-top: 20px;">Trip Details</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Route:</b></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${from} to ${to}</td></tr>
                            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Vehicle:</b></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${vehicle}</td></tr>
                            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Pickup:</b></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${pickupDate} at ${startTime}</td></tr>
                            <tr><td style="padding: 8px; background-color: #fff7ed; color: #c2410c;"><b>Total Amount:</b></td><td style="padding: 8px; background-color: #fff7ed; color: #c2410c;"><b>₹${amount}</b></td></tr>
                        </table>
                    </div>
                </div>
            `
        };

        transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: "Booking successful!", data: savedBooking });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- DELETE FUNCTION ---
const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        res.status(200).json({ success: true, message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { createBooking, getAllBookings, deleteBooking };