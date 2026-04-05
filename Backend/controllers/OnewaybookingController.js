const Booking = require("../models/OnewaybookingModel");
const nodemailer = require("nodemailer");

// --- Admin ko Email bhejne ka Setup ---
// ⚠️ Yaad rakhein: 'pass' mein 16-digit App Password hi dalna hai
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mkori5778@gmail.com', 
        pass: 'xxxx xxxx xxxx xxxx' // 👈 Yahan apna 16-digit App Password dalein
    }
});

const createBooking = async (req, res) => {
    try {
        const { from, to, pickupDate, dropDate, startTime, vehicle, seats, amount, pickupInfo } = req.body;

        // 1. Database mein Save karna
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
            status: "Pending" 
        });

        const savedBooking = await newBooking.save();

        // ✅ 2. Real-time Notification Trigger (Socket.io)
        // Isse Admin Profile par turant popup aayega
        const io = req.app.get("socketio");
        if (io) {
            io.emit("new_booking_alert", {
                message: "New One-Way Booking Received!",
                customer: `${from} to ${to}`,
                amount: amount
            });
        }

        // ✅ 3. Admin ko Automatic Email bhejna
        const mailOptions = {
            from: 'mkori5778@gmail.com',
            to: 'mkori7878@gmail.com', // Admin ki receiver email
            subject: `🚨 New Trip Alert: ${from} to ${to}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #fff;">
                    <div style="background-color: #ea580c; padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">New Booking!</h1>
                    </div>
                    <div style="padding: 30px;">
                        <p style="color: #64748b; font-size: 14px; margin-bottom: 25px;">A new one-way trip request has been received from the website.</p>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="background-color: #f8fafc;">
                                <td style="padding: 12px; border: 1px solid #edf2f7; font-weight: bold; color: #1e293b;">Pickup From:</td>
                                <td style="padding: 12px; border: 1px solid #edf2f7; color: #334155;">${from}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #edf2f7; font-weight: bold; color: #1e293b;">Destination:</td>
                                <td style="padding: 12px; border: 1px solid #edf2f7; color: #334155;">${to}</td>
                            </tr>
                            <tr style="background-color: #f8fafc;">
                                <td style="padding: 12px; border: 1px solid #edf2f7; font-weight: bold; color: #1e293b;">Vehicle:</td>
                                <td style="padding: 12px; border: 1px solid #edf2f7; color: #334155;">${vehicle} (${seats} Seater)</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #edf2f7; font-weight: bold; color: #1e293b;">Date & Time:</td>
                                <td style="padding: 12px; border: 1px solid #edf2f7; color: #334155;">${pickupDate} at ${startTime}</td>
                            </tr>
                            <tr style="background-color: #f0fdf4;">
                                <td style="padding: 12px; border: 1px solid #edf2f7; font-weight: bold; color: #166534;">Total Amount:</td>
                                <td style="padding: 12px; border: 1px solid #edf2f7; color: #15803d; font-size: 20px; font-weight: 900;">₹${amount}</td>
                            </tr>
                        </table>

                        ${pickupInfo ? `
                            <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                                <b style="color: #1e40af; font-size: 12px; text-transform: uppercase;">Note from Customer:</b>
                                <p style="margin: 5px 0 0; color: #1e3a8a; font-style: italic;">"${pickupInfo}"</p>
                            </div>
                        ` : ''}

                        <div style="margin-top: 30px; text-align: center;">
                            <a href="http://localhost:3000/admin/onewaybookingforadmin" 
                               style="display: inline-block; background-color: #0f172a; color: white; padding: 14px 30px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 14px;">
                               Open Admin Dashboard
                            </a>
                        </div>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; text-align: center; color: #94a3b8; font-size: 11px;">
                        © 2026 All India Travelers | Automated System Notification
                    </div>
                </div>
            `
        };

        // Email sending execution
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("❌ Nodemailer Error:", error);
            } else {
                console.log("✅ Admin Notified via Email:", info.response);
            }
        });

        // 4. Final Success Response to User
        res.status(201).json({
            success: true,
            message: "Booking successful! Admin has been notified.",
            data: savedBooking
        });

    } catch (error) {
        console.error("Booking Controller Error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong in the booking process.",
            error: error.message
        });
    }
};

// Admin ke liye data fetch karne ka function
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBooking, getAllBookings };