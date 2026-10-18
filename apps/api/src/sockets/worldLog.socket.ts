import type { Server, Socket } from "socket.io";
import { subscribeToWorldLog } from "../notifications/worldLog";

const WORLD_LOG_ROOM = "world-log";

export function registerWorldLogSocket(socket: Socket): void {
	if (socket.request.session.userId) {
		void socket.join(WORLD_LOG_ROOM);
	}
}

export function subscribeWorldLogBroadcast(io: Server): () => void {
	return subscribeToWorldLog((entry) => {
		io.to(WORLD_LOG_ROOM).emit("world-log:entry", entry);
	});
}
