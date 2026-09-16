import axios from "axios";
import { ENV, STORAGE_KEYS } from "../config/constants";

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized API call detected. Token may be expired.");
    }
    
    const errorMessage = error.response?.data?.error || error.message || "An unexpected error occurred.";
    
    return Promise.reject(new Error(errorMessage));
  }
);
