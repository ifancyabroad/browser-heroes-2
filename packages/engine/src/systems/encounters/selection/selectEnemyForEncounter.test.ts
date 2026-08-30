import { describe, expect, it } from "vitest";
import { createInitialRngState } from "../../../core/rng";
import { selectEnemyForEncounter } from "./selectEnemyForEncounter";

describe("selectEnemyForEncounter", () => {
	it("selects only a lowest-threat enemy for the first battle", () => {
		for (let seed = 0; seed < 20; seed += 1) {
			const result = selectEnemyForEncounter({
				battleNumber: 1,
				zoneNumber: 1,
				rngState: createInitialRngState(String(seed)),
			});

			expect(result?.value.threat).toBe(5);
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

		expect([...threats].some((threat) => threat > 5)).toBe(true);
	});
});
