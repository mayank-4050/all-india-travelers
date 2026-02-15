import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, User } from "lucide-react";

const AdminAgentRequests = () => {

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/pending-agents",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAgents(res.data.agents);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this agent?`)) return;

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/admin/agent-status/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchAgents();
  };

  const toggleDetails = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const renderImage = (label, imagePath) => {
    if (!imagePath) return null;

    return (
      <div className="flex flex-col items-center min-w-[120px]">
        <p className="text-xs font-medium mb-1 text-gray-600">
          {label}
        </p>
        <a
          href={`http://localhost:5000${imagePath}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={`http://localhost:5000${imagePath}`}
            alt={label}
            className="w-24 h-24 object-cover rounded-lg border hover:scale-105 transition"
          />
        </a>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Agent Approval Requests
      </h2>

      {loading && <p className="text-center">Loading...</p>}

      <div className="space-y-6 w-full max-w-6xl mx-auto px-4 sm:px-6">

        {agents.map((agent) => (

          <div
            key={agent._id}
            className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition"
          >

            {/* ================= BASIC CARD ================= */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-full">
                  <User size={20} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {agent.fullName}
                  </h3>
                  <p className="text-sm text-gray-500 break-all">
                    {agent.email}
                  </p>
                </div>
              </div>

              <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full self-start sm:self-auto">
                Pending
              </span>
            </div>

            {/* View Details Button */}
            <button
              onClick={() => toggleDetails(agent._id)}
              className="mt-3 text-blue-600 text-sm hover:underline"
            >
              {openId === agent._id ? "Hide Details" : "View Details"}
            </button>

            {/* ================= EXPANDED VIEW ================= */}
            {openId === agent._id && (
              <div className="mt-6 border-t pt-5">

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">

                  <p><strong>Travel Name:</strong> {agent.travelerName || "-"}</p>
                  <p><strong>Mobile:</strong> {agent.mobile}</p>
                  <p><strong>Area:</strong> {agent.area}</p>
                  <p><strong>City:</strong> {agent.city}</p>
                  <p><strong>State:</strong> {agent.state}</p>
                  <p><strong>Pincode:</strong> {agent.pincode}</p>
                  <p><strong>ID Type:</strong> {agent.idProofType}</p>
                  <p><strong>Registered:</strong> {new Date(agent.createdAt).toLocaleDateString()}</p>

                </div>

                {/* ================= DOCUMENTS ================= */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">
                    Uploaded Documents
                  </h4>

                  <div className="flex gap-4 overflow-x-auto pb-3">

                    {renderImage("ID Proof", agent.idProofImage)}
                    {renderImage("Aadhar", agent.aadharCard)}
                    {renderImage("Gumasta", agent.gumastaCertificate)}
                    {renderImage("Office", agent.officePhoto)}
                    {renderImage("Selfie", agent.ownerSelfie)}

                  </div>
                </div>

              </div>
            )}

            {/* ================= ACTION BUTTONS ================= */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">

              <button
                onClick={() => handleStatusUpdate(agent._id, "approved")}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm transition"
              >
                Approve
              </button>

              <button
                onClick={() => handleStatusUpdate(agent._id, "rejected")}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm transition"
              >
                Reject
              </button>

            </div>

          </div>

        ))}

      </div>


    </div>
  );
};

export default AdminAgentRequests;
