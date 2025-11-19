import axios, { type AxiosRequestConfig } from "axios";
import queryString from "query-string";
import { refreshToken } from "./userApi";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

interface ApiResponse<T> {
  message?: string;
  data: T;
  error?: string;
}

// export axiosClient.create{}
export function post<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) {
  return axiosClient.post<ApiResponse<T>>(url, data, config);
}

export default axiosClient;
