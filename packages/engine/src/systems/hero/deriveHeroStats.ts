import { CLASSES_BY_ID, type Attributes, type Class, type FeatId } from "@app/content";

import type { HeroState } from "../../schemas";
import { EMPTY_DAMAGE_AFFINITIES } from "../combat/constants/combatDefaults";
import {
	type BaseArmourClassBreakdown,
	deriveBaseArmourClass,
} from "../combat/equipment/deriveBaseArmourClass";
import {
	collectEquipmentModifiers,
	collectFeatModifiers,
} from "../combat/modifiers/collectPassiveModifiers";
import { deriveAttributes, type DerivedAttributes } from "../combat/modifiers/deriveAttributes";
import { deriveCombatStats, type DerivedCombatStats } from "../combat/modifiers/deriveCombatStats";
import { deriveHeroHealth } from "./deriveHeroHealth";

export type DerivedHeroHealth = {
	maxHp: number;
	currentHp: number;
};

export type DerivedArmourClassBreakdown = BaseArmourClassBreakdown &
	Pick<DerivedCombatStats["armourClass"], "value" | "contributions">;

export type DerivedHeroStats = {
	attributes: DerivedAttributes;
	effectiveAttributes: Attributes;
	combatStats: DerivedCombatStats;
	armourClassBreakdown: DerivedArmourClassBreakdown;
	health: DerivedHeroHealth;
	featIds: FeatId[];
	proficiencies: Class["proficiencies"];
};

export function deriveHeroStats(hero: HeroState): DerivedHeroStats {
	const classDefinition = CLASSES_BY_ID[hero.classId];

	const featIds: FeatId[] = [...new Set([...classDefinition.combat.featIds, ...hero.featIds])];

	const modifiers = [
		...collectEquipmentModifiers(hero.equipment),
		...collectFeatModifiers(featIds),
	];

	const attributes = deriveAttributes(hero.attributes, modifiers);

	const effectiveAttributes: Attributes = {
		strength: attributes.strength.value,
		dexterity: attributes.dexterity.value,
		constitution: attributes.constitution.value,
		intelligence: attributes.intelligence.value,
		wisdom: attributes.wisdom.value,
		charisma: attributes.charisma.value,
	};

	const baseArmourClass = deriveBaseArmourClass(hero.equipment, effectiveAttributes.dexterity);

	const combatStats = deriveCombatStats({
		baseArmourClass: baseArmourClass.baseValue,
		baseDamageAffinities: EMPTY_DAMAGE_AFFINITIES,
		modifiers,
	});

	const armourClassBreakdown: DerivedArmourClassBreakdown = {
		...baseArmourClass,
		value: combatStats.armourClass.value,
		contributions: combatStats.armourClass.contributions,
	};

	const health = deriveHeroHealth({
		baseConstitution: hero.attributes.constitution,
		effectiveConstitution: effectiveAttributes.constitution,
		level: hero.level,
		currentHp: hero.currentHp,
		maxHp: hero.maxHp,
		maxHpBonus: combatStats.maxHpBonus.value,
	});

	return {
		attributes,
		effectiveAttributes,
		combatStats,
		armourClassBreakdown,
		health,
		featIds,
		proficiencies: classDefinition.proficiencies,
	};
}
