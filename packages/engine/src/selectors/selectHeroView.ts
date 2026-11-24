import type { ClassId, FeatId } from "@app/content";

import type { HeroEquipmentState, HeroSkillState, HeroState } from "../schemas";
import { deriveHeroStats, type DerivedHeroStats } from "../systems/hero/deriveHeroStats";
import {
	selectConsumableInventory,
	type ConsumableInventoryView,
} from "./selectConsumableInventory";

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

	consumables: ConsumableInventoryView;
};

export function selectHeroView(hero: HeroState): HeroView {
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

		consumables: selectConsumableInventory(hero),
	};
}
