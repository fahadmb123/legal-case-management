import type { Request, Response, NextFunction } from "express";
import type { IRegisterUseCase } from "../../domain/use-cases/IRegisterUseCase";
import type { ILoginUseCase } from "../../domain/use-cases/ILoginUseCase";
import type { VerifyRegistrationUseCase } from "../../application/use-cases/auth/VerifyRegistrationUseCase";
import type { ForgotPasswordUseCase } from "../../application/use-cases/auth/ForgotPasswordUseCase";
import type { ResetPasswordUseCase } from "../../application/use-cases/auth/ResetPasswordUseCase";

export class AuthController {
  constructor(
    private readonly registerUseCase: IRegisterUseCase,
    private readonly loginUseCase: ILoginUseCase,
    private readonly verifyRegistrationUseCase: VerifyRegistrationUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase
  ) {}

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
