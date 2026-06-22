import "node:http";
import type { Session } from "express-session";

declare module "node:http" {
	interface IncomingMessage {
		session: Session;
	}
}
