import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "../../services/api";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await Api.delete(`/posts/${id}`);
      return data;
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["post", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};