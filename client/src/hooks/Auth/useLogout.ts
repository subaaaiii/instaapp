import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Api from "../../services/api";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await Api.post("/logout");
      return data;
    },

    onSuccess: () => {
      queryClient.clear();

      navigate("/", { replace: true });
    },
  });
};