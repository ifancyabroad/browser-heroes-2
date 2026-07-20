import type { ClassId, FeatId } from "@app/content";

import type { HeroEquipmentState, HeroSkillState, RunState } from "../schemas";
import { deriveHeroStats, type DerivedHeroStats } from "../systems/hero/deriveHeroStats";
import { MAX_HEALING_POTIONS } from "../systems/consumables/healingPotionConstants";

export type HeroView = {
	name: string;
	level: number;
	classId: ClassId;

	health: DerivedHeroStats["health"];

	attributes: DerivedHeroStats["attributes"];
	combatStats: DerivedHeroStats["combatStats"];
	armourClassBreakdown: DerivedHeroStats["armourClassBreakdown"];

	skills: readonly HeroSkillState[];
	featIds: readonly FeatId[];
	equipment: HeroEquipmentState;
	proficiencies: DerivedHeroStats["proficiencies"];

	healingPotions: number;
	maxHealingPotions: number;
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
		armourClassBreakdown: derivedStats.armourClassBreakdown,

		skills: hero.skills,
		featIds: derivedStats.featIds,
		equipment: hero.equipment,
		proficiencies: derivedStats.proficiencies,

		healingPotions: hero.healingPotions,
		maxHealingPotions: MAX_HEALING_POTIONS,
	};
}
