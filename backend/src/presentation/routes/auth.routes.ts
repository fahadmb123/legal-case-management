import { Router } from "express";
import { makeAuthController } from "../../main/factories/authControllerFactory";

const authRoutes = Router();

const authController = makeAuthController();

authRoutes.post("/register", authController.register.bind(authController));
authRoutes.post("/login", authController.login.bind(authController));

export { authRoutes };
