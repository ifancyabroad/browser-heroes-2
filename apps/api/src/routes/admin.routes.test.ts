import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
	findUser: vi.fn(),
	getOverview: vi.fn(),
	getPlayers: vi.fn(),
	getRuns: vi.fn(),
	getClasses: vi.fn(),
	getEnemies: vi.fn(),
	getSkills: vi.fn(),
}));

vi.mock("../models/user.model", () => ({ UserModel: { findOne: mocks.findUser } }));
vi.mock("../services/adminMetrics.service", () => ({
	getAdminMetricsOverview: mocks.getOverview,
	getAdminPlayerMetrics: mocks.getPlayers,
	getAdminRunMetrics: mocks.getRuns,
	getAdminClassMetrics: mocks.getClasses,
	getAdminEnemyMetrics: mocks.getEnemies,
	getAdminSkillMetrics: mocks.getSkills,
}));

describe("admin routes", () => {
	let buildApp: typeof import("../app").buildApp;
	let env: typeof import("../config/env").env;
	let originalAdminEmail: string | undefined;

	beforeAll(async () => {
		({ buildApp } = await import("../app"));
		({ env } = await import("../config/env"));
		originalAdminEmail = env.ADMIN_EMAIL;
	});

	afterAll(() => {
		env.ADMIN_EMAIL = originalAdminEmail;
	});

	beforeEach(() => {
		vi.clearAllMocks();
		env.ADMIN_EMAIL = "admin@example.com";
		mocks.findUser.mockReturnValue({
			select: vi.fn().mockResolvedValue({ _id: "admin-id" }),
		});
		mocks.getOverview.mockResolvedValue({ players: {}, runs: {}, daily: [], progression: [] });
		mocks.getPlayers.mockResolvedValue({ totals: {}, daily: [], types: [], retention: [] });
		mocks.getRuns.mockResolvedValue({ totals: {}, daily: [], depth: [], modes: [] });
		mocks.getClasses.mockResolvedValue({ classes: [] });
		mocks.getEnemies.mockResolvedValue({ enemies: [] });
		mocks.getSkills.mockResolvedValue({ skills: [] });
	});

	it("requires an authenticated session", async () => {
		await request(buildApp()).get("/api/admin/metrics/overview").expect(401);
		expect(mocks.findUser).not.toHaveBeenCalled();
	});

	it("rejects accounts outside the allowlist", async () => {
		mocks.findUser.mockReturnValue({ select: vi.fn().mockResolvedValue(null) });

		await request(buildApp())
			.get("/api/admin/metrics/overview")
			.set("x-test-user-id", "other-user")
			.expect(403);

		expect(mocks.findUser).toHaveBeenCalledWith({
			_id: "other-user",
			type: "registered",
			email: "admin@example.com",
		});
		expect(mocks.getOverview).not.toHaveBeenCalled();
	});

	it("keeps endpoints inaccessible when no admin is configured", async () => {
		env.ADMIN_EMAIL = undefined;

		await request(buildApp())
			.get("/api/admin/metrics/overview")
			.set("x-test-user-id", "admin-id")
			.expect(403);
	});

	it("applies the default metrics range", async () => {
		await request(buildApp())
			.get("/api/admin/metrics/overview")
			.set("x-test-user-id", "admin-id")
			.expect(200);

		expect(mocks.getOverview).toHaveBeenCalledWith(
			expect.objectContaining({
				from: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
				to: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
			}),
		);
	});

	it("forwards class metric filters", async () => {
		await request(buildApp())
			.get("/api/admin/metrics/classes?from=2026-08-01&to=2026-08-07&mode=normal")
			.set("x-test-user-id", "admin-id")
			.expect(200);

		expect(mocks.getClasses).toHaveBeenCalledWith({
			from: "2026-08-01",
			to: "2026-08-07",
			mode: "normal",
		});
	});

	it("forwards run metric filters", async () => {
		await request(buildApp())
			.get("/api/admin/metrics/runs?from=2026-08-01&to=2026-08-07&mode=normal")
			.set("x-test-user-id", "admin-id")
			.expect(200);

		expect(mocks.getRuns).toHaveBeenCalledWith({
			from: "2026-08-01",
			to: "2026-08-07",
			mode: "normal",
		});
	});

	it("forwards player metric filters", async () => {
		await request(buildApp())
			.get("/api/admin/metrics/players?from=2026-08-01&to=2026-08-07&mode=normal")
			.set("x-test-user-id", "admin-id")
			.expect(200);

		expect(mocks.getPlayers).toHaveBeenCalledWith({
			from: "2026-08-01",
			to: "2026-08-07",
			mode: "normal",
		});
	});

	it("forwards enemy metric filters", async () => {
		await request(buildApp())
			.get(
				"/api/admin/metrics/enemies?from=2026-08-01&to=2026-08-07&mode=normal&classId=mage&encounterType=boss&battleFrom=11&battleTo=20&minCombats=5",
			)
			.set("x-test-user-id", "admin-id")
			.expect(200);

		expect(mocks.getEnemies).toHaveBeenCalledWith({
			from: "2026-08-01",
			to: "2026-08-07",
			mode: "normal",
			classId: "mage",
			encounterType: "boss",
			battleFrom: 11,
			battleTo: 20,
			minCombats: 5,
		});
	});

	it("forwards skill metric filters", async () => {
		await request(buildApp())
			.get("/api/admin/metrics/skills?from=2026-08-01&to=2026-08-07&mode=normal")
			.set("x-test-user-id", "admin-id")
			.expect(200);

		expect(mocks.getSkills).toHaveBeenCalledWith({
			from: "2026-08-01",
			to: "2026-08-07",
			mode: "normal",
		});
	});

	it("rejects invalid metric filters", async () => {
		await request(buildApp())
			.get("/api/admin/metrics/overview?from=2026-08-08&to=2026-08-01")
			.set("x-test-user-id", "admin-id")
			.expect(400);

		expect(mocks.getOverview).not.toHaveBeenCalled();
	});
});
