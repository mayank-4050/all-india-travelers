// AllBookings.jsx
import React, { useEffect, useState } from "react";
import BookingCard from "../Components/BookingCard";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/bookings/all", // Yahan se /admin hata diya
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setBookings(res.data.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <FaClipboardList className="text-3xl text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">All Bookings</h1>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <BookingCard booking={booking} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-10">
          <p className="text-lg font-medium">No bookings found.</p>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
