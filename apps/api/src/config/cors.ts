import cors, { CorsOptions } from "cors";
import { env } from "./env";

const corsOptions: CorsOptions = {
	origin: env.APP_URL,
	credentials: true,
};

export const corsMiddleware = cors(corsOptions);
