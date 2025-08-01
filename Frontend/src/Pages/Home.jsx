
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../Components/UperNavbar';
import MainHome from '../Components/MainHome';
import Offer from '../Components/Offer';
import HeroSection from '../Components/HeroSection'
import Footer from '../Components/Footer';
import CustomerSupport from '../Components/CustomerSupport';


function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <MainHome />
      <Offer/>
      <CustomerSupport/>
      <Footer/>
    </div>
  );
}

export default App;
