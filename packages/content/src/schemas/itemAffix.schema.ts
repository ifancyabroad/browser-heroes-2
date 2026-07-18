import { z } from "zod";

import {
	armourSlotSchema,
	bodyArmourCategorySchema,
	itemModifierSchema,
	itemRaritySchema,
} from "./armour.schema";
import { weaponTypeSchema } from "./common.schema";

export const itemAffixPositionSchema = z.enum(["prefix", "suffix"]);

const itemAffixApplicabilitySchema = z.object({
	itemTypes: z
		.array(z.enum(["weapon", "armour"]))
		.min(1)
		.optional(),
	weaponTypes: z.array(weaponTypeSchema).min(1).optional(),
	armourSlots: z.array(armourSlotSchema).min(1).optional(),
	armourCategories: z.array(bodyArmourCategorySchema).min(1).optional(),
});

export const itemAffixSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	position: itemAffixPositionSchema,
	rarity: itemRaritySchema,
	minLevel: z.number().int().min(1).default(1),
	maxLevel: z.number().int().min(1).optional(),
	weight: z.number().positive().default(1),
	appliesTo: itemAffixApplicabilitySchema.default({}),
	modifiers: z.array(itemModifierSchema).min(1),
	tags: z.array(z.string().nonempty()).default([]),
});

export type ItemAffixPosition = z.infer<typeof itemAffixPositionSchema>;

export type ItemAffixDefinition = z.infer<typeof itemAffixSchema>;
export type ItemAffixDefinitionInput = z.input<typeof itemAffixSchema>;
