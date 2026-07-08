import { z } from "zod";
import { effectSchema } from "./effect.schema";
import { skillCategorySchema, skillPoolSchema } from "./common.schema";

export const skillSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	icon: z.string().nonempty(),
	pool: skillPoolSchema,
	category: skillCategorySchema,
	maxUses: z.number().int().positive().optional(),
	effects: z.array(effectSchema).min(1),
	tags: z.array(z.string().nonempty()).default([]),
});

export type SkillDefinition = z.infer<typeof skillSchema>;
export type SkillDefinitionInput = z.input<typeof skillSchema>;
