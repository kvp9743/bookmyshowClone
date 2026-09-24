import { axiosInstance } from "./hearders";

const getShowByTheaterId = async (payload) => {
  const response = await axiosInstance.get(
    "/api/user/theaters/getShowByTheaterId",
    {
      params: {
        theater: payload._id,
      },
    },
  );
  return response?.data;
};

const getShowByMovieId = async (payload) => {
  const response = await axiosInstance.get(
    "/api/user/theaters/getShowByMovieId",
    {
      params: {
        movieId: payload.id,
        date: payload.selectedDate,
      },
    },
  );
  return response?.data;
};

const addShow = async (payload) => {
  const response = await axiosInstance.post(
    "/api/user/theaters/addShow",
    payload,
  );
  return response?.data;
};

const deleteShow = async (payload) => {
  const response = await axiosInstance.delete("/api/user/theaters/deleteShow", {
    data: {
      showId: payload,
    },
  });
  return response?.data;
};

const getShowById = async (payload) => {
  const response = await axiosInstance.get("/api/user/theaters/getShowById", {
    params: {
      id: payload,
    },
  });
  const result = response?.data;
  return result;
};

const createCheckoutSession = async (payload) => {
  const response = await axiosInstance.post(
    "/api/user/booking/create-checkout-session",
    payload,
  );

  return response?.data;
};

const verifyPayment = async (payload) => {
  const response = await axiosInstance.post(
    "/api/user/booking/verifyPayment",
    payload,
  );

  return response?.data;
};

const getBookingByUserId = async () => {
  const response = await axiosInstance.get(
    "/api/user/booking/getBookingByUserId",
  );
  const result = response?.data;
  return result;
};

const deleteBooking = async (payload) => {
  const response = await axiosInstance.delete(
    "/api/user/booking/deleteBooking",
    {
      data: {
        bookingId: payload,
      },
    },
  );
  const result = response?.data;
  return result;
};

export {
  getShowByMovieId,
  getShowByTheaterId,
  addShow,
  deleteShow,
  getShowById,
  createCheckoutSession,
  verifyPayment,
  getBookingByUserId,
  deleteBooking,
};
