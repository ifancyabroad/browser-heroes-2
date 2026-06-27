import type { ClassId, FeatId } from "@app/content";

import type { HeroEquipmentState, HeroSkillState, RunState } from "../schemas";
import {
	deriveHeroStats,
	type DerivedHeroStats,
} from "../systems/progression/hero/deriveHeroStats";

export type HeroView = {
	name: string;
	level: number;
	classId: ClassId;

	health: {
		currentHp: number;
		maxHp: number;
	};

	attributes: DerivedHeroStats["attributes"];
	combatStats: DerivedHeroStats["combatStats"];

	skills: readonly HeroSkillState[];
	featIds: readonly FeatId[];
	equipment: HeroEquipmentState;
	proficiencies: DerivedHeroStats["proficiencies"];
};

export function selectHeroView(state: RunState): HeroView {
	const { hero } = state;
	const derivedStats = deriveHeroStats(hero);

	return {
		name: hero.name,
		level: hero.level,
		classId: hero.classId,

		health: {
			currentHp: hero.currentHp,
			maxHp: hero.maxHp,
		},

		attributes: derivedStats.attributes,
		combatStats: derivedStats.combatStats,

		skills: hero.skills,
		featIds: derivedStats.featIds,
		equipment: hero.equipment,
		proficiencies: derivedStats.proficiencies,
	};
}
