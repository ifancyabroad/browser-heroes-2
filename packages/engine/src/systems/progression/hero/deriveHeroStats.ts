import { CLASSES_BY_ID, type Attributes, type Class, type FeatId } from "@app/content";

import type { HeroState } from "../../../schemas";
import { EMPTY_DAMAGE_AFFINITIES } from "../../combat/constants/combatDefaults";
import { calculateBaseArmourClass } from "../../combat/equipment/calculateBaseArmourClass";
import {
	collectEquipmentModifiers,
	collectFeatModifiers,
} from "../../combat/modifiers/collectPassiveModifiers";
import { deriveAttributes, type DerivedAttributes } from "../../combat/modifiers/deriveAttributes";
import {
	deriveCombatStats,
	type DerivedCombatStats,
} from "../../combat/modifiers/deriveCombatStats";
import { calculateBaseProficiencyBonus } from "../../combat/rules/calculateBaseProficiencyBonus";

export type DerivedHeroStats = {
	attributes: DerivedAttributes;
	effectiveAttributes: Attributes;
	combatStats: DerivedCombatStats;
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

	const combatStats = deriveCombatStats({
		baseArmourClass: calculateBaseArmourClass(hero.equipment, effectiveAttributes.dexterity),
		baseProficiencyBonus: calculateBaseProficiencyBonus(hero.level),
		baseDamageAffinities: EMPTY_DAMAGE_AFFINITIES,
		modifiers,
	});

	return {
		attributes,
		effectiveAttributes,
		combatStats,
		featIds,
		proficiencies: classDefinition.proficiencies,
	};
}
