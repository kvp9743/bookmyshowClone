import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Pagetitle from "../../Components/Pagetitle";
import { Tabs } from "antd";
import Movielist from "./Movielist";
import Theaterlist from "./Theaterlist";
import Booking from "../Tickets/Booking";

const Admin = () => {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?.isAdmin) {
      return <Navigate to="/profile" replace />;
    }
  }, []);
  const items = [
    {
      key: "1",
      label: "Bookings",
      children: <Booking />,
    },
    {
      key: "2",
      label: "Movies",
      children: <Movielist />,
    },
    {
      key: "3",
      label: "TheaterList",
      children: <Theaterlist />,
    },
  ];
  return (
    <div className="mx-10 mt-5">
      <Pagetitle title="Admin" subtitle="Manage movies and theaters" />
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Admin;
