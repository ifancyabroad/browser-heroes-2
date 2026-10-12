import { enemies } from "@app/content";
import { describe, expect, it } from "vitest";
import { createContextRngState } from "../../../core/rng";
import { ZONE_GROUPS } from "../constants/zoneOrder";
import { getEncounterCandidates } from "../selection/getEncounterCandidates";
import { selectEnemyForEncounter } from "../selection/selectEnemyForEncounter";
import { selectWeightedEnemy } from "../selection/selectWeightedEnemy";
import { selectZone } from "./selectZone";

describe("zone progression configuration", () => {
	it("preserves the original zones and enemy schedule across endless cycles", () => {
		const original = [
			"forest",
			"castle",
			"desert",
			"plains",
			"hills",
			"ocean",
			"volcano",
			"abyss",
			"dungeon",
			"tower",
		] as const;
		for (const seed of ["test-seed", "daily", "another-run"]) {
			for (let battleNumber = 1; battleNumber <= 210; battleNumber++) {
				const zoneNumber = Math.ceil(battleNumber / 10);
				const zone = original[(zoneNumber - 1) % original.length];
				expect(
					selectZone(zoneNumber, createContextRngState(seed, "zone", zoneNumber)),
				).toBe(zone);
				const rngState = createContextRngState(seed, "enemy", battleNumber);
				const previous = selectWeightedEnemy(
					rngState,
					getEncounterCandidates({
						zone,
						battleNumber,
						encounterType: battleNumber % 10 === 0 ? "boss" : "standard",
					}),
				);
				expect(selectEnemyForEncounter({ zone, battleNumber, rngState })).toEqual(previous);
			}
		}
	});

	it("has ten nonempty difficulty slots with playable standard and boss pools", () => {
		expect(ZONE_GROUPS).toHaveLength(10);
		for (const group of ZONE_GROUPS) {
			expect(group.length).toBeGreaterThan(0);
			for (const zone of group) {
				for (const boss of [false, true]) {
					expect(
						enemies.some(
							(enemy) =>
								enemy.encounter.zone === zone &&
								(enemy.rank === "boss") === boss &&
								enemy.encounter.weight > 0,
						),
					).toBe(true);
				}
			}
		}
	});
});
