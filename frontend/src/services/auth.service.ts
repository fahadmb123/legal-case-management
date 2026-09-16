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
    return response;
  }

  static async login(data: LoginFormData): Promise<AuthResponse> {
    const payload = {
      email: data.email,
      password: data.password,
    };

    const response = await AuthApi.login(payload);
    return response;
  }

  static async logout(): Promise<void> {
    await AuthApi.logout();
  }
}
