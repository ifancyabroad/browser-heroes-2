import { describe, expect, it } from "vitest";
import { classes, SKILLS_BY_ID } from "@app/content";

import { createContextRngState } from "../../../core/rng";
import { createTestRunState, modifyTestRunState } from "../../../test/createTestRunState";
import { getLevelProgression } from "../level/getLevelProgression";
import { getLevelUpOptionCandidates } from "./getLevelUpOptionCandidates";
import { selectLevelUpOptions } from "./selectLevelUpOptions";

describe("selectLevelUpOptions", () => {
	it.each([
		{ level: 3, rarities: ["common", "uncommon"] },
		{ level: 5, rarities: ["uncommon", "rare"] },
		{ level: 7, rarities: ["rare", "epic"] },
		{ level: 9, rarities: ["epic", "legendary"] },
	] as const)("offers only configured skill rarities at level $level", ({ level, rarities }) => {
		const state = createTestRunState();
		const options = selectLevelUpOptions(
			state.hero,
			level,
			createContextRngState(state.seed, "level-up", level, "skill", 0),
		);

		expect(options).toHaveLength(3);
		const allowedRarities: readonly string[] = rarities;
		expect(
			options.every(
				(option) =>
					option.type === "skill" &&
					allowedRarities.includes(SKILLS_BY_ID[option.skillId].rarity),
			),
		).toBe(true);
	});

	it.each([
		{ level: 3, rarityWeights: { common: 3, uncommon: 1 } },
		{ level: 5, rarityWeights: { uncommon: 3, rare: 1 } },
		{ level: 7, rarityWeights: { rare: 3, epic: 1 } },
		{ level: 9, rarityWeights: { epic: 3, legendary: 1 } },
	])("defines a 3:1 rarity weight at level $level", ({ level, rarityWeights }) => {
		expect(getLevelProgression(level)?.choice).toEqual({ type: "skill", rarityWeights });
	});

	it.each([2, 6, 10])("offers only feats at level %i", (level) => {
		const state = createTestRunState();
		const options = selectLevelUpOptions(
			state.hero,
			level,
			createContextRngState(state.seed, "level-up", level, "feat", 0),
		);

		expect(options).toHaveLength(3);
		expect(options.every((option) => option.type === "feat")).toBe(true);
	});

	it("provides enough candidates for every configured choice", () => {
		for (const classDefinition of classes) {
			for (const level of [2, 3, 5, 6, 7, 9, 10]) {
				const candidates = getLevelUpOptionCandidates(classDefinition.id, level);

				expect(
					candidates.length,
					`${classDefinition.id} level ${level}`,
				).toBeGreaterThanOrEqual(3);
			}
		}
	});

	it("configures only finite positive rarity weights", () => {
		for (const level of [3, 5, 7, 9]) {
			const choice = getLevelProgression(level)?.choice;
			if (choice?.type !== "skill") {
				throw new Error(`Expected a skill choice at level ${level}`);
			}

			for (const weight of Object.values(choice.rarityWeights)) {
				expect(Number.isFinite(weight)).toBe(true);
				expect(weight).toBeGreaterThan(0);
			}
		}
	});

	it("uses a shared ranking and skips a skill already owned", () => {
		const state = createTestRunState();
		const context = createContextRngState(state.seed, "level-up", 3, "skill", 0);
		const baseline = selectLevelUpOptions(state.hero, 3, context);
		const firstOption = baseline[0];

		if (!firstOption || firstOption.type !== "skill") {
			throw new Error("Expected a skill option");
		}

		const changedState = modifyTestRunState(state, (draft) => {
			draft.hero.skills.push({ skillId: firstOption.skillId });
		});
		const filtered = selectLevelUpOptions(changedState.hero, 3, context);

		expect(filtered).not.toContainEqual(firstOption);
		expect(filtered.slice(0, 2)).toEqual(baseline.slice(1));
	});
});
