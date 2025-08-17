import React from 'react';
import Navbar from '../Components/UperNavbar';
import { QrCode, CreditCard } from 'lucide-react'; // modern icons

const QRCode = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-[Poppins]">
      <Navbar />

      <div className="w-full p-10 flex justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center transition-all hover:shadow-blue-300">
          
          {/* Title with icon */}
          <div className="flex items-center gap-3 mb-5">
            <QrCode className="text-blue-600 w-7 h-7" />
            <h1 className="text-3xl font-bold text-blue-800 tracking-wide">
              Scan & Pay
            </h1>
          </div>

          {/* QR Code box */}
          <div className="border-4 border-blue-200 rounded-xl overflow-hidden p-3 bg-gray-50 shadow-inner">
            <img
              src="#"
              alt="QR Code"
              className="w-52 h-52 object-contain"
            />
          </div>

          {/* Payment note */}
          <p className="mt-6 text-gray-600 text-center text-sm">
            Use any UPI app to scan this code and make your payment securely.
          </p>

          {/* Pay Now Button */}
          <button className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all">
            <CreditCard size={18} />
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCode;
