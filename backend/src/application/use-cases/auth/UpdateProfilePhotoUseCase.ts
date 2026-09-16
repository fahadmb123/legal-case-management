import { AppError } from "../../../domain/errors/AppError";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class UpdateProfilePhotoUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string, photoUrl: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    await this.userRepository.updateProfilePhoto(userId, photoUrl);
  }
}
