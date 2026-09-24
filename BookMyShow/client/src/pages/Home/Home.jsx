import React, { useEffect, useState } from "react";
import { Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toggleLoader } from "../../Redux/loaderSlice";
import { getMovieData } from "../../Services/movieApiCalls";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(toggleLoader(true));
      const response = await getMovieData();
      if (response.success) setMovies(response.data);
      else message.error(response.message);
      dispatch(toggleLoader(false));
    } catch (err) {
      dispatch(toggleLoader(false));
      message.error(err?.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className=" pb-10 flex flex-col items-center">
      <div className="flex flex-row w-[40vw] h-10 mt-5 text-lg">
        <Input
          id="search"
          placeholder="Search for Movie"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <label className="text-3xl ml-1 pb-1" htmlFor="search">
          🔍
        </label>
      </div>
      <div className="px-[5vw] h-screen py-8 flex flex-wrap  justify-evenly gap-12 ">
        {movies &&
          movies
            ?.filter((movie) => {
              return movie.title
                .toLowerCase()
                .includes(searchText.toLowerCase().trim());
            })
            .map((movie) => {
              return (
                <div
                  id="movie"
                  key={movie?._id}
                  className="cursor-pointer w-40 h-60  hover:scale-110 duration-200 bg-center bg-cover  rounded-xl flex justify-center items-end 
                    border-solid border-4 border-white hover:border-pink-600 relative "
                  style={{
                    backgroundImage: movie?.poster
                      ? `url(${movie.poster})`
                      : "none",
                  }}
                  onClick={() => navigate(`/movie/${movie?._id}`)}
                >
                  <div
                    id="name"
                    className="w-full text-sm text-center text-white pb-1 bg-stone-900 bg-opacity-60 rounded-b-lg"
                  >
                    {movie?.title}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Home;
