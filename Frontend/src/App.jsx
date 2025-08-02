import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import AddOffer from './Pages/AddOffer';
import TodayOffer from './Pages/TodayOffer';
import Carrer from './Pages/Carrer';
import Login from './Pages/Login';
import Register from './Pages/Register';
import OneWayTravel from './Pages/OneWayTravel';
import Offer from './Components/Offer';
import OurServices from './Pages/OurServices';
import ConfirmVehical from './Components/ConfirmVehical';

// Profiles
import AdminProfile from './Components/AdminProfile';
import AgentProfile from './Components/AgentProfile';
import CustomerProfile from './Components/CustomerProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/todayoffer" element={<TodayOffer />} />
        <Route path="/ourservices" element={<OurServices />} />
        <Route path="/carrer" element={<Carrer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/offer" element={<Offer />} />

        {/* Travel / Booking */}
        <Route path="/oneway" element={<OneWayTravel />} />
        <Route path="/addoffer" element={<AddOffer />} />
        <Route path="/confirmvehical" element={<ConfirmVehical />} />

        {/* Profile Pages */}
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/agentprofile" element={<AgentProfile />} />
        <Route path="/customerprofile" element={<CustomerProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
