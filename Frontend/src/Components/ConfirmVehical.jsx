import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./UperNavbar";

const ConfirmVehical = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const offer = location.state?.offer;

  if (!offer) {
    return (
      <div className="text-center p-5">
        <p className="text-red-500 font-semibold">No vehicle selected.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  const cameFromOffer = offer.date && offer.startTime && offer.endTime;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Confirm Your Booking
        </h2>

        {/* Booking Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <p><b>From:</b> {offer.from}</p>
          <p><b>To:</b> {offer.to}</p>
          <p><b>Pickup Date:</b> {offer.pickupDate || offer.date}</p>
          <p><b>Drop Date:</b> {offer.dropDate || "N/A"}</p>

          {cameFromOffer ? (
            <p><b>Waiting Time:</b> {offer.startTime} - {offer.endTime}</p>
          ) : (
            <>
              <p><b>Pickup Time:</b> {offer.startTime}</p>
              <p><b>Drop Time:</b> {offer.endTime || "N/A"}</p>
            </>
          )}

          <p><b>Car Name:</b> {offer.vehicle}</p>
          <p><b>Seats:</b> {offer.seats}</p>
          <p><b>Price:</b> ₹{offer.amount}</p>
          {offer.pickupInfo && <p><b>Pickup Info:</b> {offer.pickupInfo}</p>}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              navigate("/customerdetailform", { state: { offer } })
            }
            className="px-5 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Add Passenger Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmVehical;
