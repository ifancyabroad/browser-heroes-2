import { enemies } from "@app/content";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createContextRngState } from "../../../core/rng";
import { createInitialRunState } from "../../../state/createInitialRunState";
import { selectCombatView } from "../../../selectors/selectCombatView";
import { selectTownView } from "../../../selectors/selectTownView";
import { deserializeRunStateJson } from "../../../serialization/deserializeRunState";
import { createCombat } from "../../combat/createCombat";
import { enterCombat } from "../../combat/enterCombat";
import { continueToNextCombat } from "../../progression/continueToNextCombat";
import { returnToTown } from "../../town/returnToTown";
import { selectZone } from "./selectZone";
import * as zoneOptions from "./getZoneOptions";

// Exercise alternatives using existing content, without adding a production zone.
vi.mock("../constants/zoneOrder", async (importOriginal) => {
	const original = await importOriginal<typeof import("../constants/zoneOrder")>();
	return { ...original, ZONE_GROUPS: [["forest", "plains"], ...original.ZONE_GROUPS.slice(1)] };
});

afterEach(() => vi.restoreAllMocks());

function createRun(seed = "2") {
	return createInitialRunState({
		runId: "zone-test",
		seed,
		heroName: "Hero",
		classId: "warrior",
	});
}

function chooseZone(seed: string, zoneNumber: number) {
	return selectZone(zoneNumber, createContextRngState(seed, "zone", zoneNumber));
}

describe("seeded zone alternatives", () => {
	it("stores a deterministic initial choice and allows fresh choices in endless cycles", () => {
		const choices = new Set<string>();
		let changesInEndless = false;
		for (let i = 0; i < 50; i++) {
			const seed = String(i);
			const state = createRun(seed);
			expect(["forest", "plains"]).toContain(state.zone);
			expect(createRun(seed).zone).toBe(state.zone);
			expect(state.zone).toBe(chooseZone(seed, 1));
			choices.add(state.zone);
			changesInEndless ||= chooseZone(seed, 11) !== state.zone;
		}
		expect(choices.size).toBe(2);
		expect(changesInEndless).toBe(true);
	});

	it("uses the stored zone for standard enemies, bosses, and views", () => {
		const state = createRun();
		// Use the other alternative to catch any accidental reselection from the seed.
		const zone = state.zone === "forest" ? "plains" : "forest";
		for (let battleNumber = 1; battleNumber <= 10; battleNumber++) {
			const combat = createCombat({
				runId: state.id,
				seed: state.seed,
				hero: state.hero,
				battleNumber,
				zoneNumber: 1,
				zone,
				endlessCycle: 0,
			});
			expect(combat).not.toBeNull();
			expect(
				enemies.find((enemy) => enemy.id === combat!.enemy.sourceId)?.encounter.zone,
			).toBe(zone);
			expect(combat!.encounterType).toBe(battleNumber === 10 ? "boss" : "standard");
			expect(selectCombatView({ ...state, battleNumber, zone, combat })?.zone).toBe(zone);
		}
	});

	it.each([9, 10, 99, 100, 109, 110])(
		"advances consistently from battle %i via town or direct combat",
		(battleNumber) => {
			const state = createRun();
			state.battleNumber = battleNumber;
			state.zoneNumber = Math.ceil(battleNumber / 10);
			state.endlessCycle = Math.floor((battleNumber - 1) / 100);
			state.zone = chooseZone(state.seed, state.zoneNumber);
			state.combat!.status = "player_won";
			state.combat!.enemy.currentHp = 0;
			const direct = continueToNextCombat(state);
			const town = returnToTown({ ...state, rngState: { value: 12345 } });
			if (!direct.ok || !town.ok) {
				throw new Error("Expected successful transitions");
			}
			const zoneNumber = Math.ceil((battleNumber + 1) / 10);
			const zone = chooseZone(state.seed, zoneNumber);
			for (const result of [direct, town]) {
				expect(result.state).toMatchObject({
					battleNumber: battleNumber + 1,
					zoneNumber,
					zone,
					endlessCycle: Math.floor(battleNumber / 100),
				});
			}
			expect(direct.state.rngState).toEqual(state.rngState);
			expect(selectTownView(town.state)?.zone).toBe(zone);
			const loaded = deserializeRunStateJson(JSON.stringify(town.state));
			if (!loaded.ok) {
				throw new Error(loaded.error);
			}
			const entered = enterCombat(loaded.state);
			if (!entered.ok) {
				throw new Error("Expected combat after loading");
			}
			expect(entered.state.zone).toBe(zone);
			expect(entered.state.combat!.enemy.sourceId).toBe(direct.state.combat!.enemy.sourceId);
			expect(entered.state.rngState).toEqual({ value: 12345 });
		},
	);

	it("preserves the selected zone after options change, including town and ghost encounters", () => {
		const state = createRun();
		state.combat!.status = "player_won";
		state.combat!.enemy.currentHp = 0;
		vi.spyOn(zoneOptions, "getZoneOptions").mockReturnValue(["castle"]);
		const loaded = deserializeRunStateJson(JSON.stringify(state));
		if (!loaded.ok) {
			throw new Error(loaded.error);
		}
		expect(selectCombatView(loaded.state)?.zone).toBe(state.zone);
		const direct = continueToNextCombat(loaded.state);
		const town = returnToTown(loaded.state);
		if (!direct.ok || !town.ok) {
			throw new Error("Expected successful transitions");
		}
		expect(direct.state.zone).toBe(state.zone);
		expect(
			enemies.find((enemy) => enemy.id === direct.state.combat!.enemy.sourceId)?.encounter
				.zone,
		).toBe(state.zone);
		expect(selectTownView(town.state)?.zone).toBe(state.zone);
		const ghost = enterCombat(town.state, {
			ghostId: "ghost",
			ghostUsername: "Ghost",
			ghostSource: "player",
			hero: state.hero,
		});
		if (!ghost.ok) {
			throw new Error("Expected ghost combat");
		}
		expect(ghost.state.zone).toBe(state.zone);
		expect(ghost.state.combat!.encounterType).toBe("ghost");
		// Selection resumes when entering a new segment.
		const boundary = returnToTown({ ...loaded.state, battleNumber: 10 });
		if (!boundary.ok) {
			throw new Error("Expected zone transition");
		}
		expect(boundary.state.zone).toBe("castle");
	});

	it("exposes every next-zone option for preloading, without changing state", () => {
		const state = createRun();
		state.zoneNumber = 10;
		state.battleNumber = 100;
		state.zone = "tower";
		const before = structuredClone(state);
		expect(selectCombatView(state)?.nextZoneOptions).toEqual(["forest", "plains"]);
		expect(state).toEqual(before);
	});
});
