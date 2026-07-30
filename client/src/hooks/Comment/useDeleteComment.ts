import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "../../services/api";

type DeleteComment = {
  commentId: number;
  postId: number;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId }: DeleteComment) => {
      await Api.delete(`/comments/${commentId}`);
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["post", variables.postId],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts"],
      });
    },
  });
};