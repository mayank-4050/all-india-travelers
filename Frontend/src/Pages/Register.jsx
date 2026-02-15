import React, { useState } from "react";
import Navbar from "../Components/UperNavbar";
import { NavLink } from "react-router-dom";
import LiveCameraCapture from "../Components/LiveCameraCapture";

const Register = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    travelerName: "",
    fullName: "",
    email: "",
    mobile: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    idProofType: "",
    idProofImage: null,
    aadharCard: null,
    gumastaCertificate: null,
    officePhoto: null,
    ownerSelfie: null,
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Role is required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("role", role);

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        data.append(key, value);
      }
    });

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          body: data
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("✅ Registered Successfully!");
      } else {
        alert("❌ Error: " + result.message);
      }
    } catch (error) {
      console.error("❌ Registration failed:", error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-8 border border-orange-400">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

          {/* ROLE */}
          <div className="md:col-span-2">
            <label className="font-semibold">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- Select --</option>
              <option value="Admin">Admin</option>
              <option value="Agent">Agent</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          {/* AGENT SECTION */}
          {role === "Agent" && (
            <>
              <div className="md:col-span-2">
                <label className="font-semibold">Traveler Name</label>
                <input
                  type="text"
                  name="travelerName"
                  value={formData.travelerName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="font-semibold">ID Proof Type</label>
                <select
                  name="idProofType"
                  value={formData.idProofType}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">-- Select --</option>
                  <option value="Aadhar Card">Aadhar Card</option>
                  <option value="Voter ID Card">Voter ID Card</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Upload ID Proof</label>
                <input
                  type="file"
                  name="idProofImage"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="font-semibold">Upload Aadhar Card</label>
                <input
                  type="file"
                  name="aadharCard"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="font-semibold">Upload Gumasta Certificate</label>
                <input
                  type="file"
                  name="gumastaCertificate"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* 🔥 LIVE CAMERA COMPONENTS */}

              <div className="md:col-span-2">
                <LiveCameraCapture
                  label="Live Office Photo"
                  name="officePhoto"
                  setFormData={setFormData}
                />
              </div>

              <div className="md:col-span-2">
                <LiveCameraCapture
                  label="Owner Live Selfie"
                  name="ownerSelfie"
                  setFormData={setFormData}
                />
              </div>
            </>
          )}

          {/* COMMON FIELDS */}

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="area"
            placeholder="Area"
            value={formData.area}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-600 text-white px-8 py-2 rounded hover:bg-orange-700 transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 underline">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
