import type { Request, Response } from "express";
import { RegisterUseCase } from "../../application/use-cases/auth/RegisterUseCase";
import { LoginUseCase } from "../../application/use-cases/auth/LoginUseCase";
import { PrismaUserRepository } from "../../infrastructure/database/prisma/repositories/PrismaUserRepository";
import { BcryptPasswordService } from "../../infrastructure/services/BcryptPasswordService";
import { JwtTokenService } from "../../infrastructure/services/JwtTokenService";

export class AuthController {
  private readonly registerUseCase: RegisterUseCase;
  private readonly loginUseCase: LoginUseCase;

  constructor() {
    // Basic dependency injection setup
    const userRepository = new PrismaUserRepository();
    const passwordService = new BcryptPasswordService();
    const tokenService = new JwtTokenService();

    this.registerUseCase = new RegisterUseCase(userRepository, passwordService);
    this.loginUseCase = new LoginUseCase(userRepository, passwordService, tokenService);
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const user = await this.registerUseCase.execute(name, email, password);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.message === "User with this email already exists") {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const result = await this.loginUseCase.execute(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === "Invalid email or password") {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
}
