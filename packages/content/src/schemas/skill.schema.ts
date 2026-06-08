import { z } from "zod";
import { effectSchema } from "./effect.schema";
import { skillCategorySchema, skillPoolSchema } from "./common.schema";

export const skillRankBaseSchema = z.object({
	description: z.string().optional(),
	effects: z.array(effectSchema).min(1),
});

export const skillRankOneSchema = skillRankBaseSchema.extend({
	rank: z.literal(1),
});

export const skillRankTwoSchema = skillRankBaseSchema.extend({
	rank: z.literal(2),
});

export const skillRankThreeSchema = skillRankBaseSchema.extend({
	rank: z.literal(3),
});

export const skillRanksSchema = z.tuple([
	skillRankOneSchema,
	skillRankTwoSchema,
	skillRankThreeSchema,
]);

export const skillSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	icon: z.string().nonempty(),
	pool: skillPoolSchema,
	category: skillCategorySchema,
	maxUses: z.number().int().positive().optional(),
	ranks: skillRanksSchema,
	tags: z.array(z.string().nonempty()).default([]),
});

export type Skill = z.infer<typeof skillSchema>;
export type SkillDefinition = Skill;
