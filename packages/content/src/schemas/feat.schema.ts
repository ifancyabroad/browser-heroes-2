import { z } from "zod";
import { attackRiderSchema } from "./effect.schema";
import { passiveModifierSchema } from "./modifier.schema";

export const featCategorySchema = z.enum(["offensive", "defensive", "utility", "resource"]);

export const featKindSchema = z.enum(["attribute", "damageMastery", "training", "bargain"]);

export const featSchema = z
	.object({
		id: z.string().nonempty(),
		name: z.string().nonempty(),
		description: z.string().optional(),
		icon: z.string().nonempty(),
		kind: featKindSchema,
		category: featCategorySchema,
		modifiers: z.array(passiveModifierSchema).default([]),
		attackRiders: z.array(attackRiderSchema).default([]),
		tags: z.array(z.string().nonempty()).default([]),
	})
	.refine((feat) => feat.modifiers.length > 0 || feat.attackRiders.length > 0, {
		message: "Feat must define at least one modifier or attack rider",
		path: ["modifiers"],
	});

export type FeatCategory = z.infer<typeof featCategorySchema>;
export type FeatKind = z.infer<typeof featKindSchema>;
export type FeatDefinition = z.infer<typeof featSchema>;
export type FeatDefinitionInput = z.input<typeof featSchema>;
