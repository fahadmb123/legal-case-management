import type { RegisterSchema, LoginFormData, ForgotPasswordFormData, ResetPasswordFormData, VerifyRegistrationFormData } from "../validations/auth";
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

  static async forgotPassword(data: ForgotPasswordFormData): Promise<{ message: string }> {
    return await AuthApi.forgotPassword(data.email);
  }

  static async resetPassword(data: ResetPasswordFormData & { email: string }): Promise<{ message: string }> {
    return await AuthApi.resetPassword({
      email: data.email,
      otp: data.otp,
      password: data.password,
    });
  }

  static async verifyRegistration(data: VerifyRegistrationFormData & { email: string }): Promise<{ message: string }> {
    return await AuthApi.verifyRegistration({
      email: data.email,
      otp: data.otp,
    });
  }
}
