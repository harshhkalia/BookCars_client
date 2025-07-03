import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Auth from "./components/auth/Auth";

const ProtectedRoute = ({ fallback: FallbackComponent = Auth }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrenditals = async () => {
      const user = JSON.parse(localStorage.getItem("userdata"));
      setUser(user);
      setLoading(false);
    };
    fetchCrenditals();
  }, []);

  if (loading) {
    return <div id="loading_heading">Loading...</div>;
  }

  if (user?.userType === "Customer") {
    return <Navigate to="/customer" />;
  } else if (user?.userType === "Owner" && user?.showroomDetails?.carName) {
    return <Navigate to="/owner" />;
  } else if (user?.userType === "Owner") {
    return <Navigate to="/ownerIP" />;
  } else {
    return <FallbackComponent />;
  }
};

export default ProtectedRoute;
