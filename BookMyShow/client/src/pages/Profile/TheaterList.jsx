import React from "react";
import { useState } from "react";
import { message, Table } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../Redux/loaderSlice";
import {
  deleteTheater,
  getTheaterByOwner,
} from "../../Services/theaterApiCalls";
import Button from "../../Components/Button";
import TheaterForm from "./TheaterForm";
import Showlist from "./Showlist";

const Theaterlist = () => {
  const [theaterForm, setTheaterForm] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = async (theaterId) => {
    try {
      const response = await deleteTheater(theaterId);
      await getData();
    } catch (err) {
      message.error(err?.response?.data?.message || err.message);
    }
  };
  const getData = async () => {
    try {
      dispatch(toggleLoader(true));
      const response = await getTheaterByOwner();
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
          <div className="flex gap-3">
            <i
              title="Delete"
              className="fa-solid fa-trash  hover:text-red-600 text-lg mr-3 cursor-pointer"
              onClick={() => {
                handleDelete(record?._id);
              }}
            ></i>
            <i
              title="Edit"
              className="fa-solid fa-pen-to-square text-lg hover:text-green-400 cursor-pointer"
              onClick={() => {
                setSelectedTheater(record);
                setFormType("edit");
                setTheaterForm(true);
              }}
            ></i>
            {record?.isActive && (
              <div
                title="Shows"
                onClick={() => {
                  setSelectedTheater(record);
                  setShowModal(true);
                }}
                className=" flex items-center justify-between gap-2 px-2 rounded-md border-2 border-gray-500 hover:border-[#f472b6] hover:text-[#f472b6]  cursor-pointer"
              >
                <h3>Shows</h3>
                <i className="fa-solid fa-video text-md "></i>
              </div>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          title="Add Theater"
          onClick={() => {
            setFormType("add");
            setSelectedTheater(null);
            setTheaterForm(true);
          }}
        />
        {theaterForm && (
          <TheaterForm
            theaterForm={theaterForm}
            setTheaterForm={setTheaterForm}
            formType={formType}
            selectedTheater={selectedTheater}
            getData={getData}
          />
        )}
      </div>
      <Table dataSource={theaters} columns={columns} rowKey="_id" />
      {showModal && (
        <Showlist
          showModal={showModal}
          setShowModal={setShowModal}
          selectedTheater={selectedTheater}
        />
      )}
    </div>
  );
};

export default Theaterlist;
