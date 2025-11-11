import axios from "axios";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};


const axiosClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
});

//interceptor setup
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

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.reponse.status === 401) {
      console.warn("Unauthorized");
    }
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use()



export default axiosClient;
