import type { IUserRepository } from "../../../domain/repositories/IUserRepository";
import type { ILoginUseCase, LoginResult } from "../../../domain/use-cases/ILoginUseCase";

export interface IPasswordVerifier {
  verify(password: string, passwordHash: string): Promise<boolean>
}

export interface ITokenService {
  generate(userId: string): string
}

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordVerifier: IPasswordVerifier,
    private readonly tokenService: ITokenService
  ) {}

    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email)

        if (!user) throw new Error("Invalid email or password")
        

        const isPasswordValid = await this.passwordVerifier.verify(
            password,
            user.passwordHash
        )

        if (!isPasswordValid) throw new Error("Invalid email or password")

        const token = this.tokenService.generate(user.id)

        return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
        }
    }
}