import axiosClient from "./axiosClient";
import { refreshClient } from "./refreshClient";

const BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

export async function refreshToken() {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const res = await refreshClient.post("/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    const newToken = res.data.accessToken;
    localStorage.setItem("accessToken", newToken);

    processQueue(null, newToken);
    return newToken;
  } catch (err) {
    processQueue(err, null);
    throw err;
  } finally {
    isRefreshing = false;
  }
}

export const loginGoogle = async () => {
  const res = await axiosClient.get(`${import.meta.env.VITE_URL}/google`);
  return res;
};

export const loginWithId = async (username: string, password: string) => {
  try {
    const res = await axiosClient.post(`${BASE_URL}/loginID`, {
      username,
      password,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// interface User {
//   id: string;
//   username: string;
// }

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    // const res = await post<User>(`${BASE_URL}/register`, {
    //   username,
    //   email,
    //   password,
    //   confirmPassword,
    // });
    // res.data.data.username;
    const res = await axiosClient.post(`${BASE_URL}/register`, {
      username,
      email,
      password,
      confirmPassword,
    });
    return res.status;
  } catch (error) {
    return error;
  }
};

export const changePassword = async (password: string, newpassword: string) => {
  try {
    const res = await axiosClient.post(`${BASE_URL}/changepw`, {
      password,
      newpassword,
    });
    return res.data.result;
  } catch (error) {
    return error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axiosClient.post(`${BASE_URL}/logout`);
    return res.data.result;
  } catch (error) {
    return error;
  }
};

export const resetPassword = async (data: { email: string }) => {
  try {
    const res = await axiosClient.post(`${BASE_URL}/forgotpw`, data);
    return res.data.result;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (token: string, newPassword: string) => {
  try {
    const res = await axiosClient.post(`${BASE_URL}/resetpw/${token}`, {
      newPassword,
    });
    return res.data.result;
  } catch (error) {
    return error;
  }
};

export const handleRedirect = async () => {
  try {
    const res = await axiosClient.get(`${BASE_URL}/google/callback`);
    return res.data.result;
  } catch (error) {
    return error;
  }
};
