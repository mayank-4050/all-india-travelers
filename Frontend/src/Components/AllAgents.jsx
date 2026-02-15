import React, { useEffect, useState } from "react";
import axios from "axios";

const AllAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null); // 👈 toggle row

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/admin/approved-agents",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAgents(res.data.agents);

      } catch (error) {
        console.error(
          "Error fetching agents:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const toggleDetails = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const renderImage = (label, imagePath) => {
    if (!imagePath) return null;

    return (
      <div className="min-w-[140px] text-center">
        <p className="text-xs font-medium mb-1">{label}</p>
        <a
          href={`http://localhost:5000${imagePath}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={`http://localhost:5000${imagePath}`}
            alt={label}
            className="w-36 h-24 object-cover rounded border hover:scale-105 transition"
          />
        </a>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-lg font-semibold text-gray-500 animate-pulse">
          Loading approved agents...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">
        Approved Agents
      </h2>

      {agents.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded text-center text-gray-600 font-medium">
          No approved agents found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="min-w-full text-sm">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Travel Name</th>
                <th className="px-4 py-3 text-left">Full Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Mobile</th>
                <th className="px-4 py-3 text-left">City</th>
                <th className="px-4 py-3 text-left">State</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {agents.map((agent, index) => (
                <React.Fragment key={agent._id}>
                  
                  {/* ===== NORMAL ROW ===== */}
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-green-50 transition`}
                  >
                    <td className="px-4 py-3">{agent.travelerName || "-"}</td>
                    <td className="px-4 py-3">{agent.fullName}</td>
                    <td className="px-4 py-3">{agent.email}</td>
                    <td className="px-4 py-3">{agent.mobile}</td>
                    <td className="px-4 py-3">{agent.city}</td>
                    <td className="px-4 py-3">{agent.state}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleDetails(agent._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition active:scale-95"
                      >
                        {openId === agent._id ? "Hide Details" : "View Details"}
                      </button>
                    </td>
                  </tr>

                  {/* ===== EXPANDED ROW ===== */}
                  {openId === agent._id && (
                    <tr className="bg-gray-100">
                      <td colSpan="7" className="px-6 py-5">

                        {/* Extra Info */}
                        <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
                          <p><strong>Area:</strong> {agent.area}</p>
                          <p><strong>Pincode:</strong> {agent.pincode}</p>
                          <p><strong>ID Type:</strong> {agent.idProofType}</p>
                          <p><strong>Registered:</strong> {new Date(agent.createdAt).toLocaleDateString()}</p>
                        </div>

                        {/* Documents */}
                        <div>
                          <h4 className="font-semibold mb-3">
                            Uploaded Documents
                          </h4>

                          <div className="flex gap-5 overflow-x-auto pb-3">

                            {renderImage("ID Proof", agent.idProofImage)}
                            {renderImage("Aadhar", agent.aadharCard)}
                            {renderImage("Gumasta", agent.gumastaCertificate)}
                            {renderImage("Office Photo", agent.officePhoto)}
                            {renderImage("Owner Selfie", agent.ownerSelfie)}

                          </div>
                        </div>

                      </td>
                    </tr>
                  )}

                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllAgents;
