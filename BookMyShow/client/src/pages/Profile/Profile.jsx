import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Pagetitle from "../../Components/Pagetitle";
import { Tabs } from "antd";
import Item from "antd/es/list/Item";
import TheaterList from "./TheaterList";
import Booking from "../Tickets/Booking.jsx";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  if (user?.isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  const items = [
    {
      key: "1",
      label: "Tickets",
      children: <Booking />,
    },
    {
      key: "2",
      label: "TheaterList",
      children: <TheaterList />,
    },
  ];
  return (
    <div className="mx-10 mt-5">
      <Pagetitle title="Profile" subtitle="Manage bookings and theaters" />
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Profile;
