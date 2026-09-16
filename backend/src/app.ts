import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./presentation/routes/index";
import { errorHandler } from "./presentation/middlewares/ErrorHandler";

const app: Express = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Simple request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api", routes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

app.use(errorHandler);

export { app };
