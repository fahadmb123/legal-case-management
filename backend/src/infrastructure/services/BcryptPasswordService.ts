import bcrypt from "bcrypt";
import type { IPasswordHasher } from "../../application/use-cases/auth/RegisterUseCase";
import type { IPasswordVerifier } from "../../application/use-cases/auth/LoginUseCase";

export class BcryptPasswordService implements IPasswordHasher, IPasswordVerifier {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async verify(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
