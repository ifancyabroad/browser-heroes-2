import { createServer } from "node:http";
import { buildApp } from "./app";
import { connectDB, disconnectDB } from "./config/db";
import { env } from "./config/env";
import { createSocketServer } from "./sockets";

const SHUTDOWN_TIMEOUT_MS = 10_000;

async function main() {
	await connectDB();

	const app = buildApp();
	const httpServer = createServer(app);

	const socketServer = createSocketServer(httpServer);
	let shuttingDown = false;

	const shutdown = async (signal: NodeJS.Signals) => {
		if (shuttingDown) {
			return;
		}
		shuttingDown = true;
		console.log(`${signal} received, shutting down`);

		const forceExit = setTimeout(() => {
			console.error("Graceful shutdown timed out");
			process.exit(1);
		}, SHUTDOWN_TIMEOUT_MS);
		forceExit.unref();

		try {
			// Socket.IO also closes the HTTP server it is attached to.
			await new Promise<void>((resolve, reject) => {
				socketServer.close((error) => (error ? reject(error) : resolve()));
			});
			await disconnectDB();
			clearTimeout(forceExit);
			console.log("Shutdown complete");
		} catch (error) {
			console.error("Graceful shutdown failed", error);
			process.exit(1);
		}
	};

	process.once("SIGTERM", () => void shutdown("SIGTERM"));
	process.once("SIGINT", () => void shutdown("SIGINT"));

	httpServer.listen(env.PORT, () => {
		console.log(`🚀 API listening on port ${env.PORT}`);
	});
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
