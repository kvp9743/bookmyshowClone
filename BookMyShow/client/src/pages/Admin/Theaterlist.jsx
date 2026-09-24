import React from "react";
import { useState } from "react";
import { message, Table } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../Redux/loaderSlice";
import { getAllTheaters, updateTheater } from "../../Services/theaterApiCalls";
import { isAction } from "@reduxjs/toolkit";

const Theaterlist = () => {
  const [theaters, setTheaters] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(toggleLoader(true));
      const response = await getAllTheaters();
      if (response?.success) setTheaters(response.data);
      else message.error(response.message);
      dispatch(toggleLoader(false));
    } catch (error) {
      dispatch(toggleLoader(false));
      message.error(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleStatusChange = async (theater) => {
    try {
      const response = await updateTheater({
        ...theater,
        isActive: !theater.isActive,
      });
      if (response.success) {
        message.success(
          "Theater " + (theater.isActive ? "Blocked" : "Approved"),
        );
        await getData();
      } else message.error(response.message);
    } catch (error) {
      message.error(error?.response?.data?.message || error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Contact",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, record) => {
        return record?.owner?.name;
      },
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text)
          return <h2 className="text-green-400 font-semibold">Approved</h2>;
        else
          return (
            <h2 className="text-red-600 font-semibold">Blocked/Pending</h2>
          );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => {
        return (
          <div>
            {record?.isActive ? (
              <div
                onClick={() => handleStatusChange(record)}
                className="flex w-21 justify-evenly  items-center  border-2 border-white hover:border-red-500 hover:text-red-500 rounded-lg  cursor-pointer"
              >
                <i
                  title="Block"
                  className="fa-solid fa-thumbs-down  text-xl text-red-500 "
                ></i>
                <h3>Block</h3>
              </div>
            ) : (
              <div
                onClick={() => handleStatusChange(record)}
                className="flex w-21 justify-evenly  items-center  border-2 border-white hover:border-green-400 hover:text-green-400 rounded-lg  cursor-pointer"
              >
                <i
                  title="Approve"
                  className="fa-solid fa-thumbs-up  text-xl text-green-400 "
                ></i>
                <h3>Approve</h3>
              </div>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table dataSource={theaters} columns={columns} rowKey="_id" />
    </div>
  );
};

export default Theaterlist;
