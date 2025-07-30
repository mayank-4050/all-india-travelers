const express = require("express");
const router = express.Router();
const { calculateDistance } = require("../controllers/distanceController");

router.post("/", calculateDistance); // accessible at /api/distance

module.exports = router;
