import axios from "axios";
import { getToken } from "./authService";
import { API_URL } from "../routes/constants";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to add the token to headers dynamically
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
