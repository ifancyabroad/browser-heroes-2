import { describe, expect, it } from "vitest";
import { createInitialRngState } from "../../../core/rng";
import { LEVEL_PROGRESSION } from "../../progression/constants/levelProgression";
import { calculateCombatReward } from "../../progression/rewards/calculateCombatReward";
import { getEncounterCandidates } from "./getEncounterCandidates";
import { selectEnemyForEncounter } from "./selectEnemyForEncounter";

describe("selectEnemyForEncounter", () => {
	it("selects only a lowest-threat enemy for the first battle", () => {
		for (let seed = 0; seed < 20; seed += 1) {
			const result = selectEnemyForEncounter({
				battleNumber: 1,
				zoneNumber: 1,
				rngState: createInitialRngState(String(seed)),
			});

			expect(result?.value.threat).toBe(6);
		}
	});

	it("keeps the full eligible enemy pool after the first battle", () => {
		const threats = new Set<number>();

		for (let seed = 0; seed < 20; seed += 1) {
			const result = selectEnemyForEncounter({
				battleNumber: 2,
				zoneNumber: 1,
				rngState: createInitialRngState(String(seed)),
			});

			if (result) {
				threats.add(result.value.threat);
			}
		}

		expect([...threats].some((threat) => threat > 6)).toBe(true);
	});

	it("guarantees enough forest XP to reach level 3 before the first boss", () => {
		const firstBattleCandidates = getEncounterCandidates({
			zone: "forest",
			encounterType: "standard",
			battleNumber: 1,
		});
		const laterCandidates = getEncounterCandidates({
			zone: "forest",
			encounterType: "standard",
			battleNumber: 2,
		});
		const minimumThreat =
			Math.min(...firstBattleCandidates.map(({ threat }) => threat)) +
			8 * Math.min(...laterCandidates.map(({ threat }) => threat));
		const minimumXp = calculateCombatReward({
			enemyLevel: 1,
			enemyThreat: minimumThreat,
			goldMultiplier: 1,
		}).xp;

		expect(minimumXp).toBeGreaterThanOrEqual(LEVEL_PROGRESSION[2].requiredXp);
	});
});
