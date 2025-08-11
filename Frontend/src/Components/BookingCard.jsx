// BookingCard.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaRupeeSign, FaCar } from "react-icons/fa";

const BookingCard = ({ booking }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-5 w-80 border border-gray-200">

      {/* Vehicle & Status */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FaCar className="text-blue-500" /> {booking.vehicle}
        </h2>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${booking.status === "confirmed"
              ? "bg-green-100 text-green-600"
              : booking.status === "pending"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
        >
          {booking.status || "pending"}
        </span>
      </div>

      {/* Route */}
      <div className="mb-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-green-500" /> <strong>Pickup:</strong> {booking.from}
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" /> <strong>Drop:</strong> {booking.to}
        </p>
      </div>

      {/* Date & Time */}
      <div className="flex justify-between items-center text-sm text-gray-600 my-3">
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" /> {booking.date}
        </p>
        <p className="flex items-center gap-2">
          <FaClock className="text-orange-500" /> {booking.time}
        </p>
      </div>

      {/* Price */}
      <div className="flex justify-between items-center border-t pt-3 mt-3">
        <p className="flex items-center text-lg font-bold text-gray-800 gap-1">
          <FaRupeeSign /> {booking.totalAmount.toFixed(2)}
        </p>
        <NavLink
          to={`/bookingdetail/${booking._id}`}

          state={{ bookingData: booking }}
          className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
        >
          View Details
        </NavLink>

      </div>
    </div>
  );
};

export default BookingCard;
