import { AppError } from "../../../domain/errors/AppError";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository";

import type { CloudinaryService } from "../../../infrastructure/services/CloudinaryService";

export class UpdateProfilePhotoUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async execute(userId: string, photoUrl: string | null): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.profilePhoto && user.profilePhoto !== photoUrl) {
      await this.cloudinaryService.deleteImage(user.profilePhoto);
    }

    await this.userRepository.updateProfilePhoto(userId, photoUrl || "");
  }
}
