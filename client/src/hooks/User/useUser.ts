import { useQuery } from "@tanstack/react-query";
import Api from "../../services/api";

export const useUser = (username?: string) => {
  return useQuery({
    queryKey: ["user", username],

    queryFn: async () => {
      const { data } = await Api.get(`/users/${username}`);
      return data;
    },

    enabled: !!username,
  });
};