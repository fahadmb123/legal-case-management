import { Router } from "express";
import { authRoutes } from "./auth.routes";

const routes = Router();

routes.use("/auth", authRoutes);

// Add other route modules here as they are created
// routes.use("/cases", casesRoutes);
// routes.use("/clients", clientsRoutes);
// routes.use("/hearings", hearingsRoutes);

export { routes };
