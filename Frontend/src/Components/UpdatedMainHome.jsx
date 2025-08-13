import React from "react";
import { NavLink } from "react-router-dom";

export default function UpdatedMainHome() {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-5xl border-2 border-lime-700 rounded-xl p-3 md:p-5 space-y-6">
        <div className="flex items-center gap-3 md:gap-6">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-black">
            ONE WAY TAXI
          </h1>
          <div className="flex-1 text-center">
            <span className="text-xl md:text-2xl font-extrabold tracking-wider">
              LIMITED TIME OFFER
            </span>
          </div>
          <NavLink to='/todayoffer'>
          <button className=" cursor-pointer text-sm md:text-base border-2 border-lime-700 rounded-md px-3 py-1 font-semibold">
            OFFER VISIT
          </button>
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="border-2 border-lime-700 rounded-lg p-3 space-y-3">
            <div className="flex flex-wrap gap-2">
              {[<NavLink to='/oneway'>One Way</NavLink>, "Local", "Round Trip", "Railway / Airport pickup,Drop"].map((t) => (
                <div key={t} className="bg-orange-400 text-white text-xs md:text-sm font-semibold rounded-md px-3 py-1">
                  {t}
                </div>
              ))}
            </div>
            <div className="bg-orange-400 text-white text-center font-semibold rounded-md py-2">
              Login Information
            </div>
            <div className="border-2 border-lime-700 rounded-lg p-6 space-y-5">
              <NavLink to="/register" className="block">
                <button className="w-full border-2 border-lime-700 rounded-xl py-3 font-semibold hover:bg-lime-50">
                  Agent Login
                </button>
              </NavLink>
              <NavLink to="/register" className="block">
                <button className="w-full border-2 border-lime-700 rounded-xl py-3 font-semibold hover:bg-lime-50">
                  Citizen Login
                </button>
              </NavLink>
            </div>
           <p className="bg-green-300 text-green-700 p-3 rounded text-[10px]">
  We ask users to log in first to ensure the security and privacy of your personal information. 
  Logging in helps us provide a personalized experience, manage your bookings efficiently, and keep your data safe. 
  It also allows us to offer you better customer support.
  <br />
  <span>
    हम उपयोगकर्ताओं से पहले लॉगिन करने को कहते हैं ताकि आपकी व्यक्तिगत जानकारी की सुरक्षा और गोपनीयता सुनिश्चित की जा सके। 
    लॉगिन करने से हम आपके लिए एक व्यक्तिगत अनुभव प्रदान कर पाते हैं, आपकी बुकिंग को बेहतर तरीके से प्रबंधित कर पाते हैं, 
    और आपका डेटा सुरक्षित रहता है। इससे हमें आपको बेहतर सेवा देने में भी मदद मिलती है।
  </span>
</p>

          </div>

          <div className="border-2 border-lime-700 rounded-lg p-3">
            <div className="bg-orange-400 text-white text-center font-semibold rounded-md py-2 mb-3">
              Citizen Booking
            </div>
            <div className="space-y-2">
              {["One Way Cab Booking", "One Way Advance Cab Booking", "Railway /Airport Pickup / Drop Booking", "Office Use Cab Booging", "Marriage Cab booking", "Local City Cab booking", "Tour Packeg Cab Booking", "National Park Cab Booking"].map((item) => (
                <div key={item} className="border-2 border-lime-700 rounded-md px-3 py-2 text-sm md:text-base">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 border-lime-700 rounded-lg p-3">
            <div className="bg-orange-400 text-white text-center font-semibold rounded-md py-2 mb-3">
              Agent Services
            </div>
            <div className="space-y-2">
              {["One Way Taxi Service", "Round Trip Taxi Service", "Local City Taxi service", "Railway Station Pickup/Drop Service", "Airport Pickup / Drop Service", "National Park Taxi Service", "Cab Service", "Tour Packeg Taxi service"].map((item) => (
                <div key={item} className="border-2 border-lime-700 rounded-md px-3 py-2 text-sm md:text-base">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}