import { data } from "react-router-dom";
import { axiosInstance } from "./hearders";

const getAllTheaters = async () => {
  const response = await axiosInstance.get("/api/user/theaters/getAllTheaters");
  const result = response?.data;
  return result;
};

const getTheaterByOwner = async () => {
  const response = await axiosInstance.get(
    "/api/user/theaters/getTheaterByOwner",
  );
  const result = response?.data;
  return result;
};

const addTheater = async (payload) => {
  const response = await axiosInstance.post(
    "/api/user/theaters/addTheater",
    payload,
  );
  const result = response?.data;
  return result;
};

const updateTheater = async (payload) => {
  const response = await axiosInstance.patch(
    "/api/user/theaters/updateTheater",
    payload,
  );
  const result = response?.data;
  return result;
};

const deleteTheater = async (payload) => {
  const response = await axiosInstance.delete(
    "/api/user/theaters/deleteTheater",
    {
      data: {
        _id: payload,
      },
    },
  );
  const result = response?.data;
  return result;
};

export {
  getAllTheaters,
  getTheaterByOwner,
  addTheater,
  updateTheater,
  deleteTheater,
};
