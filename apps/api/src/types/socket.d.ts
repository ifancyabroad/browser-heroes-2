import "node:http";
import type { Session, SessionData } from "express-session";

declare module "node:http" {
	interface IncomingMessage {
		session: Session & Partial<SessionData>;
	}
}
