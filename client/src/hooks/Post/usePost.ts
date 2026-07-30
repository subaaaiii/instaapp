import { useQuery } from "@tanstack/react-query";
import Api from "../../services/api";

export const usePost = (postId: number | string) => {
  return useQuery({
    queryKey: ["post", postId],

    queryFn: async () => {
      const { data } = await Api.get(`/posts/${postId}`);
      return data;
    },

    enabled: !!postId,
  });
};