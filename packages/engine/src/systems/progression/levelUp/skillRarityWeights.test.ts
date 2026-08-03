import { describe, expect, it } from "vitest";

import { getSkillRarityWeight, SKILL_RARITY_WEIGHTS } from "./skillRarityWeights";

describe("skill rarity weights", () => {
	it("uses the configured descending rarity curve", () => {
		expect(SKILL_RARITY_WEIGHTS).toEqual({
			common: 1,
			uncommon: 0.6,
			rare: 0.3,
			epic: 0.15,
			legendary: 0.05,
		});

		expect(getSkillRarityWeight("common")).toBeGreaterThan(getSkillRarityWeight("uncommon"));
		expect(getSkillRarityWeight("uncommon")).toBeGreaterThan(getSkillRarityWeight("rare"));
		expect(getSkillRarityWeight("rare")).toBeGreaterThan(getSkillRarityWeight("epic"));
		expect(getSkillRarityWeight("epic")).toBeGreaterThan(getSkillRarityWeight("legendary"));
	});
});
