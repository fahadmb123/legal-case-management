import type { Request, Response, NextFunction } from "express";
import type { IRegisterUseCase } from "../../domain/use-cases/IRegisterUseCase";
import type { ILoginUseCase } from "../../domain/use-cases/ILoginUseCase";

export class AuthController {
  constructor(private readonly registerUseCase: IRegisterUseCase,private readonly loginUseCase: ILoginUseCase) {}

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const user = await this.registerUseCase.execute(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await this.loginUseCase.execute(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
