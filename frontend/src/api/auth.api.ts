import { apiClient } from "../lib/apiClient";
import { API_ENDPOINTS } from "../config/constants";

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  otp: string;
  password: string;
}

export class AuthApi {
  static async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, payload);
    return response.data;
  }

  static async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);
    return response.data;
  }

  static async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  static async forgotPassword(email: string): Promise<{ message: string }> {
    // Note: Backend might not be implemented yet.
    const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  }

  static async resetPassword(payload: ResetPasswordPayload): Promise<{ message: string }> {
    // Note: Backend might not be implemented yet.
    const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, payload);
    return response.data;
  }
}
