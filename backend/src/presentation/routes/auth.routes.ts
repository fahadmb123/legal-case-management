import { Router } from "express";
import { makeAuthController } from "../../main/factories/authControllerFactory";
import { validate } from "../middlewares/ValidationMiddleware";
import { registerSchema, loginSchema, verifyRegistrationSchema, forgotPasswordSchema, resetPasswordSchema } from "../validators/AuthValidators";
import { requireAuth } from "../middlewares/AuthMiddleware";

const authRoutes = Router();

const authController = makeAuthController();

authRoutes.post("/register", validate(registerSchema), authController.register.bind(authController));
authRoutes.post("/verify-registration", validate(verifyRegistrationSchema), authController.verifyRegistration.bind(authController));
authRoutes.post("/login", validate(loginSchema), authController.login.bind(authController));
authRoutes.post("/logout", authController.logout.bind(authController));
authRoutes.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword.bind(authController));
authRoutes.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword.bind(authController));
authRoutes.get("/me", requireAuth, authController.me.bind(authController));

import multer from "multer";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

authRoutes.post("/profile-photo", requireAuth, upload.single("photo"), authController.uploadProfilePhoto.bind(authController));

export { authRoutes };
