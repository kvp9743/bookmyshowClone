import axios from "axios";
import { axiosInstance } from "./hearders";

const getMovieData = async () => {
  const response = await axiosInstance.get("/api/user/movies/getAllMovies");
  const result = response?.data;
  return result;
};

const getMovieById = async (payload) => {
  const response = await axiosInstance.get("/api/user/movies/getMovieById", {
    params: {
      movieId: payload,
    },
  });
  const result = response?.data;
  return result;
};

const addMovie = async (payload) => {
  const response = await axiosInstance.post(
    "/api/user/movies/addMovie",
    payload,
  );
  const result = response?.data;
  return result;
};

const updateMovie = async (payload) => {
  const response = await axiosInstance.patch(
    "/api/user/movies/updateMovie",
    payload,
  );
  const result = response?.data;
  return result;
};

const deleteMovie = async (payload) => {
  const response = await axiosInstance.delete("/api/user/movies/deleteMovie", {
    data: { _id: payload },
  });
  const result = response?.data;
  return result;
};

export { getMovieData, addMovie, updateMovie, deleteMovie, getMovieById };
