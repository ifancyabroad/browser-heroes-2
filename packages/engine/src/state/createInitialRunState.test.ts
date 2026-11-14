import { describe, expect, it } from "vitest";
import { engineEventSchema, runStateSchema } from "../schemas";
import { applyAction } from "../actions/applyAction";
import { selectAvailableActions } from "../selectors/selectAvailableActions";
import { serializeRunState } from "../serialization/serializeRunState";
import { deserializeRunStateJson } from "../serialization/deserializeRunState";
import type { ItemInstance } from "../schemas";
import { ZONE_GROUPS } from "../systems/encounters/constants/zoneOrder";
import { createInitialRunState } from "./createInitialRunState";

const input = {
	runId: "test-run",
	seed: "test-seed",
	heroName: "Test Hero",
	classId: "warrior",
} as const;

describe("createInitialRunState", () => {
	it("returns deterministic initial state and a valid run-start event", () => {
		const input = {
			runId: "test-run",
			seed: "test-seed",
			heroName: "Mira",
			classId: "mage" as const,
		};

		const result = createInitialRunState(input);

		expect(result).toEqual(createInitialRunState(input));
		expect(result.events).toEqual([{ type: "RUN_STARTED" }]);
		expect(engineEventSchema.parse(result.events[0])).toEqual({ type: "RUN_STARTED" });
	});

	it("creates town before battle 1 with the requested identity", () => {
		const { state } = createInitialRunState(input);

		expect(runStateSchema.safeParse(state).success).toBe(true);
		expect(state.combat).toBeNull();
		expect(state.town).toMatchObject({ shopLevel: 1, rerollCount: 0 });
		expect(state.town!.shopSlots.length).toBeGreaterThan(0);
		expect(selectAvailableActions(state)).toContainEqual({ type: "ENTER_COMBAT" });
		expect(state).toMatchObject({
			id: "test-run",
			seed: "test-seed",
			phase: "town",
			battleNumber: 1,
			zoneNumber: 1,
			endlessCycle: 0,
			day: 1,
			kills: 0,
			streak: 0,
			gold: 200,
			levelUpRerolls: 5,
			hero: {
				name: "Test Hero",
				classId: "warrior",
			},
		});
		expect(ZONE_GROUPS[0]).toContain(state.zone);
		expect(state.log).toEqual([
			expect.objectContaining({
				message: "Run started for Test Hero.",
				eventType: "run_started",
			}),
		]);
	});

	it("loads an opening town and enters protected battle 1 without advancing the run", () => {
		const { state } = createInitialRunState(input);
		const loaded = deserializeRunStateJson(serializeRunState(state));
		if (!loaded.ok) {
			throw new Error(loaded.error);
		}
		const result = applyAction(loaded.state, { type: "ENTER_COMBAT" });
		expect(result.ok).toBe(true);
		expect(result.state).toMatchObject({
			phase: "combat",
			town: null,
			battleNumber: 1,
			day: 1,
			kills: 0,
			streak: 0,
			hero: loaded.state.hero,
			rngState: state.rngState,
		});
		expect(result.events).toContainEqual(
			expect.objectContaining({
				type: "COMBAT_STARTED",
				battleNumber: 1,
			}),
		);
		const combat = result.state.combat;
		expect(combat?.player.activeEffects).toEqual([
			expect.objectContaining({
				type: "modifyDamageTaken",
				operation: "multiply",
				value: 0,
				duration: { unit: "turns", remaining: 3 },
				source: expect.objectContaining({
					type: "skill",
					skillId: "adventurers_grace",
				}),
			}),
		]);
		expect(combat?.log.some(({ message }) => message.includes("Adventurer's Grace"))).toBe(
			true,
		);
	});

	it("shares starting equipment, shops, and the first enemy across run identities", () => {
		const create = (runId: string) =>
			createInitialRunState({
				runId,
				seed: "shared-seed",
				heroName: "Hero",
				classId: "warrior",
			}).state;
		const firstTown = create("first-run");
		const secondTown = create("second-run");
		expect(
			firstTown.town!.shopSlots.map(({ item, price }) => ({
				item: normalizeEquipment({ item }),
				price,
			})),
		).toEqual(
			secondTown.town!.shopSlots.map(({ item, price }) => ({
				item: normalizeEquipment({ item }),
				price,
			})),
		);
		const first = applyAction(firstTown, { type: "ENTER_COMBAT" }).state;
		const second = applyAction(secondTown, { type: "ENTER_COMBAT" }).state;

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
