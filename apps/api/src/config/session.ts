import session from "express-session";
import MongoStore from "connect-mongo";
import { env } from "./env";

export const sessionMiddleware = session({
	name: "bh2.sid",
	secret: env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	rolling: true,
	store: MongoStore.create({
		mongoUrl: env.MONGO_URI,
		collectionName: "sessions",
	}),
	cookie: {
		httpOnly: true,
		sameSite: env.NODE_ENV === "production" ? "none" : "lax",
		secure: env.NODE_ENV === "production",
		maxAge: 1000 * 60 * 60 * 24 * 90,
	},
});
