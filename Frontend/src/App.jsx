import React from "react";
import { Routes, Route } from "react-router-dom";
import { BookingProvider } from "./Components/BookingContext";
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
import OneWayConVecl from "./Components/OneWayConVecl";
import CustomerDetailForm from "./Components/CustomerDetailForm";
import OneWayPayAdvnc from "./Components/OneWayPayAdvnc";
import OneWaydutySlip from "./Components/OneWaydutySlip";

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


        {/* ================= ADMIN ROUTES ================= */}
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
          path="/oneway"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Customer"]}>
              <OneWayTravel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/onewayshowvehical"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Customer"]}>
              <OneWayShowVecl />
            </ProtectedRoute>
          }
        />

        <Route
          path="/onewayconfirmvehical"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Customer"]}>
              <OneWayConVecl />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customerdetailform"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Customer"]}>
              <CustomerDetailForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/onewaypayadvance"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Customer"]}>
              <OneWayPayAdvnc />
            </ProtectedRoute>
          }
        />

        <Route
          path="/qr-code"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Customer"]}>
              <QRCode />
            </ProtectedRoute>
          }
        />

        <Route
          path="/onewaydutyslip"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Customer"]}>
              <OneWaydutySlip />
            </ProtectedRoute>
          }
        />

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
