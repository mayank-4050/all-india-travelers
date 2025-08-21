import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../Components/UperNavbar';
import HeroSection from '../Components/HeroSection';
import Footer from '../Components/Footer';
import CustomerSupport from '../Components/CustomerSupport';
import UpdatedMainHome from '../Components/UpdatedMainHome';
import OffersPopup from '../Components/OffersPopup';
import Offer from '../Components/Offer';
// import CoverflowSlider from '../Components/CoverflowSlider';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <div>
      {/* Popup only for home page */}
      <OffersPopup />

      <Navbar />
      <div className="w-full px-2 sm:px-8 mt-3 sm:mt-5">
        <div className="w-full bg-red-300 rounded h-10 sm:h-12 flex items-center overflow-hidden relative">
          <div className="flex animate-slide whitespace-nowrap">
            <span className="text-red-700 text-sm sm:text-base font-medium mr-12 sm:mr-16">
              ⚠️ Important Notice: Due to scheduled maintenance, some functionalities/services may be temporarily unavailable.
              We regret the inconvenience caused and appreciate your patience.
              ⚠️ महत्वपूर्ण सूचना: निर्धारित रखरखाव कार्य के कारण कुछ सुविधाएँ/सेवाएँ अस्थायी रूप से उपलब्ध नहीं होंगी।
              असुविधा के लिए हमें खेद है और आपके धैर्य की सराहना करते हैं।
            </span>
            <span className="text-red-700 text-sm sm:text-base font-medium mr-12 sm:mr-16">
              ⚠️ Important Notice: Due to scheduled maintenance, some functionalities/services may be temporarily unavailable.
              We regret the inconvenience caused and appreciate your patience.
              ⚠️ महत्वपूर्ण सूचना: निर्धारित रखरखाव कार्य के कारण कुछ सुविधाएँ/सेवाएँ अस्थायी रूप से उपलब्ध नहीं होंगी।
              असुविधा के लिए हमें खेद है और आपके धैर्य की सराहना करते हैं।
            </span>
          </div>
        </div>
      </div>




      <HeroSection />
      {/* <CoverflowSlider /> */}

      <UpdatedMainHome />
      <Offer />
      <CustomerSupport />
      <Footer />
    </div>
  );
}

export default Home;
