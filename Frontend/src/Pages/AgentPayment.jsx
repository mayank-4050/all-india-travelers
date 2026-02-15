import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/UperNavbar";

const AgentPayment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center items-center py-12 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-200">

          {/* Title */}
          <h1 className="text-2xl font-bold text-orange-600 mb-2">
            Agent Registration Payment
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            Scan the QR code below to complete your registration.
          </p>

          {/* QR IMAGE */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-4 rounded-xl shadow-inner">
              <img
                src="/Photos/qr.jpeg"   // ✅ Correct path (public folder)
                alt="Agent Payment QR"
                className="w-60 h-60 object-contain"
              />
            </div>
          </div>

          {/* Amount Box */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <p className="text-gray-600 text-sm">Registration Fee</p>
            <p className="text-3xl font-bold text-orange-600">₹999</p>
          </div>

          {/* Instructions */}
          <div className="text-sm text-gray-500 space-y-1 mb-6">
            <p>✔ Open PhonePe / Google Pay / Paytm</p>
            <p>✔ Scan the QR Code</p>
            <p>✔ Complete the Payment</p>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition"
          >
            Back to Login
          </button>

        </div>
      </div>
    </div>
  );
};

export default AgentPayment;
