const mongoose = require('mongoose');

const OnewaybookingSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    pickupDate: { type: String, required: true },
    dropDate: { type: String, default: null },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    vehicle: { type: String, required: true },
    seats: { type: Number, required: true },
    amount: { type: Number, required: true }, // 'totalAmount' ki jagah 'amount'
    pickupInfo: { type: String, default: "" },
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], 
        default: 'Pending' 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Onewaybooking', OnewaybookingSchema);