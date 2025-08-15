import React, { useState, useEffect } from "react";
import Offer from "../Components/Offer";

export default function OffersPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []); // Always runs on refresh

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[9999] p-2">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl relative overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-l font-bold z-50"
            >
              ✖
            </button>

            {/* Offer Content with scroll on small screens */}
            <div className="overflow-x-auto max-h-[90vh]">
              <Offer />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
