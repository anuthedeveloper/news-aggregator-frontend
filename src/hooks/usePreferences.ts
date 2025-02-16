import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPreferences,
  updatePreferences,
} from "../services/preferenceService";
import { toast } from "react-toastify";

export const usePreferences = () => {
  return useQuery({ queryKey: ["preferences"], queryFn: getPreferences });
};

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preferences"] });
      toast.success("Preferences saved successfully");
    },
    onError: (error) => {
      toast.error(`Unable to save preferences ${error}`);
    },
  });
};
