import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import AddOffer from './Pages/AddOffer';
import TodayOffer from './Pages/TodayOffer';
import ReturnBooking from './Pages/ReturnBooking';
import Carrer from './Pages/Carrer';
import Login from './Pages/Login';
import Register from './Pages/Register'; 
import OneWayTravel from './Pages/OneWayTravel';
import Offer from './Components/Offer';
import Profile from './Pages/Profile';
import OurServices from './Pages/OurServices';
import ConfirmVehical from './Components/ConfirmVehical';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addoffer" element={<AddOffer />} />
        <Route path="/todayoffer" element={<TodayOffer />} />
        <Route path="/ourservices" element={<OurServices />} />
        {/* <Route path="/returnbooking" element={<ReturnBooking />} /> */}
        <Route path="/carrer" element={<Carrer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oneway" element={<OneWayTravel />} /> 
        <Route path="/offer" element={<Offer />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/confirmvehical" element={<ConfirmVehical />} /> 


      </Routes>
    </Router>
  );
};

export default App;
