import Booking from "../models/OfferBookingModel.js";
import nodemailer from "nodemailer";

export const confirmBooking = async (req, res) => {
  try {
    const { 
      name, phone, address, offerId, from, to, 
      vehicle, seats, distance, amount, travelDate, 
      travelTime, agencyName, agencyPhone 
    } = req.body;

    // Save to Database
    const newBooking = new Booking({
      customerName: name,
      customerPhone: phone,
      pickupAddress: address,
      offerId, from, to, vehicle, seats, distance, amount, travelDate, travelTime, agencyName, agencyPhone
    });
    const savedBooking = await newBooking.save();

    // ==============================
    // 📧 EMAIL NOTIFICATION
    // ==============================
    
    // Check if variables exist before trying to log in
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Missing Email Credentials in .env");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"All India Travelers" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🚖 New Booking: ${from} to ${to}`,
      html: `<h2 style="color: #ea580c; text-align: center;">Offer Request Received</h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          
          <h3 style="color: #444;">Customer Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>

          <h3 style="color: #444;">Ride Details:</h3>
          <p><strong>Route:</strong> ${from} → ${to}</p>
          <p><strong>Vehicle:</strong> ${vehicle} (${seats} Seats)</p>
          <p><strong>Date:</strong> ${travelDate}</p>
          <p><strong>Time:</strong> ${travelTime}</p>
          <p><strong>Total Fare:</strong> <span style="color: #16a34a; font-size: 18px; font-weight: bold;">₹${amount}</span></p>
          
          <div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-top: 20px; text-align: center;">
            <p style="font-size: 12px; color: #777;">Booking ID: ${savedBooking._id}</p>`
    };

    // Use await for sending mail so we can catch authentication errors specifically
    try {
      await transporter.sendMail(mailOptions);
      console.log("📧 Email sent successfully!");
    } catch (mailErr) {
      console.error("❌ Nodemailer Auth/SMTP Error:", mailErr.message);
    }

    res.status(201).json({ success: true, message: "Booking confirmed!" });

  } catch (error) {
    console.error("Booking Controller Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};