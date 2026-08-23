import { CLASSES_BY_ID } from "@app/content";

import { createContextRngState, type RngResult, type RngState } from "../../../core/rng";
import type { HeroState, PendingLevelUp } from "../../../schemas";
import { calculateLevelUpHpGain } from "../health/calculateLevelUpHpGain";
import { getPendingLevelUp } from "../level/getPendingLevelUp";
import { selectLevelUpOptions } from "./selectLevelUpOptions";

export function createPendingLevelUp(
	hero: HeroState,
	seed: string,
	rngState: RngState,
): RngResult<PendingLevelUp | null> {
	if (hero.pendingLevelUp) {
		return {
			value: hero.pendingLevelUp,
			rngState,
		};
	}

	const progression = getPendingLevelUp(hero);

	if (!progression) {
		return {
			value: null,
			rngState,
		};
	}

	const classDefinition = CLASSES_BY_ID[hero.classId];

	const hpGain = calculateLevelUpHpGain(
		classDefinition.combat.hitDie,
		hero.attributes.constitution,
	);

	const rerollIndex = 0;
	const selected = selectLevelUpOptions(
		hero,
		progression.choice,
		createContextRngState(
			seed,
			"level-up",
			progression.level,
			progression.choice ?? "none",
			rerollIndex,
		),
	);

	return {
		value: {
			level: progression.level,
			hpGain,
			rerollIndex,
			options: selected.value,
		},
		rngState,
	};
}
