const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const JWT_SECRET = process.env.JWT_SECRET || 'secretAllIndia';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Helper function to validate email format
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Helper function to validate mobile number (Indian format)
const isValidMobile = (mobile) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(mobile);
};

// Helper function to validate password strength
const isStrongPassword = (password) => {
  return password.length >= 8;
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const { 
      role,
      fullName,
      email,
      mobile,
      address,
      password,
      confirmPassword,
      travelerName,
      state,
      pincode,
      idProofType
    } = req.body;

    // Required fields validation
    if (!role || !fullName || !email || !mobile || !address || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Field format validation
    if (!['Admin', 'Agent', 'Customer'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role specified'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    if (!isValidMobile(mobile)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit mobile number'
      });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email or mobile number'
      });
    }

    // Handle Agent-specific fields
    if (role === 'Agent') {
      if (!travelerName || !state || !pincode || !idProofType) {
        return res.status(400).json({
          success: false,
          message: 'All agent-specific fields are required'
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'ID proof image is required for agents'
        });
      }

      // Validate file size
      if (req.file.size > MAX_FILE_SIZE) {
        fs.unlinkSync(req.file.path); // Remove the uploaded file
        return res.status(400).json({
          success: false,
          message: 'File size too large (max 5MB allowed)'
        });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      role,
      fullName,
      email,
      mobile,
      address,
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

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return success response with user data (excluding sensitive info)
    const userResponse = {
      _id: newUser._id,
      role: newUser.role,
      fullName: newUser.fullName,
      email: newUser.email,
      mobile: newUser.mobile
    };

    if (role === 'Agent') {
      userResponse.travelerName = newUser.travelerName;
    }

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: userResponse
    });

  } catch (err) {
    // Clean up uploaded file if error occurred
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

// LOGIN
exports.login = async (req, res) => {
  try {
    const { role, emailOrMobile, password } = req.body;

    // Input validation
    if (!role || !emailOrMobile || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Find user by email or mobile
    const user = await User.findOne({
      role,
      $or: [
        { email: emailOrMobile },
        { mobile: emailOrMobile }
      ]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return response with user data (excluding sensitive info)
    const userResponse = {
      _id: user._id,
      role: user.role,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile
    };

    if (user.role === 'Agent') {
      userResponse.travelerName = user.travelerName;
    }

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
