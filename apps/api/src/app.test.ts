import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { env } from "./config/env";

describe("buildApp", () => {
	let buildApp: typeof import("./app").buildApp;

	beforeAll(async () => {
		({ buildApp } = await import("./app"));
	});

	it("returns the health response with security headers", async () => {
		const response = await request(buildApp()).get("/api/health").expect(200);

		expect(response.body).toEqual({ ok: true, service: "browser-heroes-api" });
		expect(response.headers["x-content-type-options"]).toBe("nosniff");
	});

	it("does not trust forwarded addresses without configured proxy hops", () => {
		expect(buildApp().get("trust proxy")).toBe(false);
	});

	it("trusts the configured number of proxy hops", () => {
		const originalHops = env.TRUST_PROXY_HOPS;
		env.TRUST_PROXY_HOPS = 2;

		try {
			expect(buildApp().get("trust proxy")).toBe(2);
		} finally {
			env.TRUST_PROXY_HOPS = originalHops;
		}
	});

	it("returns the standard JSON response for unknown routes", async () => {
		const response = await request(buildApp()).get("/api/missing").expect(404);

		expect(response.body).toEqual({ error: "Not Found" });
	});

	it("returns a client error for malformed JSON", async () => {
		const response = await request(buildApp())
			.post("/api/auth/guest")
			.set("Content-Type", "application/json")
			.send("{")
			.expect(400);

		expect(response.body).toHaveProperty("error");
	});
});
