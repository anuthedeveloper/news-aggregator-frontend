import axios from 'axios';
import { getToken } from './authService';

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export default api;
