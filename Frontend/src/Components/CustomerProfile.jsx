import React, { useState, useEffect } from "react";
import Navbar from "./UperNavbar";
import { NavLink, useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    profileImage: "",
    createdAt: "",
  });

  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const normalize = (s) => String(s || "").trim().toLowerCase();
  const getId = (b) => b?._id;

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not provided";
    return new Date(dateStr).toLocaleDateString("en-IN");
  };

  // ===============================
  // 🔥 FETCH PROFILE + BOOKINGS
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Profile
        const profileRes = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const profileData = await profileRes.json();

        setProfile({
          name: profileData.fullName || "",
          phone: profileData.mobile || "",
          email: profileData.email || "",
          area: profileData.area || "",
          city: profileData.city || "",
          state: profileData.state || "",
          pincode: profileData.pincode || "",
          profileImage: profileData.profileImage || "",
          createdAt: profileData.createdAt || "",
        });

        // Bookings
        const bookingRes = await fetch(
          "http://localhost:5000/api/bookings",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const bookingData = await bookingRes.json();

        setBookings(
          bookingData.data || bookingData.bookings || []
        );

      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // ===============================
  // 🔥 CANCEL BOOKING (WORKING)
  // ===============================
  const handleCancelByCustomer = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Cancel failed");
      }

      // Update UI instantly
      setBookings((prev) =>
        prev.map((b) =>
          getId(b) === bookingId
            ? { ...b, status: "cancelled" }
            : b
        )
      );

      alert("Booking cancelled successfully!");
    } catch (err) {
      console.error("Cancel error:", err);
      alert(err.message);
    }
  };

  const handlePayAdvance = () => {
    navigate("/qr-code");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        {/* PROFILE SECTION */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-orange-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Customer Profile</h1>
            {profile.createdAt && (
              <p className="text-sm">
                Account Created:{" "}
                {formatDate(profile.createdAt)}
              </p>
            )}
          </div>

          <div className="p-6 space-y-2">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>City:</strong> {profile.city}</p>

            <NavLink to="/customertermsconditions">
              <p className="text-blue-500 mt-3">
                Customer Terms & Conditions
              </p>
            </NavLink>
          </div>
        </div>

        {/* RIDE HISTORY */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">
            Ride History
          </h2>

          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="border-b py-4"
              >
                <p><strong>From:</strong> {booking.from}</p>
                <p><strong>To:</strong> {booking.to}</p>
                <p><strong>Date:</strong> {formatDate(booking.date)}</p>
                <p><strong>Vehicle:</strong> {booking.vehicle}</p>
                <p><strong>Total:</strong> ₹{booking.totalAmount}</p>

                <p className="mt-1">
                  <strong>Status:</strong>{" "}
                  <span className={`px-2 py-1 rounded text-xs ${
                    normalize(booking.status) === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : normalize(booking.status) === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {booking.status}
                  </span>
                </p>

                {["pending", "confirmed"].includes(
                  normalize(booking.status)
                ) && (
                  <button
                    onClick={() =>
                      handleCancelByCustomer(booking._id)
                    }
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    Cancel Booking
                  </button>
                )}

                {/* {normalize(booking.status) === "confirmed" && (
                  <button
                    onClick={handlePayAdvance}
                    className="mt-2 ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Pay Advance
                  </button>
                )} */}
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No ride history available
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default CustomerProfile;
