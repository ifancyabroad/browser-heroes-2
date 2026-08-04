import {
	armourSlotSchema,
	attackRiderTimingSchema,
	attributeSchema,
	automaticRollOutcomeSchema,
	bodyArmourCategorySchema,
	damageAffinityKindSchema,
	damageAffinityOperationSchema,
	damageModifierOperationSchema,
	damageTypeSchema,
	enemyRankSchema,
	featCategorySchema,
	featKindSchema,
	hitDieSchema,
	itemAffixPositionSchema,
	raritySchema,
	rollModeSchema,
	rollTypeSchema,
	skillCategorySchema,
	skillKindSchema,
	skillPoolSchema,
	skillTargetSchema,
	tacticSchema,
	weaponHandednessSchema,
	weaponRangeSchema,
	weaponTypeSchema,
} from "@app/content";
import type { CategoryKey } from "../content/catalog";

const unique = (...groups: readonly (readonly string[])[]) => [...new Set(groups.flat())];

export const optionsByField: Record<string, readonly string[]> = {
	target: skillTargetSchema.options,
	pool: skillPoolSchema.options,
	hitDie: hitDieSchema.options,
	weaponType: weaponTypeSchema.options,
	rank: enemyRankSchema.options,
	tactic: tacticSchema.options,
	damageType: damageTypeSchema.options,
	attribute: attributeSchema.options,
	timing: attackRiderTimingSchema.options,
	operation: unique(damageModifierOperationSchema.options, damageAffinityOperationSchema.options),
	affinity: damageAffinityKindSchema.options,
	position: itemAffixPositionSchema.options,
	rarity: raritySchema.options,
	roll: rollTypeSchema.options,
	rollMode: rollModeSchema.options,
	mode: [...rollModeSchema.options, ...automaticRollOutcomeSchema.options],
	handedness: weaponHandednessSchema.options,
	range: weaponRangeSchema.options,
	slot: armourSlotSchema.options,
};

export function categoryOptions(category: CategoryKey, path: string) {
	if (category === "skills" && path === "category") {
		return skillCategorySchema.options;
	}
	if (category === "feats" && path === "category") {
		return featCategorySchema.options;
	}
	return bodyArmourCategorySchema.options;
}

export function kindOptions(category: CategoryKey, path: string) {
	if (category === "skills" && path === "kind") {
		return skillKindSchema.options;
	}
	if (category === "feats" && path === "kind") {
		return featKindSchema.options;
	}
	return undefined;
}

export function arrayItemOptions(field: string) {
	if (field === "itemTypes") {
		return ["weapon", "armour"];
	}
	if (field === "weaponTypes") {
		return weaponTypeSchema.options;
	}
	if (field === "damageTypes") {
		return damageTypeSchema.options;
	}
	if (field === "armourSlots") {
		return armourSlotSchema.options;
	}
	if (field === "armourCategories") {
		return bodyArmourCategorySchema.options;
	}
	return undefined;
}
