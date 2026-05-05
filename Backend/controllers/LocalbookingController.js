const LocalBooking = require('../models/LocalbookingModel');
const nodemailer = require('nodemailer');

// @desc    Create new local city cab booking
// @route   POST /api/bookings/local
const createLocalBooking = async (req, res) => {
    try {
        // DEBUG: Check your terminal to see if these keys exist in the incoming request
        console.log("Incoming Request Body:", req.body);

        const { 
            bookingDetails, 
            customerName, 
            customerMobile, 
            customerAddress, 
            grandTotal 
        } = req.body;

        // Validation to prevent empty bookings
        if (!bookingDetails || !Array.isArray(bookingDetails) || bookingDetails.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No booking details provided"
            });
        }

        // Create new record with explicit mapping to prevent "N/A" issues
        const newBooking = new LocalBooking({
            customerName: customerName,      // Ensure this matches your Schema
            customerMobile: customerMobile,  // Ensure this matches your Schema
            customerAddress: customerAddress, // Ensure this matches your Schema
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
            grandTotal: grandTotal || 0
        });

        const savedBooking = await newBooking.save();

        // ==========================================
        // 📧 EMAIL NOTIFICATION SYSTEM
        // ==========================================
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const tripListHtml = savedBooking.trips.map((trip, index) => `
            <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <p style="margin:0;"><strong>Trip ${index + 1}:</strong> ${trip.startPoint}</p>
                <p style="margin:5px 0; font-size: 13px; color: #666;">
                    Vehicle: ${trip.vehicle} | Date: ${trip.date} | Plan: ${trip.time}Hr/${trip.runningKm}Km
                </p>
                <p style="margin:0; font-weight: bold;">Fare: ₹${trip.amount}</p>
            </div>
        `).join('');

        const mailOptions = {
            from: `"Local City Booking" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `🏙️ New Local Booking: ${customerName}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 15px;">
                    <h2 style="color: #ea580c; text-align: center; margin-bottom: 5px;">New Local Booking Received</h2>
                    <p style="text-align: center; color: #666; font-size: 12px; margin-bottom: 20px;">Booking ID: ${savedBooking.bookingId}</p>
                    
                    <div style="background: #f8fafc; padding: 15px; border-radius: 10px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                        <h4 style="margin: 0 0 10px 0; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Customer Details</h4>
                        <p style="margin: 5px 0;"><strong>Name:</strong> ${customerName || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Mobile:</strong> ${customerMobile || 'N/A'}</p>
                        <p style="margin: 5px 0;"><strong>Address:</strong> ${customerAddress || 'N/A'}</p>
                    </div>

                    <h4 style="margin: 0 0 10px 0; color: #1e293b;">Trip Summary</h4>
                    ${tripListHtml}
                    
                    <div style="margin-top: 20px; padding: 15px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 10px; text-align: center;">
                        <h3 style="margin: 0; color: #c2410c;">Grand Total: ₹${savedBooking.grandTotal}</h3>
                    </div>
                </div>
            `,
        };

        transporter.sendMail(mailOptions).catch(err => console.log("❌ Email Error:", err));

        res.status(201).json({
            success: true,
            message: "Booking confirmed successfully!",
            bookingId: savedBooking.bookingId,
            data: savedBooking
        });

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

const getallLocalBookings = async (req, res) => {
    try {
        const bookings = await LocalBooking.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteLocalBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await LocalBooking.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Booking deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { createLocalBooking, getallLocalBookings, deleteLocalBooking };