import { axiosInstance } from "./hearders";

export const registerUser = async (payload) => {
  const response = await axiosInstance.post("/api/user/register", payload);
  const result = await response?.data;

  return result;
};

export const loginUser = async (payload) => {
  const response = await axiosInstance.post("/api/user/login", payload);
  const result = await response?.data;

  return result;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/api/user/getUserDetails");
  const result = await response?.data;

  return result;
};

export const logOutUser = async () => {
  const response = await axiosInstance.post("/api/user/logOut");
  const result = await response?.data;

  return result;
};
