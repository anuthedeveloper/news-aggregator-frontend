import axios from "axios";
import { getToken } from "./authService";
import api from "./api";

export const getPreferences = async () => {
  const response = await api.get("/preferences");
  return response.data;
};

export const updatePreferences = async (preferences: {
  categories: string[];
  sources: string[];
}) => {
  const response = await api.post("/preferences", preferences);
  return response.data;
};
