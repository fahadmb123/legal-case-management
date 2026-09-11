import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./presentation/routes/index";

const app: Express = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", routes);

// Healthcheck route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

export { app };
