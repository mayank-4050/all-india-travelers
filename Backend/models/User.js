const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  role: {
    type: String,
    required: true,
    enum: ["Admin", "Agent", "Customer"]
  },

  // ==========================
  // APPROVAL STATUS
  // ==========================
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: function () {
      return this.role === "Agent" ? "pending" : "approved";
    }
  },

  // ==========================
  // BASIC DETAILS
  // ==========================

  fullName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  mobile: {
    type: String,
    required: true,
    trim: true
  },

  area: {
    type: String,
    required: true,
    trim: true
  },

  city: {
    type: String,
    required: true,
    trim: true
  },

  state: {
    type: String,
    required: true,
    trim: true
  },

  pincode: {
    type: String,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  // ==========================
  // AGENT ONLY FIELDS
  // ==========================

  travelerName: {
    type: String,
    trim: true
  },

  // 🔹 OLD ID (optional if you still need it)
  idProofType: {
    type: String,
    trim: true
  },

  idProofImage: {
    type: String
  },

  // ==========================
  // 🔥 NEW DOCUMENT FIELDS
  // ==========================

  aadharCard: {
    type: String
  },

  gumastaCertificate: {
    type: String
  },

  officePhoto: {
    type: String
  },

  ownerSelfie: {
    type: String
  }

}, { timestamps: true });


/*
=================================================
🔒 AGENT DOCUMENT VALIDATION BEFORE SAVE
Ensures agent cannot exist without documents
=================================================
*/

userSchema.pre("save", function (next) {

  if (this.role === "Agent") {

    if (!this.aadharCard ||
        !this.gumastaCertificate ||
        !this.officePhoto ||
        !this.ownerSelfie) {

      return next(new Error("All agent documents are required"));
    }
  }

  next();
});


module.exports = mongoose.model('User', userSchema);
