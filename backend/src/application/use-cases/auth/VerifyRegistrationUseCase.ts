import { AppError } from "../../../domain/errors/AppError";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository";
import type { User } from "../../../domain/entities/User";
import { otpService } from "../../../infrastructure/services/OtpService";
import type { IPasswordHasher } from "./RegisterUseCase";

export class VerifyRegistrationUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(email: string, otp: string): Promise<User> {
    const verification = otpService.verifyOtp(email, otp);
    
    if (!verification.isValid || !verification.data) {
      throw new AppError("Invalid or expired verification code", 400);
    }

    const { name, password } = verification.data;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("User with this email already exists", 409);
    }

    const passwordHash = await this.passwordHasher.hash(password);

    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash,
      createdAt: new Date(),
    };

    return this.userRepository.create(user);
  }
}
