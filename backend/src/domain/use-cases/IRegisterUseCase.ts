import type { User } from "../entities/User";

export interface IRegisterUseCase {
  execute(name: string, email: string, password: string): Promise<User>;
}
