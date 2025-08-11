import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './Components/BookingContext';

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
import CustomerDetailForm from './Components/CustomerDetailForm';
import PayAdvance from './Pages/PayAdvance';
import ShowVehicle from './Components/ShowVehicle';
import OneWayShowVecl from './Components/OneWayShowVecl';
import OneWayConVecl from './Components/OneWayConVecl';
import OneWayPayAdvnc from './Components/OneWayPayAdvnc';

// Profiles
import AdminProfile from './Components/AdminProfile';
import AgentProfile from './Components/AgentProfile';
import CustomerProfile from './Components/CustomerProfile';
import OneWayDutySlip from './Components/OneWaydutySlip';

// Booking components
import AllBookings from './Components/AllBookings';
import BookingDetail from './Components/BookingDetail'; // NEW component

const App = () => {
  return (
    <BookingProvider>
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
          <Route path="/onewayshowvehical" element={<OneWayShowVecl />} />
          <Route path="/onewayconfirmvehical" element={<OneWayConVecl />} />
          <Route path="/onewaypayadvance" element={<OneWayPayAdvnc />} />
          <Route path="/showvehicle" element={<ShowVehicle />} />
          <Route path="/onewaydutyslip" element={<OneWayDutySlip />} />

          {/* Booking Routes */}
          <Route path="/admin/view-bookings" element={<AllBookings />} /> {/* All bookings */}
          <Route path="/bookingdetail/:id" element={<BookingDetail />} />



          {/* Travel / Booking */}
          <Route path="/oneway" element={<OneWayTravel />} />
          <Route path="/addoffer" element={<AddOffer />} />
          <Route path="/confirmvehical" element={<ConfirmVehical />} />
          <Route path="/customerdetailform" element={<CustomerDetailForm />} />
          <Route path="/payadvance" element={<PayAdvance />} />

          {/* Profile Pages */}
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/agentprofile" element={<AgentProfile />} />
          <Route path="/customerprofile" element={<CustomerProfile />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
};

export default App;
