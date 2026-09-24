import React, { useEffect, useState } from "react";
import Button from "../../Components/Button.jsx";
import Movieform from "./Movieform.jsx";
import { useDispatch } from "react-redux";
import { deleteMovie, getMovieData } from "../../Services/movieApiCalls.js";
import { toggleLoader } from "../../Redux/loaderSlice.js";
import { message, Table } from "antd";
import moment from "moment";

const Movielist = () => {
  const [movieForm, setMovieForm] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(toggleLoader(true));

      const response = await getMovieData();

      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err?.response?.data?.message || err.message);
    } finally {
      dispatch(toggleLoader(false));
    }
  };
  const handleDelete = async (movieId) => {
    try {
      const response = await deleteMovie(movieId);
      await getData();
    } catch (err) {
      message.error(err?.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Movie",
      dataIndex: "poster",
      render: (_, record) => {
        return (
          <div className="flex flex-col items-center ">
            <img src={record?.poster} width="200" alt="Movie Poster" />
            <div className="text-center uppercase font-semibold">
              {record?.title}
            </div>
          </div>
        );
      },
    },

    {
      title: "Description",
      dataIndex: "description",
    },

    {
      title: "Duration(min)",
      dataIndex: "duration",
    },

    {
      title: "Genre",
      dataIndex: "genre",
    },

    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release-Date",
      dataIndex: "releaseDate",
      render: (_, record) => {
        return moment(record?.releaseDate).format("DD/MM/YYYY");
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => {
        return (
          <div className="flex justify-between">
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
                setSelectedMovie(record);
                setFormType("edit");
                setMovieForm(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          title="Add Movie"
          onClick={() => {
            setFormType("add");
            setSelectedMovie(null);
            setMovieForm(true);
          }}
        />
        {movieForm && (
          <Movieform
            movieForm={movieForm}
            setMovieForm={setMovieForm}
            formType={formType}
            selectedMovie={selectedMovie}
            getData={getData}
          />
        )}
      </div>
      <Table dataSource={movies} columns={columns} rowKey="_id" />
    </div>
  );
};

export default Movielist;
