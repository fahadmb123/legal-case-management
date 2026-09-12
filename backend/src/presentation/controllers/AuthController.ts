import type { Request, Response } from "express";
import type { IRegisterUseCase } from "../../domain/use-cases/IRegisterUseCase";
import type { ILoginUseCase } from "../../domain/use-cases/ILoginUseCase";

export class AuthController {
  constructor(
    private readonly registerUseCase: IRegisterUseCase,
    private readonly loginUseCase: ILoginUseCase
  ) {}

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
