import React, { useState, useEffect } from 'react';
import Navbar from '../Components/UperNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '../Components/BookingContext'; // Import the BookingContext

const OneWayPayAdvnc = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setBookingData } = useBooking(); // Get the context function

  // Data setup
  const passenger = JSON.parse(localStorage.getItem('passengerData')) || {};
  const offer = location.state?.offer || {};
  const baseAmount = parseFloat(offer.amount) || 0;
  const distance = parseFloat(offer.distance) || 0; // Ensure distance is being retrieved
  const driverAllowance = distance > 100 ? 200 : 0;
  const total = baseAmount + driverAllowance;

  // State for captcha
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    setCaptcha(
      Array.from({ length: 6 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('')
    );
    setCaptchaInput('');
  };

  useEffect(() => generateCaptcha(), []);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const bookingData = {
        from: offer.from,
        to: offer.to,
        date: offer.pickupDate || offer.date,
        time: offer.startTime,
        vehicle: offer.vehicle,
        seats: offer.seats,
        distance: distance,
        baseAmount: baseAmount,
        driverAllowance: driverAllowance,
        totalAmount: total,
        passenger: {
          name: passenger.name,
          phone: passenger.phone,
          email: passenger.email,
          idType: passenger.idType,
          idNumber: passenger.idNumber
        }
      };

      // Create booking
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const data = await response.json();
      console.log('Booking created successfully:', data);

      // Set booking data in context
      setBookingData(bookingData); // Set the booking data in context

      // Send booking data to admin
      await fetch('http://localhost:5000/api/admin/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      // ✅ Show success message
      alert('🎉 Booking successful! Redirecting to your profile...');

      // ✅ Navigate to profile
      navigate('/customerprofile');

    } catch (error) {
      console.error('Error creating booking:', error);
      alert('❌ Failed to create booking. Please try again.');
    }
  };

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
        {/* Vehicle Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b">
            Journey Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">From</p>
              <p className="font-medium">{offer.from}</p>
            </div>
            <div>
              <p className="text-gray-500">To</p>
              <p className="font-medium">{offer.to}</p>
            </div>
            <div>
              <p className="text-gray-500">Date & Time</p>
              <p className="font-medium">
                {offer.pickupDate || offer.date} • {offer.startTime}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Vehicle</p>
              <p className="font-medium">
                {offer.vehicle} ({offer.seats} seats)
              </p>
            </div>
            <div className="col-span-2 md:col-span-4">
              <p className="text-gray-500">Distance</p>
              <p className="font-medium">{distance} km</p> {/* Displaying distance */}
            </div>
          </div>
        </div>

        {/* Charges Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b mb-4">
            Payment Summary
          </h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[200px]">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Base Fare:</span>
                <span className="font-medium">₹{baseAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Driver Allowance:</span>
                <span className="font-medium">₹{driverAllowance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-semibold text-lg">
                <span>Total Amount:</span>
                <span className="text-green-600">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b mb-4">
            Passenger Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{passenger.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Contact</p>
              <p className="font-medium">
                {passenger.phone}<br />
                {passenger.email}
              </p>
            </div>
            <div>
              <p className="text-gray-500">ID Proof</p>
              <p className="font-medium">
                {passenger.idType}: {passenger.idNumber || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* T&C and Captcha */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-start space-x-3">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  checked={isTermsChecked}
                  onChange={(e) => setIsTermsChecked(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="terms-checkbox" className="text-sm text-gray-700">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                </label>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <span className="px-4 py-2 bg-gray-100 rounded-lg font-mono tracking-wider border">
                  {captcha}
                </span>
                <button
                  onClick={generateCaptcha}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div className="flex justify-end">
          <button
            onClick={handleBooking}
            disabled={captchaInput !== captcha || !isTermsChecked}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneWayPayAdvnc;