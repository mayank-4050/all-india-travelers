import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import AddOffer from './Pages/AddOffer';
import TodayOffer from './Pages/TodayOffer';
import OfferRequist from './Pages/OfferRequist';
import ReturnBooking from './Pages/ReturnBooking';
import Carrer from './Pages/Carrer';
import Login from './Pages/Login';
import Register from './Pages/Register'; 
import OneWayTravel from './Pages/OneWayTravel';
import Offer from './Components/Offer';
import Profile from './Pages/Profile';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addoffer" element={<AddOffer />} />
        <Route path="/todayoffer" element={<TodayOffer />} />
        <Route path="/offerrequist" element={<OfferRequist />} />
        <Route path="/returnbooking" element={<ReturnBooking />} />
        <Route path="/carrer" element={<Carrer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oneway" element={<OneWayTravel />} /> 
        <Route path="/offer" element={<Offer />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/register" element={<Register />} /> 


      </Routes>
    </Router>
  );
};

export default App;
