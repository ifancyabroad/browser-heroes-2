import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { createTestRunDocument } from "../test/createTestRun";

const runService = vi.hoisted(() => ({
	createRun: vi.fn(),
	getCurrentRunForUser: vi.fn(),
	getRunForHero: vi.fn(),
	getRunActions: vi.fn(),
	getRunForUser: vi.fn(),
}));
const engineService = vi.hoisted(() => ({
	applyRunAction: vi.fn(),
}));

vi.mock("../services/run.service", () => runService);
vi.mock("../services/engine.service", () => engineService);

describe("run routes", () => {
	let buildApp: typeof import("../app").buildApp;

	beforeAll(async () => {
		({ buildApp } = await import("../app"));
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("requires a user session for protected run routes", async () => {
		const response = await request(buildApp()).get("/api/runs/current").expect(401);

		expect(response.body).toEqual({
			error: "UNAUTHENTICATED",
			message: "A user session is required.",
		});
	});

	it("validates create-run requests before calling the service", async () => {
		const response = await request(buildApp())
			.post("/api/runs")
			.set("x-test-user-id", "user-id")
			.send({ heroName: "", classId: "not-a-class" })
			.expect(400);

		expect(response.body.error).toBe("ValidationError");
		expect(runService.createRun).not.toHaveBeenCalled();
	});

	it("creates and projects a valid run", async () => {
		const run = createTestRunDocument();
		runService.createRun.mockResolvedValue(run);

		const response = await request(buildApp())
			.post("/api/runs")
			.set("x-test-user-id", "user-id")
			.send({ heroName: "  Test Hero  ", classId: "warrior" })
			.expect(201);

		expect(runService.createRun).toHaveBeenCalledWith({
			userId: "user-id",
			heroName: "Test Hero",
			classId: "warrior",
		});
		expect(response.body.run.id).toBe("run-document-id");
	});

	it("returns null when the user has no current run", async () => {
		runService.getCurrentRunForUser.mockResolvedValue(null);

		const response = await request(buildApp())
			.get("/api/runs/current")
			.set("x-test-user-id", "user-id")
			.expect(200);

		expect(response.body).toEqual({ run: null });
	});

	it("returns 404 for a missing or unowned run", async () => {
		runService.getRunForUser.mockResolvedValue(null);

		const response = await request(buildApp())
			.get("/api/runs/missing-run")
			.set("x-test-user-id", "user-id")
			.expect(404);

		expect(runService.getRunForUser).toHaveBeenCalledWith({
			userId: "user-id",
			runId: "missing-run",
		});
		expect(response.body).toEqual({
			error: "RUN_NOT_FOUND",
			message: "Run not found.",
		});
	});

	it("rejects invalid actions before engine orchestration", async () => {
		await request(buildApp())
			.post("/api/runs/run-id/actions")
			.set("x-test-user-id", "user-id")
			.send({ action: { type: "NOT_AN_ACTION" } })
			.expect(400);

		expect(engineService.applyRunAction).not.toHaveBeenCalled();
	});

	it("submits a validated action and projects the result", async () => {
		const run = createTestRunDocument();
		const result = { ok: true, state: run.state, events: [] };
		engineService.applyRunAction.mockResolvedValue({ run, result });

		const response = await request(buildApp())
			.post("/api/runs/run-id/actions")
			.set("x-test-user-id", "user-id")
			.send({ action: { type: "PLAYER_SKIP_TURN" } })
			.expect(200);

		expect(engineService.applyRunAction).toHaveBeenCalledWith({
			userId: "user-id",
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});
		expect(response.body.result).toEqual(result);
	});

	it("strips server-owned ghost encounter data from submitted actions", async () => {
		const run = createTestRunDocument();
		const result = { ok: true, state: run.state, events: [] };
		engineService.applyRunAction.mockResolvedValue({ run, result });

		await request(buildApp())
			.post("/api/runs/run-id/actions")
			.set("x-test-user-id", "user-id")
			.send({
				action: {
					type: "ENTER_COMBAT",
					ghostEncounter: "client-controlled",
				},
			})
			.expect(200);

		expect(engineService.applyRunAction).toHaveBeenCalledWith({
			userId: "user-id",
			runId: "run-id",
			action: { type: "ENTER_COMBAT" },
		});
	});
});
