import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { env } from "../config/env";
import { sessionMiddleware } from "../config/session";
import { registerRunSocket } from "./run.socket";
import { registerWorldLogSocket, subscribeWorldLogBroadcast } from "./worldLog.socket";

export function createSocketServer(httpServer: HttpServer) {
	const io = new Server(httpServer, {
		maxHttpBufferSize: 100_000,
		cors: {
			origin: env.APP_URL,
			credentials: true,
		},
	});

	io.engine.use(sessionMiddleware);

	const unsubscribeWorldLog = subscribeWorldLogBroadcast(io);
	httpServer.once("close", unsubscribeWorldLog);

	io.on("connection", (socket) => {
		registerRunSocket(socket);
		registerWorldLogSocket(socket);
	});

	return io;
}
