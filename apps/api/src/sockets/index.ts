import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { env } from "../config/env";
import { sessionMiddleware } from "../config/session";
import { registerRunSocket } from "./run.socket";

export function createSocketServer(httpServer: HttpServer) {
	const io = new Server(httpServer, {
		cors: {
			origin: env.CLIENT_URL,
			credentials: true,
		},
	});

	io.engine.use(sessionMiddleware);

	io.on("connection", (socket) => {
		registerRunSocket(socket);
	});

	return io;
}
