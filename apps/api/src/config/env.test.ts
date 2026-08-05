import { describe, expect, it } from "vitest";
import { envSchema } from "./env";

const productionEnv = {
	NODE_ENV: "production",
	MONGO_URI: "mongodb://database.example/browser-heroes",
	SESSION_SECRET: "a-secure-session-secret-with-32-characters",
	APP_URL: "https://browserheroes.com",
	TRUST_PROXY_HOPS: "1",
	EMAIL_DELIVERY: "ses",
};

describe("environment configuration", () => {
	it("retains development defaults", () => {
		const parsed = envSchema.parse({
			MONGO_URI: "mongodb://localhost/browser-heroes",
			SESSION_SECRET: "local-secret",
		});

		expect(parsed).toMatchObject({
			NODE_ENV: "development",
			PORT: 4000,
			APP_URL: "http://localhost:5173",
			TRUST_PROXY_HOPS: 0,
			EMAIL_DELIVERY: "log",
		});
	});

	it("accepts an explicit production configuration", () => {
		expect(envSchema.parse(productionEnv)).toMatchObject({
			NODE_ENV: "production",
			TRUST_PROXY_HOPS: 1,
			EMAIL_DELIVERY: "ses",
		});
	});

	it.each([
		["a strong session secret", { SESSION_SECRET: "too-short" }],
		["an HTTPS application URL", { APP_URL: "http://browserheroes.com" }],
		["SES email delivery", { EMAIL_DELIVERY: "log" }],
		["an explicit proxy-hop count", { TRUST_PROXY_HOPS: undefined }],
	])("requires %s in production", (_requirement, override) => {
		expect(() => envSchema.parse({ ...productionEnv, ...override })).toThrow();
	});
});
