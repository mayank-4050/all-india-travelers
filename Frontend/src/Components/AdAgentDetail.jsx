import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-5 h-5 ml-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
  </svg>
);

const ActiveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block mr-2 text-green-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const InactiveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block mr-2 text-red-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const InfoRow = ({ label, value, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 py-2 border-b border-gray-100 last:border-b-0">
    <span className="font-semibold text-gray-900 w-40 sm:w-48">{label}:</span>
    {value ? (
      <span className="text-gray-700 break-words">{value}</span>
    ) : (
      children || <span className="text-gray-400 italic">N/A</span>
    )}
  </div>
);

const AdAgentDetail = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/agents/${id}`);
        setAgent(res.data);
        setIsActive(res.data.active !== undefined ? res.data.active : true);
      } catch (error) {
        console.error("Error fetching agent detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  const toggleActive = async () => {
  try {
    const newStatus = !isActive;

    // Update in backend
    await axios.put(`http://localhost:5000/api/users/agents/${id}/status`, {
      active: newStatus
    });

    // Update in UI
    setIsActive(newStatus);
  } catch (error) {
    console.error("Error updating agent status:", error);
    alert("Failed to update agent status. Please try again.");
  }
};


  if (loading)
    return (
      <p className="p-6 text-center text-gray-500 font-semibold animate-pulse">
        Loading agent details...
      </p>
    );

  if (!agent)
    return (
      <p className="p-6 text-center text-red-600 font-semibold">Agent not found.</p>
    );

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Agent Detail
      </h2>

      <div className="divide-y divide-gray-100">
        <InfoRow label="ID" value={agent._id} />
        <InfoRow label="Travels Name" value={agent.travelerName} />
        <InfoRow label="Full Name" value={agent.fullName} />
        <InfoRow label="Email" value={agent.email} />
        <InfoRow label="Mobile" value={agent.mobile} />
        <InfoRow label="Area" value={agent.area} />
        <InfoRow label="City" value={agent.city} />
        <InfoRow label="State" value={agent.state} />
        <InfoRow label="Pincode" value={agent.pincode} />
        <InfoRow label="ID Proof" value={agent.idProofType} />
        <InfoRow label="ID Image">
          {agent.idProofImage ? (
            <a
              href={agent.idProofImage}
              download={`id-proof-${agent._id}.jpg`}
              className="inline-flex items-center mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download ID Proof <DownloadIcon />
            </a>
          ) : (
            <span className="text-gray-500 italic">No image available</span>
          )}
        </InfoRow>
      </div>

      <button
        onClick={toggleActive}
        className={`mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-colors focus:outline-none focus:ring-4 ${
          isActive
            ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
            : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
        }`}
      >
        {isActive ? <InactiveIcon /> : <ActiveIcon />}
        {isActive ? "Deactivate" : "Activate"}
      </button>
    </div>
  );
};

export default AdAgentDetail;
