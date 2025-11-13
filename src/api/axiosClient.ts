import axios from "axios";
import queryString from "query-string";
import { refreshToken } from "./userApi";

const axiosClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//response interceptor, handle expired token
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop
      try {
        await refreshToken();
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // If refresh also fails, redirect to login
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
