import api from "./api";

export const getPreferences = async () => {
  const response = await api.get("/preferences");
  return response.data;
};

export const updatePreferences = async (preferences: any) => {
  const response = await api.post("/preferences", preferences);
  if (response.data.error) throw new Error(response.data.message);
  return response.data;
};
