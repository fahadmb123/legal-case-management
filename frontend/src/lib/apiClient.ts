import axios from "axios";
import { ENV } from "../config/constants";

// withCredentials: true ensures cookies are automatically sent with every request
export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
