import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../Components/UperNavbar';
import MainHome from '../Components/MainHome';
import Offer from '../Components/Offer';
import HeroSection from '../Components/HeroSection'
import Footer from '../Components/Footer';
import CustomerSupport from '../Components/CustomerSupport';
import UpdatedMainHome from '../Components/UpdatedMainHome';
import OffersPopup from '../Components/OffersPopup'; // ✅ import popup

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <div>
      {/* Popup should be very first */}
      <OffersPopup /> 

      <Navbar/>
      <HeroSection/>
      <UpdatedMainHome/>
      <MainHome />
      <Offer/>
      <CustomerSupport/>
      <Footer/>
    </div>
  );
}

export default App;
