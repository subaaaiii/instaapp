import { useQuery } from "@tanstack/react-query";
import Api from "../../services/api";

export const useUsersSuggestion = () => {
  return useQuery({
    queryKey: ["users", "suggestions"],

    queryFn: async () => {
      const { data } = await Api.get("/users/suggestions");
      return data;
    },

    staleTime: 1000 * 60 * 5,
  });
};