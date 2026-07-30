import { useQuery } from "@tanstack/react-query";
import Api from "../services/api";

export const useTest = () => {
  return useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const res = await Api.get("/test");
      return res.data;
    },
  });
};
