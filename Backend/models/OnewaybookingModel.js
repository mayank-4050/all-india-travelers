const mongoose = require('mongoose');

const OnewaybookingSchema = new mongoose.Schema({
    // Trip Details
    from: { type: String, required: true },
    to: { type: String, required: true },
    pickupDate: { type: String, required: true },
    dropDate: { type: String, default: null },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    pickupInfo: { type: String, default: "" },
    
    // Vehicle & Pricing Details
    vehicle: { type: String, required: true },
    seats: { type: Number, required: true },
    distance: { type: Number }, // Added to store calculated KM
    perKmRate: { type: Number, default: null }, // Added for transparency
    amount: { type: Number, required: true }, 

    // Customer Data (New Fields)
    customerName: { 
        type: String, 
        required: [true, "Customer name is required"],
        trim: true 
    },
    customerMobile: { 
        type: String, 
        required: [true, "Mobile number is required"] 
    },
    customerAddress: { 
        type: String, 
        required: [true, "Pickup address is required"] 
    },

    // Booking Management
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], 
        default: 'Pending' 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Onewaybooking', OnewaybookingSchema);