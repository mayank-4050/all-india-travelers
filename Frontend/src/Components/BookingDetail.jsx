import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const BookingDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [booking, setBooking] = useState(state?.bookingData || null);
  const [loading, setLoading] = useState(!state?.bookingData);

  useEffect(() => {
    // Only fetch if we don't already have booking data from state
    if (!booking && id) {
      const fetchBooking = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`http://localhost:5000/api/bookings/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
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

  if (loading) return <p>Loading booking details...</p>;
  if (!booking) return <p>Booking not found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>

      <div className="space-y-2">
        <p><strong>From:</strong> {booking.from}</p>
        <p><strong>To:</strong> {booking.to}</p>
        <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {booking.time}</p>
        <p><strong>Vehicle:</strong> {booking.vehicle}</p>
        <p><strong>Seats:</strong> {booking.seats}</p>
        <p><strong>Distance:</strong> {booking.distance} km</p>
        <p><strong>Base Amount:</strong> ₹{booking.baseAmount}</p>
        <p><strong>Driver Allowance:</strong> ₹{booking.driverAllowance}</p>
        <p><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
      </div>

      {booking.passenger && (
        <>
          <h3 className="mt-6 text-xl font-semibold">Passenger Info</h3>
          <div className="space-y-2">
            <p><strong>Name:</strong> {booking.passenger.name}</p>
            <p><strong>Email:</strong> {booking.passenger.email}</p>
            <p><strong>Mobile:</strong> {booking.passenger.mobile}</p>
          </div>
        </>
      )}

      {booking.user && (
        <>
          <h3 className="mt-6 text-xl font-semibold">Booked By (User)</h3>
          <div className="space-y-2">
            <p><strong>User ID:</strong> {booking.user._id}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingDetail;
