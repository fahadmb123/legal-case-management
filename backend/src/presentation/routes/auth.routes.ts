import { Router } from "express";
import { makeAuthController } from "../../main/factories/authControllerFactory";
import { validate } from "../middlewares/ValidationMiddleware";
import { registerSchema, loginSchema, verifyRegistrationSchema, forgotPasswordSchema, resetPasswordSchema } from "../validators/AuthValidators";

const authRoutes = Router();

const authController = makeAuthController();

authRoutes.post("/register", validate(registerSchema), authController.register.bind(authController));
authRoutes.post("/verify-registration", validate(verifyRegistrationSchema), authController.verifyRegistration.bind(authController));
authRoutes.post("/login", validate(loginSchema), authController.login.bind(authController));
authRoutes.post("/logout", authController.logout.bind(authController));
authRoutes.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword.bind(authController));
authRoutes.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword.bind(authController));

export { authRoutes };
