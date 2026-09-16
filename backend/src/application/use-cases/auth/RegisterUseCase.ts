import { AppError } from "../../../domain/errors/AppError";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository";
import type { User } from "../../../domain/entities/User";
import type { IRegisterUseCase } from "../../../domain/use-cases/IRegisterUseCase";

import { otpService } from "../../../infrastructure/services/OtpService";

export interface IPasswordHasher {
  hash(password: string): Promise<string>;
}

export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
  ) {}

    async execute(name: string,email: string,password: string): Promise<{ message: string }> {

        const existingUser = await this.userRepository.findByEmail(email)

        if (existingUser) throw new AppError("User with this email already exists", 409)

        otpService.generateOtp(email, { name, password });

        return { message: "OTP sent to email" };
    }
}