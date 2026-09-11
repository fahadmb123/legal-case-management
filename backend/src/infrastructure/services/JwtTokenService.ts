import jwt from "jsonwebtoken";
import type { ITokenService } from "../../application/use-cases/auth/LoginUseCase";

export class JwtTokenService implements ITokenService {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || "fallback_secret_for_development";
  }

  generate(userId: string): string {
    return jwt.sign({ userId }, this.secret, { expiresIn: "1d" });
  }
}
