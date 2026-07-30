import { useQuery } from "@tanstack/react-query";
import Api from "../../services/api";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],

    queryFn: async () => {
      const { data } = await Api.get("/me");
      return data;
    },

    staleTime: 1000 * 60 * 5, 
    retry: false,
  });
};