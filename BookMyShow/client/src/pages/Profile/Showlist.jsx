import {
  Col,
  Form,
  message,
  Modal,
  Row,
  Input,
  Select,
  Table,
  TimePicker,
} from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../Redux/loaderSlice";
import { getMovieData } from "../../Services/movieApiCalls";
import {
  addShow,
  deleteShow,
  getShowByTheaterId,
} from "../../Services/showApiCalls";
import Button from "../../Components/Button.jsx";

const Showlist = ({ showModal, setShowModal, selectedTheater }) => {
  const [view, setView] = useState("table");
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const dispatch = useDispatch();

  const handleDelete = async (theaterId) => {
    try {
      const response = await deleteShow(theaterId);
      await getShow();
    } catch (err) {
      message.error(err?.response?.data?.message || err.message);
    }
  };

  const getShow = async () => {
    try {
      dispatch(toggleLoader(true));
      const response = await getShowByTheaterId(selectedTheater);

      if (response?.success) {
        setShows(response?.data);
        message.success(response?.message);
      } else message.error(response.message);
      dispatch(toggleLoader(false));
    } catch (err) {
      dispatch(toggleLoader(false));
      message.error(err?.response?.data?.message || err.message);
    }
  };

  const getMovie = async () => {
    try {
      dispatch(toggleLoader(true));
      const movieResponse = await getMovieData();

      if (movieResponse.success) setMovies(movieResponse?.data);
      else message.error(movieResponse.message);
      dispatch(toggleLoader(false));
    } catch (err) {
      dispatch(toggleLoader(false));
      message.error(err?.response?.data?.message || err.message);
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(toggleLoader(true));
      const { date, time } = values;

      const finalDateTime = moment(date)
        .hour(time.hour())
        .minute(time.minute())
        .second(0)
        .millisecond(0);

      const payload = {
        ...values,
        time: finalDateTime.toISOString(),
      };
      let response = await addShow({
        ...payload,
        theater: selectedTheater._id,
      });

      if (response?.success) {
        setView("table");
        getShow();
      } else message.error(response.message);

      dispatch(toggleLoader(false));
    } catch (err) {
      dispatch(toggleLoader(false));
      message.error(err?.response?.data?.message || err.message);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (_, record) => {
        return moment(record?.date).format("MMM Do YYYY");
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (_, record) => {
        return moment(record?.time).format("hh:mm A");
      },
    },
    {
      title: "Movie",
      dataIndex: "movie",
      render: (_, record) => {
        return record?.movie?.title;
      },
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
    },
    {
      title: "Available Seats",
      dataIndex: "availableSeats",
      render: (_, record) => {
        return record?.totalSeats - record?.bookedSeats.length;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => {
        return (
          <div className="flex justify-center items-center">
            <i
              title="Delete"
              className="fa-solid fa-trash  hover:text-red-600 text-lg mr-3 cursor-pointer"
              onClick={() => {
                handleDelete(record?._id);
              }}
            ></i>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getMovie();
    getShow();
  }, []);
  return (
    <Modal
      title=""
      open={showModal}
      onCancel={() => setShowModal(false)}
      footer={null}
      width={1000}
    >
      <div className="mb-2 uppercase text-xl ">
        <h1>{selectedTheater.name}</h1>
      </div>
      <hr className="mb-2" />
      <div className="flex justify-end mb-1">
        <Button
          title="Add Show"
          onClick={() => {
            setView("form");
          }}
        />
      </div>
      <h1 className=" mb-2   text-lg uppercase">
        {view === "table" ? "Shows" : "Add Show"}
      </h1>

      {view === "table" && (
        <Table
          dataSource={shows}
          columns={columns}
          bordered
          rowKey="_id"
        ></Table>
      )}
      {view === "form" && (
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                label="Show Name"
                name="name"
                rules={[{ required: true, message: "Please add show name " }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please add show date " }]}
              >
                <Input type="Date" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Show time"
                name="time"
                rules={[{ required: true, message: "Please add show time " }]}
              >
                <TimePicker use12Hours format="hh:mm A" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Select" name="movie">
                <Select>
                  {movies &&
                    movies.map((movie) => {
                      return (
                        <Select.Option value={movie?._id}>
                          {movie?.title}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Ticket Price"
                name="ticketPrice"
                rules={[
                  { required: true, message: "Please add Ticket price " },
                ]}
              >
                <Input type="Number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Total Seats"
                name="totalSeats"
                rules={[
                  { required: true, message: "Please add Ticket price " },
                ]}
              >
                <Input type="Number" />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end gap-1">
            <Button
              title="Cancel"
              onClick={() => {
                setView("table");
              }}
            />
            <Button title="Save" type="submit" />
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default Showlist;
