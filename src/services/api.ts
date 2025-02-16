import axios from "axios";
import { getToken } from "./authService";
import { API_URL } from "../routes/constants";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export default api;
