import React, { useState, useEffect } from "react";
import Navbar from "../Components/UperNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useBooking } from "../Components/BookingContext";

const OneWayPayAdvnc = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  const offer = location.state?.offer || {};
  const token = localStorage.getItem("token");

  // 🔥 Decode JWT safely
  let user = {};
  if (token) {
    try {
      user = JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const baseAmount = Number(offer.amount) || 0;
  const distance = Number(offer.distance) || 0;
  const driverAllowance = distance > 100 ? 200 : 0;
  const total = baseAmount + driverAllowance;

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const newCaptcha = Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
    setCaptcha(newCaptcha);
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // 🔥 HANDLE BOOKING (Support both Offer + OneWay)
  const handleBooking = async () => {
    try {
      if (!token) throw new Error("Please login first");

      setLoading(true);

      const bookingData = {
        offerId: offer._id || null, // ✅ allow null for OneWay
        from: offer.from,
        to: offer.to,
        date: new Date(offer.pickupDate || offer.date),
        time: offer.startTime,
        vehicle: offer.vehicle,
        seats: offer.seats,
        distance,
        baseAmount,
        driverAllowance,
        totalAmount: total,
        passenger: {
          name: user.fullName || "Customer",
          phone: user.mobile || "",
          email: user.email || "",
          idType: "N/A",
          idNumber: "N/A",
        },
      };

      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed");
      }

      setBookingData(result.data);

      alert("🎉 Booking successful!");
      navigate("/customerprofile");

    } catch (error) {
      console.error("Booking Error:", error);
      alert(error.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 If no data
  if (!offer.from || !offer.vehicle) {
    return (
      <div className="p-5 text-center">
        <p className="text-red-500">No booking data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-white px-4 py-2 rounded mt-3"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* Journey Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold border-b pb-2">
            Journey Summary
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
            <div>
              <p className="text-gray-500">From</p>
              <p>{offer.from}</p>
            </div>
            <div>
              <p className="text-gray-500">To</p>
              <p>{offer.to}</p>
            </div>
            <div>
              <p className="text-gray-500">Date & Time</p>
              <p>
                {offer.pickupDate || offer.date} • {offer.startTime}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Vehicle</p>
              <p>{offer.vehicle}</p>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold border-b pb-2">
            Payment Summary
          </h2>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Base Fare</span>
              <span>₹{baseAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Driver Allowance</span>
              <span>₹{driverAllowance}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-green-600">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        {/* Terms + Captcha */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isTermsChecked}
              onChange={(e) => setIsTermsChecked(e.target.checked)}
            />
            <span>I agree to terms</span>
          </div>

          <div className="mt-4 flex gap-3 items-center">
            <span className="bg-gray-200 px-4 py-2 rounded font-mono">
              {captcha}
            </span>
            <button
              onClick={generateCaptcha}
              className="text-blue-600"
            >
              Refresh
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="border p-2 mt-3 w-full rounded"
          />
        </div>

        {/* Book Button */}
        <div className="flex justify-end">
          <button
            onClick={handleBooking}
            disabled={
              captchaInput !== captcha ||
              !isTermsChecked ||
              loading
            }
            className="px-8 py-3 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Processing..." : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneWayPayAdvnc;
