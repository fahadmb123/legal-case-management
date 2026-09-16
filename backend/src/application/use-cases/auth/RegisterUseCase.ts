import { AppError } from "../../../domain/errors/AppError";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository";
import type { User } from "../../../domain/entities/User";
import type { IRegisterUseCase } from "../../../domain/use-cases/IRegisterUseCase";

export interface IPasswordHasher {
  hash(password: string): Promise<string>;
}

export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

    async execute(name: string,email: string,password: string): Promise<User> {

        const existingUser = await this.userRepository.findByEmail(email)

        if (existingUser) throw new AppError("User with this email already exists", 409)

        const passwordHash = await this.passwordHasher.hash(password)

        const user: User = {
        id: crypto.randomUUID(),
        name,
        email,
        passwordHash,
        createdAt: new Date(),
        };

        return this.userRepository.create(user)
    }
}