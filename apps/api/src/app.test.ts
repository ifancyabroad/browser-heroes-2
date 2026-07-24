import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

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
