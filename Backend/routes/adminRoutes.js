const express = require("express");
const router = express.Router();

// 🔐 Middleware
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");

// 🎯 Controller Functions
const {
  getPendingAgents,
  getApprovedAgents,
  getRejectedAgents,
  getAgentById,
  updateAgentStatus
} = require("../controllers/adminController");


// ======================================================
// 🟢 ADMIN ONLY ROUTES
// ======================================================


// 🔹 1. Get Pending Agents (Agent Requests Page)
router.get(
  "/pending-agents",
  authMiddleware,
  authorizeRoles("Admin"),
  getPendingAgents
);


// 🔹 2. Get Approved Agents (All Agents Page)
router.get(
  "/approved-agents",
  authMiddleware,
  authorizeRoles("Admin"),
  getApprovedAgents
);


// 🔹 3. Get Rejected Agents (Optional Future Use)
router.get(
  "/rejected-agents",
  authMiddleware,
  authorizeRoles("Admin"),
  getRejectedAgents
);


// 🔹 4. Get Single Agent Detail
router.get(
  "/agent/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  getAgentById
);


// 🔹 5. Approve / Reject Agent
router.put(
  "/agent-status/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  updateAgentStatus
);


module.exports = router;
