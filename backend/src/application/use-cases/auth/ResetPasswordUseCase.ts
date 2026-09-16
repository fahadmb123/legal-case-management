import { AppError } from "../../../domain/errors/AppError";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { otpService } from "../../../infrastructure/services/OtpService";
import type { IPasswordHasher } from "./RegisterUseCase"; // Re-using the interface

export class ResetPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(email: string, otp: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid reset attempt.", 400);
    }

    const verification = otpService.verifyOtp(email, otp);
    
    // Check if the OTP was meant for reset_password flow and is valid
    if (!verification.isValid || verification.data !== "reset_password") {
      throw new AppError("Invalid or expired verification code.", 400);
    }

    const newHash = await this.passwordHasher.hash(newPassword);
    
    await this.userRepository.updatePassword(user.id, newHash);
  }
}
