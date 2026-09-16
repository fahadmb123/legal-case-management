import { Router } from "express";
import { makeAuthController } from "../../main/factories/authControllerFactory";
import { validate } from "../middlewares/ValidationMiddleware";
import { registerSchema, loginSchema, verifyRegistrationSchema } from "../validators/AuthValidators";

const authRoutes = Router();

const authController = makeAuthController();

authRoutes.post("/register", validate(registerSchema), authController.register.bind(authController));
authRoutes.post("/verify-registration", validate(verifyRegistrationSchema), authController.verifyRegistration.bind(authController));
authRoutes.post("/login", validate(loginSchema), authController.login.bind(authController));
authRoutes.post("/logout", authController.logout.bind(authController));

export { authRoutes };
