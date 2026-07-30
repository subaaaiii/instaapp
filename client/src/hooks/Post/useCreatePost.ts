import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "../../services/api";


export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await Api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};