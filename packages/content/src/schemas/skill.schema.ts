import { z } from "zod";
import { effectSchema } from "./effect.schema";
import { skillCategorySchema, skillKindSchema, skillPoolSchema } from "./common.schema";
import { raritySchema } from "./rarity.schema";

export const skillSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	icon: z.string().nonempty(),
	pool: skillPoolSchema,
	kind: skillKindSchema,
	category: skillCategorySchema,
	rarity: raritySchema,
	maxUses: z.number().int().positive().optional(),
	effects: z.array(effectSchema).min(1),
	tags: z.array(z.string().nonempty()).default([]),
});

export type SkillDefinition = z.infer<typeof skillSchema>;
export type SkillDefinitionInput = z.input<typeof skillSchema>;
