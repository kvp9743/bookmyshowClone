import React, { useEffect, useState } from "react";
import { getShowByMovieId } from "../../Services/showApiCalls";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../Services/movieApiCalls";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../Redux/loaderSlice";
import { Input, message } from "antd";
import moment from "moment";

const MovieShows = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theaters, setTheaters] = useState([]);
  const [movie, setMovie] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD"),
  );

  const getShow = async () => {
    try {
      dispatch(toggleLoader(true));
      const response = await getShowByMovieId({ id, selectedDate });

      if (response?.success) {
        setTheaters(response?.data);
        if (response?.data?.length > 0) message.success(response?.message);
        else message.error("No Shows available on selected date");
      } else message.error(response?.message);
      dispatch(toggleLoader(false));
    } catch (err) {
      dispatch(toggleLoader(false));
      message.error(err?.response?.data?.message || err.message);
    }
  };
  const getMovieDetails = async () => {
    try {
      dispatch(toggleLoader(true));
      const response = await getMovieById(id);

      if (response?.success) {
        setMovie(response?.data);
        // message.success(response?.message);
      } else message.error(response.message);
      dispatch(toggleLoader(false));
    } catch (err) {
      dispatch(toggleLoader(false));
      message.error(err?.response?.data?.message || err.message);
    }
  };
  useEffect(() => {
    getMovieDetails();
  }, []);

  useEffect(() => {
    getShow();
    // eslint-disable-next-line
  }, [selectedDate]);

  return (
    <div>
      {movie && (
        <div>
          <div className="flex  items-center m-2">
            <div>
              <img
                className="h-[40vh] w-60 object-cover"
                src={movie?.poster}
                alt="Movie Poster"
              />
            </div>
            <div className=" text-sm p-2 flex flex-col gap-0.5  ">
              <p className="text-xl text-center">{movie?.title}</p>
              <p>
                <span className="font-bold text-base">Description :- </span>
                {movie?.description}
              </p>
              <div>
                <span className="font-bold text-base">Genre :- </span>
                <span> {movie?.genre} </span>
                <p>
                  <span className="font-bold text-base">Realease Date :- </span>
                  {moment(movie?.releaseDate).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
          </div>
          <hr className="my-2" />
          <div className="flex flex-row  justify-center items-center gap-2 text-center mb-3">
            <h1 className="text-md w-auto ">Select show date :-</h1>
            <Input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={selectedDate}
              className="max-w-40"
              onChange={(e) => {
                setSelectedDate(e.target.value);
                // navigate(`/movies/${params.id}?date=${e.target.value}`);
              }}
            />
          </div>
        </div>
      )}
      <div className="mt-1">
        <h1 className="text-xl text-center uppercase">All Shows</h1>
      </div>

      <div className="m-2 flex flex-col gap-1">
        {theaters.map((theater) => (
          <div className="p-2" key={theater._id}>
            <hr className="my-1" />
            <div className="text-md uppercase font-semibold">
              {theater.name}
            </div>
            <div className="text-sm ">Address : {theater.address}</div>
            <div className="text-sm mb-3">Contact : {theater.phone}</div>

            <div className="flex gap-3  ">
              {theater.shows.map((show) => (
                <div
                  key={show?._id}
                  className="  p-1 cursor-pointer border-2  border-stone-600 rounded-md hover:border-pink-500 hover:text-white hover:bg-pink-500"
                  onClick={() => {
                    navigate(`/bookShow/${show._id}`);
                  }}
                >
                  <div className="text-sm">
                    {moment(show.time).format("hh:mm A")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieShows;
