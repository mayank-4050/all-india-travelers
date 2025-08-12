import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const BookingDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [booking, setBooking] = useState(state?.bookingData || null);
  const [loading, setLoading] = useState(!state?.bookingData);
  const [updating, setUpdating] = useState(false);

  // Fetch booking if not in state
  useEffect(() => {
    if (!booking && id) {
      const fetchBooking = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`http://localhost:5000/api/bookings/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBooking(res.data.data);
        } catch (err) {
          console.error("Error fetching booking:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchBooking();
    }
  }, [id, booking]);

const updateBookingStatus = async (status) => {
  if (!id) return;
  setUpdating(true);
  try {
    const token = localStorage.getItem("token");
    const res = await axios.patch(
      `http://localhost:5000/api/bookings/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setBooking((prev) => ({ ...prev, status: res.data.data.status }));
  } catch (err) {
    console.error(`Error updating booking to ${status}:`, err);
  } finally {
    setUpdating(false);
  }
};


  if (loading) return <p className="text-center mt-6">Loading booking details...</p>;
  if (!booking) return <p className="text-center mt-6">Booking not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      {/* Journey Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Journey Summary</h2>
        <div className="grid grid-cols-2 gap-y-2 text-gray-700">
          <p><strong>From:</strong> {booking.from}</p>
          <p><strong>To:</strong> {booking.to}</p>
          <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Vehicle:</strong> {booking.vehicle}</p>
          <p><strong>Seats:</strong> {booking.seats}</p>
          <p><strong>Distance:</strong> {booking.distance} km</p>
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Payment Summary</h2>
        <div className="text-gray-700 space-y-2">
          <p><strong>Base Amount:</strong> ₹{booking.baseAmount}</p>
          <p><strong>Driver Allowance:</strong> ₹{booking.driverAllowance}</p>
          <p className="text-green-600 font-semibold">
            <strong>Total Amount:</strong> ₹{booking.totalAmount}
          </p>
        </div>
      </div>

      {/* Passenger Information */}
      {booking.passenger && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Passenger Information</h2>
          <div className="grid grid-cols-2 gap-y-2 text-gray-700">
            <p><strong>Name:</strong> {booking.passenger.name}</p>
            <p><strong>Email:</strong> {booking.passenger.email}</p>
            <p><strong>Mobile:</strong> {booking.passenger.phone}</p>
          </div>
        </div>
      )}

      {/* Booked By */}
      {booking.user && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Booked By (User)</h2>
          <p><strong>User ID:</strong> {booking.user._id}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => updateBookingStatus("cancelled")}
          disabled={updating}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Cancel Booking
        </button>
        <button
          onClick={() => updateBookingStatus("confirmed")}
          disabled={updating}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingDetail;
