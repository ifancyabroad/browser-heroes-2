import { z } from "zod";

import { armourSlotSchema, bodyArmourCategorySchema, itemModifierSchema } from "./armour.schema";
import { damageTypeSchema, weaponTypeSchema } from "./common.schema";
import { attackRiderSchema } from "./effect.schema";
import { itemAffixRaritySchema } from "./itemRarity.schema";

export const itemAffixPositionSchema = z.enum(["prefix", "suffix"]);

const itemAffixApplicabilityRuleSchema = z.object({
	itemTypes: z
		.array(z.enum(["weapon", "armour"]))
		.min(1)
		.optional(),
	weaponTypes: z.array(weaponTypeSchema).min(1).optional(),
	damageTypes: z.array(damageTypeSchema).min(1).optional(),
	armourSlots: z.array(armourSlotSchema).min(1).optional(),
	armourCategories: z.array(bodyArmourCategorySchema).min(1).optional(),
});

const itemAffixApplicabilitySchema = z.array(itemAffixApplicabilityRuleSchema).min(1);

export const itemAffixSchema = z
	.object({
		id: z.string().nonempty(),
		name: z.string().nonempty(),
		position: itemAffixPositionSchema,
		rarity: itemAffixRaritySchema,
		weight: z.number().positive().default(1),
		appliesTo: itemAffixApplicabilitySchema.default([{}]),
		modifiers: z.array(itemModifierSchema).default([]),
		attackRiders: z.array(attackRiderSchema).default([]),
		tags: z.array(z.string().nonempty()).default([]),
	})
	.refine((affix) => affix.modifiers.length > 0 || affix.attackRiders.length > 0, {
		message: "Item affix must define at least one modifier or attack rider",
		path: ["modifiers"],
	})
	.refine(
		(affix) => {
			if (affix.attackRiders.length === 0) {
				return true;
			}

			return affix.appliesTo.every(
				(rule) =>
					rule.itemTypes !== undefined &&
					rule.itemTypes.length === 1 &&
					rule.itemTypes[0] === "weapon",
			);
		},
		{
			message: "Attack rider affixes must apply exclusively to weapons",
			path: ["attackRiders"],
		},
	);

export type ItemAffixPosition = z.infer<typeof itemAffixPositionSchema>;

export type ItemAffixApplicabilityRule = z.infer<typeof itemAffixApplicabilityRuleSchema>;
export type ItemAffixApplicability = z.infer<typeof itemAffixApplicabilitySchema>;

export type ItemAffixDefinition = z.infer<typeof itemAffixSchema>;
export type ItemAffixDefinitionInput = z.input<typeof itemAffixSchema>;
