import type { ClassId, FeatId } from "@app/content";

import type { HeroEquipmentState, HeroSkillState, RunState } from "../schemas";
import { deriveHeroStats, type DerivedHeroStats } from "../systems/hero/deriveHeroStats";

export type HeroView = {
	name: string;
	level: number;
	classId: ClassId;

	health: DerivedHeroStats["health"];

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

		health: derivedStats.health,

		attributes: derivedStats.attributes,
		combatStats: derivedStats.combatStats,

		skills: hero.skills,
		featIds: derivedStats.featIds,
		equipment: hero.equipment,
		proficiencies: derivedStats.proficiencies,
	};
}
