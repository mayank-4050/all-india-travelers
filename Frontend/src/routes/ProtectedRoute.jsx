import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const status = localStorage.getItem("status");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Role based access
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/unauthorized" />;
  }

  // Agent approval protection
  if (role === "agent" && status !== "approved") {
    return <Navigate to="/waiting-approval" />;
  }

  return children;
};

export default ProtectedRoute;
