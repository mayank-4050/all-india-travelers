import { Routes, Route } from "react-router-dom";
import { BookingProvider } from "./Components/BookingContext";
import React, { useState, useEffect } from "react"; // useState aur useEffect add kiya
import ProtectedRoute from "./Components/ProtectedRoute";

/* ================= PAGES & COMPONENTS ================= */

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Unauthorized from "./Pages/Unauthorized";
import Offer from "./Components/Offer";
import Contactus from "./Pages/ContactUs";

import AdminProfile from "./Components/AdminProfile";
import CustomerProfile from "./Components/CustomerProfile";
import AgentProfile from "./Components/AgentProfile";

import AgentTermCondition from "./Components/AgentTermCondition";
import CustomerTermCondition from "./Components/CustomerTermCondition";

import OneWayTravel from "./Pages/OneWayTravel";
import OneWayShowVecl from "./Components/OneWayShowVecl";
import OneWayConVecl from "./Components/One Way/OneWayConVehical";

import OfferConVehical from "./Components/OfferConVehical";
import OfferPayAdvnc from "./Components/OfferPayAdvnc";

import AllBookings from "./Components/AllBookings";
import BookingDetail from "./Components/BookingDetail";
import AllCustomers from "./Components/AllCustomers";
import AdCusDetail from "./Components/AdCusDetail";
import AllAgents from "./Components/AllAgents";
import AdAgentDetail from "./Components/AdAgentDetail";

import AddOffer from "./Pages/AddOffer";
import MyOffers from "./Pages/MyOffers";
import AgentConfirmedBookings from "./Pages/AgentConfirmedBookings";

import AllOfferForAdmin from "./Pages/AllOfferForAdmin";
import AdminAgentRequests from "./Pages/AdminAgentRequests";
import AdvanceConAdmin from "./Pages/AdvanceConAdmin";
import QRCode from "./Pages/QRCode";
import WaitingApproval from "./Pages/WaitingApproval";
import AgentPayment from "./Pages/AgentPayment";
import MarriagePage from "./Pages/MarriagePage"
import MarriageBookings from "./Components/Marrige/MarriageBookings"
import Roundtrip from "./Components/Round trip/MultiCityPlanner"
import Roundtripbookingform from "./Components/Round trip/RoundTripBookingform"
import Roundtripbookingsforadmin from "./Components/Round trip/RoundtripbookigforAdmin"
import Viewsinglebookingforadmin from "./Components/Round trip/ViewsinglebookingforAdmin"
import Localcity from "./Components/Local trip/Localcity"
import Localbookingconfirm from "./Components/Local trip/Localbookingconfirm"
import Localbookingsforadmin from "./Components/Local trip/Localbookingsforadmin"
import Airportandrailway from "./Components/Airport and raiway/Airportandrailway"
import Finalmarrige from "./Components/Marrige Cab Final/Marrige"
import  Finalmarrigebooking from "./Components/Marrige Cab Final/MarrigeBookingConfirm"
import  Tirthdam from "./Components/Tirath Dham/TirthdhamPage"
import Onewaybookingforadmin from "./Components/One Way/Bookingsforadmin"
/* ================= APP ================= */

export default function App() {
 
  return (
    <BookingProvider>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todayoffer" element={<Offer />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/waiting-approval" element={<WaitingApproval />} />
        <Route path="/agent-payment" element={<AgentPayment />} />
        <Route path="/marriage-booking" element={<MarriagePage />} />
        <Route path="/roundtrip" element={<Roundtrip/>} />
        <Route path="/roundtripbookingform" element={<Roundtripbookingform/>} />
        <Route path="/local" element={<Localcity/>} />
        <Route path="/localbookin-confirm" element={<Localbookingconfirm/>} />
        <Route path="/airportandraiway" element={<Airportandrailway/>} />
        <Route path="/bookingformarrige" element={<Finalmarrige/>} />
        <Route path="/bookingformarrige-confirm" element={<Finalmarrigebooking/>} />
        <Route path="/tirathdham" element={<Tirthdam/>} />
        <Route path="/oneway" element={<OneWayTravel/>} />
        <Route path="/onewayshowvehical" element={<OneWayShowVecl/>} />
        <Route path="/onewayconfirmvehical" element={<OneWayConVecl/>} />
       




        {/* ================= ADMIN ROUTES ================= */}
        
        <Route
          path="/admin/marriage-bookings"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <MarriageBookings  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/onewaybookingforadmin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Onewaybookingforadmin  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/roundtripbookingforadmin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Roundtripbookingsforadmin  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/viewroundtripsinglebooking/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Viewsinglebookingforadmin  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/localbookings"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Localbookingsforadmin  />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminprofile"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/view-bookings"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AllBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookingdetail/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <BookingDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/allcustomers"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AllCustomers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/singlecustomerdetail/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdCusDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/allagents"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AllAgents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/singleagentdetail/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdAgentDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/advanceconformation"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdvanceConAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alloffersforadmin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AllOfferForAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/agent-requests"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminAgentRequests />
            </ProtectedRoute>
          }
        />

        {/* ================= CUSTOMER ROUTES ================= */}
        <Route
          path="/customerprofile"
          element={
            <ProtectedRoute allowedRoles={["Customer"]}>
              <CustomerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customertermsconditions"
          element={
            <ProtectedRoute allowedRoles={["Customer"]}>
              <CustomerTermCondition />
            </ProtectedRoute>
          }
        />

        {/* ================= AGENT ROUTES ================= */}
        <Route
          path="/agentprofile"
          element={
            <ProtectedRoute allowedRoles={["Agent"]}>
              <AgentProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agenttermcondition"
          element={
            <ProtectedRoute allowedRoles={["Agent"]}>
              <AgentTermCondition />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-offers"
          element={
            <ProtectedRoute allowedRoles={["Agent"]}>
              <MyOffers />
            </ProtectedRoute>
          }
        />

        {/* 🔥 NEW CONFIRMED BOOKINGS ROUTE */}
        <Route
          path="/agent-confirmed-bookings"
          element={
            <ProtectedRoute allowedRoles={["Agent"]}>
              <AgentConfirmedBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addoffer"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Agent"]}>
              <AddOffer />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN + CUSTOMER ROUTES ================= */}
       
        <Route
          path="/offerconvehical"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Customer"]}>
              <OfferConVehical />
            </ProtectedRoute>
          }
        />

        <Route
          path="/offerpayadvance"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Customer"]}>
              <OfferPayAdvnc />
            </ProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />

      </Routes>
    </BookingProvider>
  );
}
