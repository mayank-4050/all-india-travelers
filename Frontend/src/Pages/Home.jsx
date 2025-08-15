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
