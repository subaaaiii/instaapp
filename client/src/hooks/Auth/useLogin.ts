import { useMutation } from "@tanstack/react-query";
import Api from "../../services/api";
import { useNavigate } from "react-router-dom";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await Api.post<LoginResponse>("/login", payload);

      localStorage.setItem("token", data.token);

      return data;
    },

    onSuccess: () => {

      navigate("/home");
    },

    onError: (error:any) => {
      console.error(error);
    },
  });
};
