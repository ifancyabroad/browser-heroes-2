import express from "express";
import helmet from "helmet";
import compression from "compression";
import { corsMiddleware } from "./config/cors";
import { sessionMiddleware } from "./config/session";
import { routes } from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/error";
import { env } from "./config/env";

export function buildApp() {
	const app = express();

	if (env.TRUST_PROXY_HOPS > 0) {
		app.set("trust proxy", env.TRUST_PROXY_HOPS);
	}

	// Basic security headers
	app.use(helmet());
	// Simple CORS
	app.use(corsMiddleware);
	// JSON parsing
	app.use(express.json());
	// gzip responses
	app.use(compression());
	// Session management
	app.use(sessionMiddleware);

	// Routes
	app.use("/api", routes);

	// 404 + errors
	app.use(notFoundHandler);
	app.use(errorHandler);

	return app;
}
