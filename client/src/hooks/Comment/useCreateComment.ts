import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "../../services/api";

type CreateComment = {
  postId: number;
  content: string;
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, content }: CreateComment) => {
      const { data } = await Api.post(`/posts/${postId}/comments`, {
        content,
      });

      return data;
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