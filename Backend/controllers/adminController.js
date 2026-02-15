const User = require("../models/User");


// =====================================================
// 🔹 GET PENDING AGENTS
// =====================================================

exports.getPendingAgents = async (req, res) => {
  try {

    const agents = await User.find({
      role: "Agent",
      status: "pending"
    }).select("-password");

    res.status(200).json({
      success: true,
      count: agents.length,
      agents
    });

  } catch (error) {
    console.error("Error fetching pending agents:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// =====================================================
// 🔹 GET APPROVED AGENTS (For All Agents Page)
// =====================================================

exports.getApprovedAgents = async (req, res) => {
  try {

    const agents = await User.find({
      role: "Agent",
      status: "approved"
    }).select("-password");

    res.status(200).json({
      success: true,
      count: agents.length,
      agents
    });

  } catch (error) {
    console.error("Error fetching approved agents:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// =====================================================
// 🔹 GET REJECTED AGENTS (Optional Future Use)
// =====================================================

exports.getRejectedAgents = async (req, res) => {
  try {

    const agents = await User.find({
      role: "Agent",
      status: "rejected"
    }).select("-password");

    res.status(200).json({
      success: true,
      count: agents.length,
      agents
    });

  } catch (error) {
    console.error("Error fetching rejected agents:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// =====================================================
// 🔹 GET SINGLE AGENT DETAIL
// =====================================================

exports.getAgentById = async (req, res) => {
  try {

    const agent = await User.findOne({
      _id: req.params.id,
      role: "Agent"
    }).select("-password");

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found"
      });
    }

    res.status(200).json({
      success: true,
      agent
    });

  } catch (error) {
    console.error("Error fetching agent:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// =====================================================
// 🔹 APPROVE / REJECT AGENT
// =====================================================

exports.updateAgentStatus = async (req, res) => {

  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value"
    });
  }

  try {

    const agent = await User.findOne({
      _id: req.params.id,
      role: "Agent"
    });

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found"
      });
    }

    agent.status = status;
    await agent.save();

    res.status(200).json({
      success: true,
      message: `Agent ${status} successfully`,
      agent
    });

  } catch (error) {
    console.error("Error updating agent status:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
