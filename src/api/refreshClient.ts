import axios from "axios";

export const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL,
});
