const mongoose = require('mongoose');

// Individual trip details (Add More data)
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
        type: String, 
        required: true 
    },
    time: { 
        type: Number, 
        required: true 
    },
    runningKm: { 
        type: Number, 
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
        default: () => `LCL-${Date.now()}` 
    },

    // --- CUSTOMER DATA (Added) ---
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerMobile: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },

    // Array of trips
    trips: [TripSchema], 
    
    // Updated to match frontend key 'grandTotal'
    grandTotal: {
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