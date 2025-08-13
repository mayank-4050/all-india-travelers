// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await User.find({ role: { $regex: /^customer$/i } })
      .select('fullName email mobile area city state pincode');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get single customer by ID
router.get('/customers/:id', async (req, res) => {
  try {
    const customer = await User.findOne({ 
      _id: req.params.id,
      role: { $regex: /^customer$/i }
    }).select('fullName email mobile area city state pincode');

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all agents
router.get('/agents', async (req, res) => {
  try {
    const agents = await User.find({ role: { $regex: /^agent$/i } })
      .select('fullName email mobile area city state pincode idProofType travelerName');
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/agents/:id', async (req, res) => {
  try {
    const agent = await User.findOne({ 
      _id: req.params.id,
      role: { $regex: /^agent$/i }
    }).select('fullName email mobile area city state pincode travelerName idProofType idProofImage');

    if (!agent) {
      return res.status(404).json({ message: 'agent not found' });
    }

    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// PUT /api/users/agents/:id/status
router.put("/agents/:id/status", async (req, res) => {
  try {
    const { active } = req.body;
    const agent = await User.findByIdAndUpdate(
      req.params.id,
      { active },
      { new: true }
    );
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
});



module.exports = router;
