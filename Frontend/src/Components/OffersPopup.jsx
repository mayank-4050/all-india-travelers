import React, { useState, useEffect } from "react";
import Offer from "../Components/Offer";

export default function OffersPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
            {/* Close Icon */}
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl z-50"
            >
              ✖
            </button>

            {/* Offer component */}
            <Offer />
          </div>
        </div>
      )}
    </>
  );
}
