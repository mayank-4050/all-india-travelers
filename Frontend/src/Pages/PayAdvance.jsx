import React, { useState, useEffect } from 'react';
import Navbar from '../Components/UperNavbar';
import { useLocation, useNavigate } from 'react-router-dom';

const PayAdvance = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Passenger data
  const passenger = JSON.parse(localStorage.getItem('passengerData')) || {};

  // Offer data
  const offer = location.state?.offer || {};

  // Safe numeric conversion
  const baseAmount = parseFloat(offer.amount) || 0;
  const toll = 500;
  const gst = baseAmount * 0.05;
  const total = baseAmount + toll + gst;

  // Captcha State
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  // Generate random alphanumeric captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(code);
    setCaptchaInput('');
  };

  // Run once when page loads
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Validation for Pay button
  const isPayDisabled = !isTermsChecked || captchaInput !== captcha;

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

      <div className="max-w-5xl mx-auto p-6 space-y-8">
        
        {/* Vehicle Details */}
        <section className="bg-white p-5 rounded-xl shadow border">
          <h2 className="text-lg font-bold text-orange-600 mb-3">Vehicle Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <p><b>Pickup Place:</b> {offer.from}</p>
            <p><b>Drop Place:</b> {offer.to}</p>
            <p><b>Date:</b> {offer.date}</p>
            <p><b>Time:</b> {offer.startTime}</p>
            <p><b>Pickup Info:</b> {offer.pickupInfo || "N/A"}</p>
            <p><b>Car Name:</b> {offer.vehicle}</p>
            <p><b>Seats:</b> {offer.seats}</p>
            <p><b>Distance:</b> {offer.distance || "N/A"} km</p>
          </div>
        </section>

        {/* Charges */}
        <section className="bg-white p-5 rounded-xl shadow border">
          <h2 className="text-lg font-bold text-orange-600 mb-3">Charges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <p><b>Base Price:</b> ₹{baseAmount}</p>
            <p><b>Toll Tax & Parking:</b> ₹{toll}</p>
            <p><b>GST (5%):</b> ₹{gst.toFixed(2)}</p>
            <p className="col-span-full"><b>Total:</b> ₹{total.toFixed(2)}</p>
          </div>
        </section>

        {/* Passenger Details */}
        <section className="bg-white p-5 rounded-xl shadow border">
          <h2 className="text-lg font-bold text-orange-600 mb-3">Passenger Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <p><b>Name:</b> {passenger.name}</p>
            <p><b>Phone:</b> {passenger.phone}</p>
            <p><b>Email:</b> {passenger.email}</p>
            <p><b>ID Type:</b> {passenger.idType}</p>
            <p className="col-span-full">
              <b>ID Image:</b> {passenger.idImage ? passenger.idImage.name : "Not Uploaded"}
            </p>
          </div>
        </section>

        {/* Terms & Captcha */}
        <div className="bg-white p-5 rounded-xl shadow border space-y-4">
          {/* Terms */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isTermsChecked}
              onChange={(e) => setIsTermsChecked(e.target.checked)}
            />
            I agree to the <span className="text-blue-500 cursor-pointer">Terms & Conditions</span>
          </label>

          {/* Captcha */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-gray-200 rounded font-mono tracking-widest select-none">
                {captcha}
              </span>
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-sm text-blue-500 underline"
              >
                Refresh
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter captcha here"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Payment Button */}
        <div className="flex justify-end">
          <button
            disabled={isPayDisabled}
            className={`px-6 py-2 rounded-lg font-semibold transition 
              ${isPayDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          >
            Confirm & Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayAdvance;
