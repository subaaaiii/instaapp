import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;


const Api = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: {
    Accept: "application/json",
  },
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const isPublicRoute = config.url === "/" || config.url === "/register";

    if (token && !isPublicRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  },
);
export default Api;
