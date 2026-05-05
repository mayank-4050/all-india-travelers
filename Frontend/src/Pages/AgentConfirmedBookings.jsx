import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/UperNavbar";

const AgentConfirmedBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        // ✅ Pointing to the 'offers' route as per your server setup
        const res = await axios.get(
          "http://localhost:5000/api/offers/my-agent-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(res.data.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-6">
          Confirmed Bookings
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No confirmed bookings found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full text-sm text-center border">
              <thead className="bg-orange-200">
                <tr>
                  <th className="p-3 border">Customer Name</th>
                  <th className="p-3 border">Phone</th>
                  <th className="p-3 border">From</th>
                  <th className="p-3 border">To</th>
                  <th className="p-3 border">Vehicle</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Travel Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    {/* ✅ FIX: Using customerName instead of user.fullName */}
                    <td className="p-3 border">{booking.customerName}</td>
                    
                    {/* ✅ FIX: Using customerPhone instead of user.mobile */}
                    <td className="p-3 border">{booking.customerPhone}</td>
                    
                    <td className="p-3 border">{booking.offerId?.from}</td>
                    <td className="p-3 border">{booking.offerId?.to}</td>
                    <td className="p-3 border">{booking.offerId?.vehicle}</td>
                    
                    {/* ✅ FIX: Using amount instead of totalAmount */}
                    <td className="p-3 border text-green-600 font-semibold">
                      ₹{booking.amount}
                    </td>
                    
                    {/* ✅ FIX: Using travelDate instead of date */}
                    <td className="p-3 border">{booking.travelDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentConfirmedBookings;