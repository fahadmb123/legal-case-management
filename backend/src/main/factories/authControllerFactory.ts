import { AuthController } from "../../presentation/controllers/AuthController";
import { RegisterUseCase } from "../../application/use-cases/auth/RegisterUseCase";
import { LoginUseCase } from "../../application/use-cases/auth/LoginUseCase";
import { VerifyRegistrationUseCase } from "../../application/use-cases/auth/VerifyRegistrationUseCase";
import { ForgotPasswordUseCase } from "../../application/use-cases/auth/ForgotPasswordUseCase";
import { ResetPasswordUseCase } from "../../application/use-cases/auth/ResetPasswordUseCase";
import { GetCurrentUserUseCase } from "../../application/use-cases/auth/GetCurrentUserUseCase";
import { UpdateProfilePhotoUseCase } from "../../application/use-cases/auth/UpdateProfilePhotoUseCase";
import { PrismaUserRepository } from "../../infrastructure/database/prisma/repositories/PrismaUserRepository";
import { BcryptPasswordService } from "../../infrastructure/services/BcryptPasswordService";
import { JwtTokenService } from "../../infrastructure/services/JwtTokenService";
import { CloudinaryService } from "../../infrastructure/services/CloudinaryService";

export const makeAuthController = (): AuthController => {
  const userRepository = new PrismaUserRepository();
  const passwordService = new BcryptPasswordService();
  const tokenService = new JwtTokenService();
  const cloudinaryService = new CloudinaryService();

  const registerUseCase = new RegisterUseCase(userRepository);
  const loginUseCase = new LoginUseCase(userRepository, passwordService, tokenService);
  const verifyRegistrationUseCase = new VerifyRegistrationUseCase(userRepository, passwordService);
  const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository);
  const resetPasswordUseCase = new ResetPasswordUseCase(userRepository, passwordService);
  const getCurrentUserUseCase = new GetCurrentUserUseCase(userRepository);
  const updateProfilePhotoUseCase = new UpdateProfilePhotoUseCase(userRepository, cloudinaryService);

  return new AuthController(
    registerUseCase, 
    loginUseCase, 
    verifyRegistrationUseCase,
    forgotPasswordUseCase,
    resetPasswordUseCase,
    getCurrentUserUseCase,
    updateProfilePhotoUseCase,
    cloudinaryService
  );
};
