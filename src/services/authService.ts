import axios from "axios";
import { API_URL } from "../routes/constants";

const api = axios.create({ baseURL: API_URL });

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  try {
    const response = await api.post(`/register`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post(`/login`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const AuthorizationHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const logoutUser = async () => {
  try {
    await api.post(`/logout`, {}, AuthorizationHeader);
  } catch (error) {
    console.error("Logout failed:", error);
  }

  localStorage.removeItem("token");
};

export const getUser = async (token: string) => {
  const response = await api.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getToken = () => localStorage.getItem("token");
