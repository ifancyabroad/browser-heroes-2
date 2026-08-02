import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { apiBaselineLimit, registrationLimit } from "./rateLimits";

describe("rate limits", () => {
	it("applies a relaxed API baseline with tighter endpoint limits and a health exemption", async () => {
		const app = express();

		app.use(apiBaselineLimit);
		app.get("/ordinary", (_req, res) => res.status(200).json({ ok: true }));
		app.post("/register", registrationLimit, (_req, res) => res.status(201).json({ ok: true }));
		app.get("/health", (_req, res) => res.status(200).json({ ok: true }));

		for (let attempt = 0; attempt < 5; attempt += 1) {
			await request(app).post("/register").expect(201);
		}

		await request(app).post("/register").expect(429);

		const ordinaryResponse = await request(app).get("/ordinary").expect(200);
		expect(ordinaryResponse.headers.ratelimit).toBeDefined();

		const successfulOrdinaryRequests = Array.from({ length: 293 }, () =>
			request(app).get("/ordinary"),
		);
		const responses = await Promise.all(successfulOrdinaryRequests);
		expect(responses.every((response) => response.status === 200)).toBe(true);

		await request(app).get("/ordinary").expect(429);
		await request(app).get("/health").expect(200);
	});
});
