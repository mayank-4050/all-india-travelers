const express = require("express");
const router = express.Router();

const { uploadAgentDocuments } = require("../middleware/upload");
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  register,
  login,
  getUserProfile
} = require("../controllers/authController");

/*
=================================================
📝 REGISTER ROUTE
- Handles:
  • Normal users (Admin / Customer)
  • Agent with multiple documents
=================================================
*/

router.post(
  "/register",
  uploadAgentDocuments,   // 🔥 Multi-document upload
  register
);

/*
=================================================
🔐 LOGIN ROUTE
=================================================
*/

router.post("/login", login);

/*
=================================================
👤 PROFILE ROUTE (Protected)
=================================================
*/

router.get(
  "/profile",
  authMiddleware,
  getUserProfile
);

module.exports = router;
