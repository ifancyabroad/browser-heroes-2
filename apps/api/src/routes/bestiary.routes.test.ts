import { beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";
const service = vi.hoisted(() => ({ getBestiary: vi.fn().mockResolvedValue({ entries: [] }) }));
vi.mock("../services/bestiary.service", () => service);
describe("bestiary routes", () => {
	let buildApp: typeof import("../app").buildApp;
	beforeAll(async () => {
		({ buildApp } = await import("../app"));
	});
	it("requires a session", async () => {
		await request(buildApp()).get("/api/bestiary").expect(401);
	});
	it.each(["guest-id", "registered-id"])("uses session ownership for %s", async (id) => {
		const response = await request(buildApp())
			.get("/api/bestiary?userId=someone-else")
			.set("x-test-user-id", id)
			.expect(200);
		expect(service.getBestiary).toHaveBeenLastCalledWith(id);
		expect(response.body).toEqual({ entries: [] });
	});
});
