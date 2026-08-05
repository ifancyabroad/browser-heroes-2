import { CLASSES_BY_ID } from "@app/content";

import { type RngResult, type RngState } from "../../../core/rng";
import type { HeroState, PendingLevelUp } from "../../../schemas";
import { calculateLevelUpHpGain } from "../health/calculateLevelUpHpGain";
import { getPendingLevelUp } from "../level/getPendingLevelUp";
import { selectLevelUpOptions } from "./selectLevelUpOptions";

export function createPendingLevelUp(
	hero: HeroState,
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

	const selected = selectLevelUpOptions(hero, progression.choice, rngState);

	return {
		value: {
			level: progression.level,
			hpGain,
			options: selected.value,
		},
		rngState: selected.rngState,
	};
}
