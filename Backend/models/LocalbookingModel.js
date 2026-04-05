const mongoose = require('mongoose');

// Har ek individual trip ka schema
const TripSchema = new mongoose.Schema({
    startPoint: { 
        type: String, 
        required: true 
    },
    vehicle: { 
        type: String, 
        required: true 
    },
    date: { 
        type: String, // String isliye taki '2026-03-28' format safe rahe
        required: true 
    },
    time: { 
        type: Number, // Duration in Hours
        required: true 
    },
    runningKm: { 
        type: Number, // KM Limit
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    extraHr: { 
        type: Number, 
        default: 0 
    },
    extraKm: { 
        type: Number, 
        default: 0 
    }
});

// Main Booking Schema
const LocalBookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        unique: true,
        default: () => `LCL-${Date.now()}` // Unique ID generator
    },
    // Array of trips taki "Add More" wala data save ho sake
    trips: [TripSchema], 
    
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('LocalBooking', LocalBookingSchema);