require("dotenv").config();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const JWT_SECRET = process.env.JWT_SECRET || "secretAllIndia";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidMobile = (mobile) =>
  /^[6-9]\d{9}$/.test(mobile);

const isStrongPassword = (password) =>
  password.length >= 8;

/*
=================================================
🧹 Helper: Delete Uploaded Files if Error
=================================================
*/
const deleteUploadedFiles = (files) => {
  if (!files) return;

  Object.keys(files).forEach((field) => {
    files[field].forEach((file) => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });
  });
};

/*
=================================================
================= REGISTER ======================
=================================================
*/

exports.register = async (req, res) => {
  try {

    const {
      role,
      fullName,
      email,
      mobile,
      area,
      city,
      state,
      pincode,
      password,
      confirmPassword,
      travelerName,
      idProofType
    } = req.body;

    // ================= BASIC VALIDATION =================

    if (
      !role ||
      !fullName ||
      !email ||
      !mobile ||
      !area ||
      !city ||
      !state ||
      !pincode ||
      !password ||
      !confirmPassword
    ) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    if (!["Admin", "Agent", "Customer"].includes(role)) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: "Invalid role specified"
      });
    }

    if (!isValidEmail(email)) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    }

    if (!isValidMobile(mobile)) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number"
      });
    }

    if (!isStrongPassword(password)) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    if (password !== confirmPassword) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }]
    });

    if (existingUser) {
      deleteUploadedFiles(req.files);
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    // ================= AGENT DOCUMENT VALIDATION =================

    let documents = {};

    if (role === "Agent") {

      if (!travelerName || !idProofType) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({
          success: false,
          message: "Traveler name and ID proof type required"
        });
      }

      if (
        !req.files ||
        !req.files.idProofImage ||
        !req.files.aadharCard ||
        !req.files.gumastaCertificate ||
        !req.files.officePhoto ||
        !req.files.ownerSelfie
      ) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({
          success: false,
          message: "All agent documents are required"
        });
      }

      documents = {
        idProofImage: `/uploads/${req.files.idProofImage[0].filename}`,
        aadharCard: `/uploads/${req.files.aadharCard[0].filename}`,
        gumastaCertificate: `/uploads/${req.files.gumastaCertificate[0].filename}`,
        officePhoto: `/uploads/${req.files.officePhoto[0].filename}`,
        ownerSelfie: `/uploads/${req.files.ownerSelfie[0].filename}`
      };
    }

    // ================= SAVE USER =================

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role,
      status: role === "Agent" ? "pending" : "approved",
      fullName,
      email,
      mobile,
      area,
      city,
      state,
      pincode,
      password: hashedPassword,
      ...(role === "Agent" && {
        travelerName,
        idProofType,
        ...documents
      })
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message:
        role === "Agent"
          ? "Registration successful. Waiting for admin approval."
          : "Registration successful"
    });

  } catch (err) {

    deleteUploadedFiles(req.files);

    console.error("❌ REGISTER ERROR:", err);

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate email or mobile"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

/*
=================================================
=================== LOGIN =======================
=================================================
*/

exports.login = async (req, res) => {
  try {

    const { emailOrMobile, password } = req.body;

    if (!emailOrMobile || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Mobile and password required"
      });
    }

    const user = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    if (user.role === "Agent" && user.status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Please Make Payment To Start Business With Us."
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

exports.getUserProfile = async (req, res) => {
  res.json(req.user);
};
