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
// Naya Sidebar Import Karein
import SocialSidebar from '../Components/SocialSidebar'; 

function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <div className="relative"> {/* relative class z-index manage karne ke liye */}
      
      {/* Social Sidebar Yahan Add Karein */}
      <SocialSidebar />

      <OffersPopup />
      <Navbar />
      
      <div className="mb-10"></div>

      <HeroSection />
      <UpdatedMainHome />
      <Offer />
      <CustomerSupport />
      <Footer />
    </div>
  );
}

export default Home;