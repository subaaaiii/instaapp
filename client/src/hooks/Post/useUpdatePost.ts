import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "../../services/api";

type UpdatePostData = {
  id: number;
  caption: string;
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, caption }: UpdatePostData) => {
      const { data } = await Api.put(`/posts/${id}`, {
        caption,
      });

      return data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["post", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts"],
      });
    },
  });
};