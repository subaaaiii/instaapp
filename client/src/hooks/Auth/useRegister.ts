import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Api from "../../services/api";

interface RegisterPayload {
  username: string;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface RegisterResponse {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await Api.post<RegisterResponse>(
        "/register",
        payload
      );

      localStorage.setItem("token", data.token);

      return data;
    },

    onSuccess: () => {
      navigate("/");
    },

    onError: (error:any) => {
      console.error(error);
    },
  });
};