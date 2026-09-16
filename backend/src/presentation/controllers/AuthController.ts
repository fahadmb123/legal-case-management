import type { Request, Response, NextFunction } from "express";
import type { IRegisterUseCase } from "../../domain/use-cases/IRegisterUseCase";
import type { ILoginUseCase } from "../../domain/use-cases/ILoginUseCase";
import type { VerifyRegistrationUseCase } from "../../application/use-cases/auth/VerifyRegistrationUseCase";
import type { ForgotPasswordUseCase } from "../../application/use-cases/auth/ForgotPasswordUseCase";
import type { ResetPasswordUseCase } from "../../application/use-cases/auth/ResetPasswordUseCase";
import type { GetCurrentUserUseCase } from "../../application/use-cases/auth/GetCurrentUserUseCase";
import type { UpdateProfilePhotoUseCase } from "../../application/use-cases/auth/UpdateProfilePhotoUseCase";
import type { CloudinaryService } from "../../infrastructure/services/CloudinaryService";
import type { AuthenticatedRequest } from "../middlewares/AuthMiddleware";

export class AuthController {
  constructor(
    private readonly registerUseCase: IRegisterUseCase,
    private readonly loginUseCase: ILoginUseCase,
    private readonly verifyRegistrationUseCase: VerifyRegistrationUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
    private readonly updateProfilePhotoUseCase: UpdateProfilePhotoUseCase,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async uploadProfilePhoto(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      if (!req.file) {
        res.status(400).json({ message: "No image file provided" });
        return;
      }
      
      const photoUrl = await this.cloudinaryService.uploadImage(req.file.buffer);
      await this.updateProfilePhotoUseCase.execute(userId, photoUrl);

      res.status(200).json({ message: "Profile photo updated", photoUrl });
    } catch (error) {
      next(error);
    }
  }

  async me(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const user = await this.getCurrentUserUseCase.execute(userId);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const result = await this.registerUseCase.execute(name, email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async verifyRegistration(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, otp } = req.body;
      const user = await this.verifyRegistrationUseCase.execute(email, otp);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await this.loginUseCase.execute(email, password);
      
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      res.status(200).json({ user: result.user });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      await this.forgotPasswordUseCase.execute(email);
      res.status(200).json({ message: "Recovery email sent" });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, otp, password } = req.body;
      await this.resetPasswordUseCase.execute(email, otp, password);
      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      next(error);
    }
  }
}
