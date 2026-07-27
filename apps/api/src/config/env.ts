import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	PORT: z.coerce.number().default(4000),
	MONGO_URI: z.string().min(1),
	SESSION_SECRET: z.string().min(1),
	APP_URL: z.url().default("http://localhost:5173"),
	TRUST_PROXY_HOPS: z.coerce.number().int().min(0).default(0),
	AWS_REGION: z.string().default("eu-west-2"),
	SES_FROM_EMAIL: z.email().default("info@browserheroes.com"),
	EMAIL_DELIVERY: z.enum(["ses", "log"]).default("log"),
});

export const env = envSchema.parse(process.env);
