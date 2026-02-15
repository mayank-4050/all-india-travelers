require("dotenv").config();

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || "secretAllIndia";

/*
=================================================
🔐 AUTHENTICATION MIDDLEWARE
=================================================
*/

const authMiddleware = async (req, res, next) => {
  try {

    if (!JWT_SECRET) {
      console.error("❌ JWT_SECRET is not defined");
      return res.status(500).json({
        success: false,
        message: "Server configuration error"
      });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    req.user = user;

    next();

  } catch (error) {
    console.error('Auth middleware error:', error.message);

    return res.status(401).json({
      success: false,
      message: 'Token invalid or expired'
    });
  }
};

/*
=================================================
🛡 ROLE BASED AUTHORIZATION
=================================================
*/

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    next();
  };
};

module.exports = {
  authMiddleware,
  authorizeRoles
};
