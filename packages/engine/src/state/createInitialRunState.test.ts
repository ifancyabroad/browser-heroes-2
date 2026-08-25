import { describe, expect, it } from "vitest";
import { runStateSchema } from "../schemas";
import type { ItemInstance } from "../schemas";
import { createTestRunState } from "../test/createTestRunState";
import { createInitialRunState } from "./createInitialRunState";

describe("createInitialRunState", () => {
	it("creates the same state for identical inputs", () => {
		expect(createTestRunState()).toEqual(createTestRunState());
	});

	it("creates a valid initial combat state with the requested identity", () => {
		const state = createTestRunState();

		expect(runStateSchema.safeParse(state).success).toBe(true);
		expect(state.town).toBeNull();
		expect(state).toMatchObject({
			id: "test-run",
			seed: "test-seed",
			phase: "combat",
			battleNumber: 1,
			zoneNumber: 1,
			endlessCycle: 0,
			levelUpRerolls: 5,
			hero: {
				name: "Test Hero",
				classId: "warrior",
			},
		});
		expect(state.log).toEqual([
			expect.objectContaining({
				message: "Run started for Test Hero.",
				eventType: "run_started",
			}),
		]);
	});

	it("shares starting equipment and the first enemy across run identities", () => {
		const create = (runId: string) =>
			createInitialRunState({
				runId,
				seed: "shared-seed",
				heroName: "Hero",
				classId: "warrior",
			});
		const first = create("first-run");
		const second = create("second-run");

		expect(normalizeEquipment(first.hero.equipment)).toEqual(
			normalizeEquipment(second.hero.equipment),
		);
		expect(first.combat?.enemy.sourceId).toBe(second.combat?.enemy.sourceId);
		expect(first.rngState).toEqual(second.rngState);
	});
});

function normalizeEquipment(equipment: Record<string, ItemInstance | null>) {
	return Object.values(equipment).map((item) => {
		if (!item) {
			return null;
		}

		return item.type === "static"
			? { type: item.type, itemId: item.itemId }
			: { type: item.type, item: item.item };
	});
}
