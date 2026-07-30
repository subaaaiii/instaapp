import { useQuery } from "@tanstack/react-query";
import Api from "../../services/api"; 

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],

    queryFn: async () => {
      const { data } = await Api.get("/posts");
      return data;
    },

    staleTime: 1000 * 60, 
  });
};