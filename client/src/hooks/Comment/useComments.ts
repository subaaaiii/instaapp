import { useQuery } from "@tanstack/react-query";
import Api from "../../services/api";

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],

    queryFn: async () => {
      const { data } = await Api.get(`/posts/${postId}/comments`);
      return data;
    },

    enabled: !!postId,
  });
};