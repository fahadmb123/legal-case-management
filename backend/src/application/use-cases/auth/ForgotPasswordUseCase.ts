import { AppError } from "../../../domain/errors/AppError";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { otpService } from "../../../infrastructure/services/OtpService";

export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("No advocate found with this official email.", 404);
    }

    await otpService.generateOtp(email, "reset_password");
  }
}
