const mongoose = require('mongoose');

const RoundTripBookingSchema = new mongoose.Schema({
    // 1. Unique ID for Tracking
    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    
    // 2. Passenger Details
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    pickupAddress: {
        type: String,
        required: true
    },

    // 3. Vehicle & Trip Details
    vehicleName: {
        type: String,
        required: true
    },
    tripDuration: {
        type: Number, // Total Days
        required: true
    },

    // 4. Distance & Fare Breakdown (Jo Invoice mein dikh raha hai)
    minRunningLimit: {
        type: Number, // e.g. 500 KM (250 per day)
        required: true
    },
    actualRouteDistance: {
        type: Number, // Actual KM from Map
        required: true
    },
    extraKm: {
        type: Number, // Actual - Min Limit (agar > 0 hai)
        default: 0
    },
    haltCharges: {
        type: Number, // Night charges
        default: 0
    },
    totalFare: {
        type: Number,
        required: true
    },

    // 5. Route Details (With Dates for every place)
    route: [
        {
            place: { type: String, required: true },
            date: { type: String, required: true },
            pointType: { type: String } // e.g. 'Start', 'Stop', 'Return'
        }
    ],

    // 6. System Timestamp
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('RoundTripBooking', RoundTripBookingSchema);