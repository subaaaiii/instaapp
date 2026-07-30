import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "../../services/api";

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: number) => {
      const { data } = await Api.post(`/posts/${postId}/like`);
      return data;
    },

    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts"],
      });
    },
  });
};