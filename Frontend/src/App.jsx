// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { BookingProvider } from "./Components/BookingContext";

import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from './Pages/Register';
import Unauthorized from "./Pages/Unauthorized";
import Offer from "./Components/Offer";
import Contactus from "./Pages/ContactUs";
import AdminProfile from './Components/AdminProfile';
import CustomerProfile from './Components/CustomerProfile';
import OneWayTravel from './Pages/OneWayTravel';
import OneWayShowVecl from './Components/OneWayShowVecl';
import OneWayConVecl from './Components/OneWayConVecl';
import CustomerDetailForm from './Components/CustomerDetailForm';
import OneWayPayAdvnc from './Components/OneWayPayAdvnc';
import AllBookings from './Components/AllBookings'
import BookingDetail from './Components/BookingDetail'
import AllCustomers from './Components/AllCustomers'
import AdCusDetail from './Components/AdCusDetail'
import AllAgents from './Components/AllAgents'
import AdAgentDetail from './Components/AdAgentDetail'
import AgentProfile from './Components/AgentProfile'
import AgentTermCondition from './Components/AgentTermCondition'
import CustomerTermCondition from './Components/CustomerTermCondition'
import QRCode from "./Pages/QRCode";
import OneWaydutySlip from './Components/OneWaydutySlip'
import AdvanceConAdmin from './Pages/AdvanceConAdmin'
import OfferConVehical from "./Components/OfferConVehical";
import OfferPayAdvnc from "./Components/OfferPayAdvnc";
import AddOffer from "./Pages/AddOffer";


