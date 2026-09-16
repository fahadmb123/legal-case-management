import { STORAGE_KEYS } from "../config/constants";
import type { RegisterSchema, LoginFormData } from "../validations/auth";
import { AuthApi, type AuthResponse } from "../api/auth.api";

export class AuthService {
  static async register(data: RegisterSchema): Promise<AuthResponse> {
    const payload = {
      name: data.fullname,
      email: data.email,
      password: data.password,
    };

    const response = await AuthApi.register(payload);
    
    if (response.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
    }
    
    return response;
  }

  static async login(data: LoginFormData): Promise<AuthResponse> {
    const payload = {
      email: data.email,
      password: data.password,
    };

    const response = await AuthApi.login(payload);

    if (response.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
    }

    return response;
  }

  static logout(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }
}
