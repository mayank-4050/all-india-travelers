import React from "react";
import Navbar from "../Components/UperNavbar";
import MarriageCarSlider from "../Components/Marrige/MarriageCarSlider";
import MarriageBookingForm from "../Components/Marrige/MarriageBookingForm";
import SocialLinks from "../Components/Marrige/SocialLinks";

const MarriagePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">

        <div className="flex flex-col md:flex-row gap-8">

          {/* Left Slider */}
          <div className="md:w-1/2">
            <MarriageCarSlider />
          </div>

          {/* Right Form */}
          <div className="md:w-1/2">
            <MarriageBookingForm />
          </div>

        </div>

        {/* Social Links */}
        <div className="flex justify-center mt-10">
          <SocialLinks />
        </div>

      </div>

    </div>
  );
};

export default MarriagePage;