export default function App() {
  return (
    <BookingProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todayoffer" element={<Offer />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin-only dashboard */}
        <Route
          path="/adminprofile"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view-bookings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookingdetail/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <BookingDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allcustomers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/singlecustomerdetail/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdCusDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allagents"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllAgents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/singleagentdetail/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdAgentDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/advanceconformation"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdvanceConAdmin />
            </ProtectedRoute>
          }
        />





        {/* Customer dashboard */}
        <Route
          path="/customerprofile"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customertermsconditions"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerTermCondition />
            </ProtectedRoute>
          }
        />



        {/* Agent Deshboard */}

        <Route
          path="/agentprofile"
          element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <AgentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agenttermcondition"
          element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <AgentTermCondition />
            </ProtectedRoute>
          }
        />





        {/* accesseble by admin/customer */}
        <Route
          path="/oneway"
          element={
            <ProtectedRoute allowedRoles={["admin", "customer"]}>
              <OneWayTravel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onewayshowvehical"
          element={
            <ProtectedRoute allowedRoles={["admin", "customer"]}>
              <OneWayShowVecl />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onewayconfirmvehical"
          element={
            <ProtectedRoute allowedRoles={["admin", "customer"]}>
              <OneWayConVecl />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customerdetailform"
          element={
            <ProtectedRoute allowedRoles={["admin", "customer"]}>
              <CustomerDetailForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onewaypayadvance"
          element={
            <ProtectedRoute allowedRoles={["admin", "customer"]}>
              <OneWayPayAdvnc />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qr-code"
          element={
            <ProtectedRoute allowedRoles={["admin", "customer"]}>
              <QRCode />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onewaydutyslip"
          element={
            <ProtectedRoute allowedRoles={["admin", "customer"]}>
              <OneWaydutySlip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/offerconvehical"
          element={
            <ProtectedRoute allowedRoles={["admin", "customer"]}>
              <OfferConVehical />
            </ProtectedRoute>
          }
        />
        <Route
          path="/offerpayadvance"
          element={
            <ProtectedRoute allowedRoles={["admin", "customer"]}>
              <OfferPayAdvnc />
            </ProtectedRoute>
          }
        />


        {/* for Admin/Agent */}

          <Route
          path="/addoffer"
          element={
            <ProtectedRoute allowedRoles={["admin", "agent"]}>
              <AddOffer />
            </ProtectedRoute>
          }
        />







        {/* Fallback 404 */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BookingProvider>
  );
}

















































































































































// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { BookingProvider } from './Components/BookingContext';

// import Home from './Pages/Home';
// import AddOffer from './Pages/AddOffer';
// import TodayOffer from './Pages/TodayOffer';
// import Login from './Pages/Login';
// import Register from './Pages/Register';
// import OneWayTravel from './Pages/OneWayTravel';
// import Offer from './Components/Offer';
// import OurServices from './Pages/OurServices';
// import ConfirmVehical from './Components/ConfirmVehical';
// import CustomerDetailForm from './Components/CustomerDetailForm';
// import PayAdvance from './Pages/PayAdvance';
// import ShowVehicle from './Components/ShowVehicle';
// import OneWayShowVecl from './Components/OneWayShowVecl';
// import OneWayConVecl from './Components/OneWayConVecl';
// import OneWayPayAdvnc from './Components/OneWayPayAdvnc';

// // Profiles
// import AdminProfile from './Components/AdminProfile';
// import AgentProfile from './Components/AgentProfile';
// import CustomerProfile from './Components/CustomerProfile';
// import OneWayDutySlip from './Components/OneWaydutySlip';

// // Booking components
// import AllBookings from './Components/AllBookings';
// import BookingDetail from './Components/BookingDetail'; // NEW component
// import AllCustomers from './Components/AllCustomers';
// import AdCusDetail from './Components/AdCusDetail';
// import AllAgents from './Components/AllAgents';
// import AdAgentDetail from './Components/AdAgentDetail';
// import ContactUs from './Pages/ContactUs';
// import AgentTermConditon from './Components/AgentTermCondition'
// import CustomerTermCondition from './Components/CustomerTermCondition'

// const App = () => {
//   return (
//     <BookingProvider>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/todayoffer" element={<TodayOffer />} />
//           <Route path="/ourservices" element={<OurServices />} />
//           <Route path="/contactus" element={<ContactUs />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/offer" element={<Offer />} />
//           <Route path="/onewayshowvehical" element={<OneWayShowVecl />} />
//           <Route path="/onewayconfirmvehical" element={<OneWayConVecl />} />
//           <Route path="/onewaypayadvance" element={<OneWayPayAdvnc />} />
//           <Route path="/showvehicle" element={<ShowVehicle />} />
//           <Route path="/onewaydutyslip" element={<OneWayDutySlip />} />

//           {/* Booking Routes */}
//           <Route path="/admin/view-bookings" element={<AllBookings />} /> {/* All bookings */}
//           <Route path="/bookingdetail/:id" element={<BookingDetail />} />
//           <Route path="/allcustomers" element={<AllCustomers />} />
//           <Route path="/singlecustomerdetail/:id" element={<AdCusDetail />} />
//           <Route path="/allagents" element={<AllAgents />} />
//           <Route path="/singleagentdetail/:id" element={<AdAgentDetail />} />



//           {/* Travel / Booking */}
//           <Route path="/oneway" element={<OneWayTravel />} />
//           <Route path="/addoffer" element={<AddOffer />} />
//           <Route path="/confirmvehical" element={<ConfirmVehical />} />
//           <Route path="/customerdetailform" element={<CustomerDetailForm />} />
//           <Route path="/payadvance" element={<PayAdvance />} />
//           <Route path="/agenttermsconditions" element={<AgentTermConditon />} />
//           <Route path="/customertermsconditions" element={<CustomerTermCondition/>} />


//           {/* Profile Pages */}
//           <Route path="/adminprofile" element={<AdminProfile />} />
//           <Route path="/agentprofile" element={<AgentProfile />} />
//           <Route path="/customerprofile" element={<CustomerProfile />} />
//         </Routes>
//       </Router>
//     </BookingProvider>
//   );
// };

// export default App;