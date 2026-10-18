import request from "supertest";
import { describe, expect, it, vi } from "vitest";
vi.mock("../services/worldLog.service", () => ({ getWorldLog: vi.fn().mockResolvedValue([]) }));

import { buildApp } from "../app";

describe("world log route", () => {
	it("requires a player session and accepts guests", async () => {
		const app = buildApp();
		await request(app).get("/api/world-log").expect(401);
		const response = await request(app)
			.get("/api/world-log")
			.set("x-test-user-id", "guest")
			.expect(200);
		expect(response.body).toEqual({ entries: [] });
	});
});
