export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    VERIFY_REGISTRATION: '/auth/verify-registration',
    LOGIN: '/auth/login',
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
};
