import { ADMIN_ACTIVITY_EVENT, ADMIN_REALTIME_NAMESPACE } from "@app/shared";
import type { Server, Socket } from "socket.io";
import { UserModel } from "../models/user.model";
import { subscribeToAdminActivity } from "../notifications/adminActivity";
import { isAdminUser } from "../services/auth.service";

async function authorize(socket: Socket): Promise<boolean> {
	// Handshake session data is a snapshot: reload before sending any private data.
	try {
		await new Promise<void>((resolve, reject) => {
			socket.request.session.reload((error) => (error ? reject(error) : resolve()));
		});
		const { session } = socket.request;
		if (
			!session.userId ||
			(session.cookie.expires && new Date(session.cookie.expires).getTime() <= Date.now())
		) {
			return false;
		}
		const user = await UserModel.findById(session.userId).select("type email");
		return Boolean(user && isAdminUser(user));
	} catch {
		return false;
	}
}

export function registerAdminRealtime(io: Server): () => void {
	const namespace = io.of(ADMIN_REALTIME_NAMESPACE);
	namespace.use(async (socket, next) => {
		if (await authorize(socket)) {
			next();
		} else {
			next(new Error("Not authorized."));
		}
	});
	namespace.on("connection", (socket) => {
		// Serial delivery keeps entries ordered even while session checks are asynchronous.
		let pending = Promise.resolve();
		const unsubscribe = subscribeToAdminActivity((entries) => {
			pending = pending.then(async () => {
				if (!socket.connected) {
					return;
				}
				if (!(await authorize(socket))) {
					socket.disconnect(true);
					return;
				}
				if (!socket.connected) {
					return;
				}
				for (const entry of entries) {
					socket.emit(ADMIN_ACTIVITY_EVENT, entry);
				}
			});
			return pending;
		});
		socket.once("disconnect", unsubscribe);
	});
	return () => {
		namespace.disconnectSockets(true);
	};
}
