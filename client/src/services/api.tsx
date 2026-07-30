import axios from "axios";

const Api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
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

      // Redirect ke login jika diperlukan
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
export default Api;
