import mongoose from "mongoose";
import { beforeEach, describe, expect, it, vi } from "vitest";

const models = vi.hoisted(() => ({
	run: {
		updateMany: vi.fn(),
		create: vi.fn(),
		findOne: vi.fn(),
		exists: vi.fn(),
	},
	action: {
		find: vi.fn(),
	},
}));
const engine = vi.hoisted(() => ({
	createInitialRunState: vi.fn(),
}));
const profanity = vi.hoisted(() => ({
	check: vi.fn(),
}));

vi.mock("../models/run.model", () => ({ RunModel: models.run }));
vi.mock("../models/runAction.model", () => ({ RunActionModel: models.action }));
vi.mock("@app/engine", async (importOriginal) => ({
	...(await importOriginal<typeof import("@app/engine")>()),
	createInitialRunState: engine.createInitialRunState,
}));
vi.mock("leo-profanity", () => ({ default: profanity }));

import {
	createRun,
	getCurrentRunForUser,
	getRunActions,
	getRunForHero,
	getRunForUser,
} from "./run.service";

const actualEngine = await vi.importActual<typeof import("@app/engine")>("@app/engine");
const testRunState = actualEngine.createInitialRunState({
	runId: "test-run",
	seed: "test-seed",
	heroName: "Test Hero",
	classId: "warrior",
});

describe("run.service", () => {
	const session = { id: "session" };

	beforeEach(() => {
		vi.clearAllMocks();
		vi.spyOn(mongoose.connection, "transaction").mockImplementation(async (callback) =>
			callback(session as never),
		);
		engine.createInitialRunState.mockReturnValue(testRunState);
		profanity.check.mockReturnValue(false);
		models.run.updateMany.mockResolvedValue({});
		models.run.create.mockResolvedValue([{ _id: "created-run" }]);
	});

	it("normalizes the hero name and creates a run transactionally", async () => {
		const created = await createRun({
			userId: "user-id",
			body: { heroName: "  tEST  ", classId: "warrior" },
		});

		expect(models.run.updateMany).toHaveBeenCalledWith(
			{ userId: "user-id", status: "active" },
			{ $set: { status: "abandoned", completedAt: expect.any(Date) } },
			{ session },
		);
		expect(engine.createInitialRunState).toHaveBeenCalledWith({
			runId: expect.any(String),
			seed: expect.any(String),
			heroName: "Test",
			classId: "warrior",
		});
		expect(models.run.create).toHaveBeenCalledWith(
			[
				expect.objectContaining({
					userId: "user-id",
					status: "active",
					state: testRunState,
					summary: expect.objectContaining({ heroName: "Test Hero" }),
				}),
			],
			{ session },
		);
		expect(created).toEqual({ _id: "created-run" });
	});

	it.each([
		["   ", "Hero name is required."],
		["123", "Hero name can only contain letters."],
		["thisnameisfarbeyondtheallowedheronamelength", "characters or fewer"],
	])("rejects invalid hero name %j", async (heroName, message) => {
		await expect(
			createRun({ userId: "user-id", body: { heroName, classId: "warrior" } }),
		).rejects.toThrow(message);

		expect(mongoose.connection.transaction).not.toHaveBeenCalled();
	});

	it("rejects profane hero names", async () => {
		profanity.check.mockReturnValue(true);

		await expect(
			createRun({
				userId: "user-id",
				body: { heroName: "Forbidden", classId: "warrior" },
			}),
		).rejects.toMatchObject({ message: "Hero name is not allowed.", status: 400 });
	});

	it("queries the latest active run for a user", async () => {
		const sort = vi.fn().mockReturnValue("query");
		models.run.findOne.mockReturnValue({ sort });

		await expect(getCurrentRunForUser("user-id")).resolves.toBe("query");
		expect(models.run.findOne).toHaveBeenCalledWith({
			userId: "user-id",
			status: "active",
		});
		expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
	});

	it("queries a run by both id and owner", async () => {
		models.run.findOne.mockReturnValue("run");

		await expect(getRunForUser({ userId: "user-id", runId: "run-id" })).resolves.toBe("run");
		expect(models.run.findOne).toHaveBeenCalledWith({
			_id: "run-id",
			userId: "user-id",
		});
	});

	it("does not query public heroes for invalid object ids", async () => {
		await expect(getRunForHero("invalid")).resolves.toBeNull();
		expect(models.run.findOne).not.toHaveBeenCalled();
	});

	it("only exposes completed dead or retired heroes", async () => {
		const runId = new mongoose.Types.ObjectId().toString();
		models.run.findOne.mockReturnValue("run");

		await expect(getRunForHero(runId)).resolves.toBe("run");
		expect(models.run.findOne).toHaveBeenCalledWith({
			_id: runId,
			status: { $in: ["dead", "retired"] },
			completedAt: { $ne: null },
		});
	});

	it("rejects action history requests for missing or unowned runs", async () => {
		models.run.exists.mockResolvedValue(false);

		await expect(getRunActions({ userId: "user-id", runId: "run-id" })).rejects.toThrow(
			"RUN_NOT_FOUND",
		);
		expect(models.action.find).not.toHaveBeenCalled();
	});

	it("returns action history in sequence order", async () => {
		const lean = vi.fn().mockReturnValue(["action"]);
		const sort = vi.fn().mockReturnValue({ lean });
		models.run.exists.mockResolvedValue(true);
		models.action.find.mockReturnValue({ sort });

		await expect(getRunActions({ userId: "user-id", runId: "run-id" })).resolves.toEqual([
			"action",
		]);
		expect(models.action.find).toHaveBeenCalledWith({
			runId: "run-id",
			userId: "user-id",
		});
		expect(sort).toHaveBeenCalledWith({ sequence: 1 });
	});
});
