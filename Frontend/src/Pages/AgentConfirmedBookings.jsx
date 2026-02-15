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

        const res = await axios.get(
          "http://localhost:5000/api/bookings/agent/confirmed-bookings",
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
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">From</th>
                  <th className="p-3 border">To</th>
                  <th className="p-3 border">Vehicle</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="p-3 border">
                      {booking.user?.fullName}
                    </td>
                    <td className="p-3 border">
                      {booking.user?.mobile}
                    </td>
                    <td className="p-3 border">
                      {booking.user?.email}
                    </td>
                    <td className="p-3 border">
                      {booking.offerId?.from}
                    </td>
                    <td className="p-3 border">
                      {booking.offerId?.to}
                    </td>
                    <td className="p-3 border">
                      {booking.offerId?.vehicle}
                    </td>
                    <td className="p-3 border text-green-600 font-semibold">
                      ₹{booking.totalAmount}
                    </td>
                    <td className="p-3 border">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
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
