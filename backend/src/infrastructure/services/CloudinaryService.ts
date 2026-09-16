import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../../domain/errors/AppError";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

export class CloudinaryService {
  async uploadImage(fileBuffer: Buffer, folder: string = "profile_photos"): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(new AppError("Failed to upload image", 500));
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject(new AppError("Unknown upload error", 500));
          }
        }
      );

      uploadStream.end(fileBuffer);
    });
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const parts = imageUrl.split('/upload/');
      if (parts.length === 2) {
        let path = parts[1];
        if (path.match(/^v\d+\//)) {
          path = path.substring(path.indexOf('/') + 1);
        }
        const publicId = path.substring(0, path.lastIndexOf('.'));
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }
    } catch (error) {
      console.error("Cloudinary Delete Error:", error);
    }
  }
}
