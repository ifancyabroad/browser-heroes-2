import "dotenv/config";
import { z } from "zod";

export const envSchema = z
	.object({
		NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
		PORT: z.coerce.number().int().min(1).max(65535).default(4000),
		MONGO_URI: z.string().min(1),
		SESSION_SECRET: z.string().min(1),
		APP_URL: z.url().default("http://localhost:5173"),
		TRUST_PROXY_HOPS: z.coerce.number().int().min(0).optional(),
		SES_REGION: z.string().default("eu-west-1"),
		SES_FROM_EMAIL: z.email().default("noreply@browserheroes.com"),
		EMAIL_DELIVERY: z.enum(["ses", "log"]).default("log"),
	})
	.superRefine((values, context) => {
		if (values.NODE_ENV !== "production") {
			return;
		}

		if (values.SESSION_SECRET.length < 32) {
			context.addIssue({
				code: "custom",
				path: ["SESSION_SECRET"],
				message: "SESSION_SECRET must contain at least 32 characters in production.",
			});
		}

		if (new URL(values.APP_URL).protocol !== "https:") {
			context.addIssue({
				code: "custom",
				path: ["APP_URL"],
				message: "APP_URL must use HTTPS in production.",
			});
		}

		if (values.EMAIL_DELIVERY !== "ses") {
			context.addIssue({
				code: "custom",
				path: ["EMAIL_DELIVERY"],
				message: "EMAIL_DELIVERY must be ses in production.",
			});
		}

		if (values.TRUST_PROXY_HOPS === undefined) {
			context.addIssue({
				code: "custom",
				path: ["TRUST_PROXY_HOPS"],
				message: "TRUST_PROXY_HOPS must be set explicitly in production.",
			});
		}
	})
	.transform((values) => ({
		...values,
		TRUST_PROXY_HOPS: values.TRUST_PROXY_HOPS ?? 0,
	}));

export const env = envSchema.parse(process.env);
