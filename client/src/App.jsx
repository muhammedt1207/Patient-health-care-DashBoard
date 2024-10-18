import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isExist } from "./store/actions/authActions";

import PatientDashboard from "./pages/dashboard/PatientDashboard";
import Login from "./pages/authentications/Login";
import Signup from "./pages/authentications/Signup";
import PayerDashboard from "./pages/dashboard/PrayerDashboard";

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(isExist());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && userData?.role) {
      switch (userData.role) {
        case "doctor":
          navigate("/doctor-dashboard");
          break;
        case "payer":
          navigate("/payer-dashboard");
          break;
        default:
          navigate("/patient-dashboard");
      }
    }
  }, [userData, loading, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/doctor-dashboard"
        element={
          <PrivateRoute allowedRoles={["doctor"]}>
            <PatientDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/payer-dashboard"
        element={
          <PrivateRoute allowedRoles={["payer"]}>
            <PayerDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
