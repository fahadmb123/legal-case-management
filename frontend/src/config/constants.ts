export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
  },
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: "token",
};
