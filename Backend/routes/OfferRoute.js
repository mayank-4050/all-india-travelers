const express = require("express");
const router = express.Router();

const {
  createOffer,
  getAllOffers,
  getMyOffers,
  updateOffer,
  deleteOffer
} = require("../controllers/offerController");

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");


// =================================================
// ✅ CREATE OFFER (Admin + Agent)
// =================================================
router.post(
  "/",
  authMiddleware,
  authorizeRoles("Admin", "Agent"),
  createOffer
);


// =================================================
// ✅ GET ALL OFFERS (Public)
// =================================================
router.get("/", getAllOffers);


// =================================================
// 🔥 GET MY OFFERS (Agent Dashboard)
// =================================================
router.get(
  "/my-offers",
  authMiddleware,
  authorizeRoles("Admin", "Agent"),
  getMyOffers
);


// =================================================
// 🟢 UPDATE OFFER (Owner Only)
// =================================================
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin", "Agent"),
  updateOffer
);


// =================================================
// 🔴 DELETE OFFER (Owner Only)
// =================================================
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin", "Agent"),
  deleteOffer
);


module.exports = router;
