import { AuthController } from "../../presentation/controllers/AuthController";
import { RegisterUseCase } from "../../application/use-cases/auth/RegisterUseCase";
import { LoginUseCase } from "../../application/use-cases/auth/LoginUseCase";
import { VerifyRegistrationUseCase } from "../../application/use-cases/auth/VerifyRegistrationUseCase";
import { PrismaUserRepository } from "../../infrastructure/database/prisma/repositories/PrismaUserRepository";
import { BcryptPasswordService } from "../../infrastructure/services/BcryptPasswordService";
import { JwtTokenService } from "../../infrastructure/services/JwtTokenService";

export const makeAuthController = (): AuthController => {
  const userRepository = new PrismaUserRepository();
  const passwordService = new BcryptPasswordService();
  const tokenService = new JwtTokenService();

  const registerUseCase = new RegisterUseCase(userRepository);
  const loginUseCase = new LoginUseCase(userRepository, passwordService, tokenService);
  const verifyRegistrationUseCase = new VerifyRegistrationUseCase(userRepository, passwordService);

  return new AuthController(registerUseCase, loginUseCase, verifyRegistrationUseCase);
};
