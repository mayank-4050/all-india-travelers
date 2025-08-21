const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const JWT_SECRET = process.env.JWT_SECRET || 'secretAllIndia';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);
const isStrongPassword = (password) => password.length >= 8;

exports.register = async (req, res) => {
  try {
    const {
      role, fullName, email, mobile, area, city, state, pincode, password, confirmPassword,
      travelerName, idProofType
    } = req.body;

    if (!role || !fullName || !email || !mobile || !area || !city || !state || !pincode || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }


    if (!['Admin', 'Agent', 'Customer'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role specified' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    if (!isValidMobile(mobile)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number' });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists with this email or mobile number' });
    }

    if (role === 'Agent') {
      if (!travelerName || !state || !pincode || !idProofType) {
        return res.status(400).json({ success: false, message: 'All agent-specific fields are required' });
      }

      if (!req.file) {
        return res.status(400).json({ success: false, message: 'ID proof image is required for agents' });
      }

      if (req.file.size > MAX_FILE_SIZE) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ success: false, message: 'File size too large (max 5MB allowed)' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role,
      fullName,
      email,
      mobile,
      area,
      city,
      state,
      pincode,
      password: hashedPassword,
      ...(role === 'Agent' && {
        travelerName,
        state,
        pincode,
        idProofType,
        idProofImage: req.file ? `/uploads/${req.file.filename}` : null
      })
    });


    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1d' });

    const userResponse = {
      _id: newUser._id,
      role: newUser.role,
      fullName: newUser.fullName,
      email: newUser.email,
      mobile: newUser.mobile,
      ...(role === 'Agent' && { travelerName: newUser.travelerName })
    };

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: userResponse
    });

  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Registration error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    if (!emailOrMobile || !password) {
      return res.status(400).json({ success: false, message: 'Email/Mobile and password are required' });
    }

    // find user by email OR mobile
    const user = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }]
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // create JWT
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    const userResponse = {
      _id: user._id,
      role: user.role,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      ...(user.role === 'Agent' && { travelerName: user.travelerName })
    };

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.getUserProfile = async (req, res) => {
  res.json(req.user);
};
