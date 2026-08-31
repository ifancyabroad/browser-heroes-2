import { CLASSES_BY_ID } from "@app/content";

import { createContextRngState } from "../../../core/rng";
import type { HeroState, PendingLevelUp } from "../../../schemas";
import { calculateLevelUpHpGain } from "../health/calculateLevelUpHpGain";
import { getPendingLevelUp } from "../level/getPendingLevelUp";
import { selectLevelUpOptions } from "./selectLevelUpOptions";

export function createPendingLevelUp(hero: HeroState, seed: string): PendingLevelUp | null {
	if (hero.pendingLevelUp) {
		return hero.pendingLevelUp;
	}

	const progression = getPendingLevelUp(hero);

	if (!progression) {
		return null;
	}

	const classDefinition = CLASSES_BY_ID[hero.classId];

	const hpGain = calculateLevelUpHpGain(
		classDefinition.combat.hitDie,
		hero.attributes.constitution,
	);

	const rerollIndex = 0;
	const options = selectLevelUpOptions(
		hero,
		progression.level,
		createContextRngState(
			seed,
			"level-up",
			progression.level,
			progression.choice?.type ?? "none",
			rerollIndex,
		),
	);

	return {
		level: progression.level,
		hpGain,
		rerollIndex,
		options,
	};
}
