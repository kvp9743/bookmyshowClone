import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import { useSelector } from "react-redux";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/Profile/Profile";
import MovieShows from "./pages/Home/MovieShows";
import ShowLayout from "./pages/Home/ShowLayout";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentCancelled from "./pages/payment/PaymentCancelled";

function App() {
  const { loading } = useSelector((state) => state.loader);
  return (
    <div>
      {loading && (
        <div className=" h-screen flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movie/:id" element={<MovieShows />} />
            <Route path="/bookShow/:id" element={<ShowLayout />} />

            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancelled" element={<PaymentCancelled />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
