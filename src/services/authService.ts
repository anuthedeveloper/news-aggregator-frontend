import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await axios.post(`${api}/register`, data);
  return response.data;
};

export const login = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${api}/login`, data);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");

export const logout = async () => {
  await axios.post(
    `${api}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  localStorage.removeItem("token");
};