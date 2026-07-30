import { useQuery } from "@tanstack/react-query";
import Api from "../../services/api";

export const useUserPosts = (username: string) => {
  return useQuery({
    queryKey: ["user-posts", username],

    queryFn: async () => {
      const { data } = await Api.get(`/users/${username}/posts`);
      return data;
    },

    enabled: !!username,
  });
};