import { createServer } from "node:http";
import { buildApp } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { createSocketServer } from "./sockets";

async function main() {
	await connectDB();

	const app = buildApp();
	const httpServer = createServer(app);

	createSocketServer(httpServer);

	app.listen(env.PORT, () => {
		console.log(`🚀 API listening on port ${env.PORT}`);
	});
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
