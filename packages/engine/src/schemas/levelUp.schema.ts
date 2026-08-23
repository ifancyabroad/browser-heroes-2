import { z } from "zod";
import { featIdSchema, skillIdSchema } from "@app/content";

export const skillLevelUpOptionSchema = z.object({
	type: z.literal("skill"),
	skillId: skillIdSchema,
});

export const featLevelUpOptionSchema = z.object({
	type: z.literal("feat"),
	featId: featIdSchema,
});

export const levelUpOptionSchema = z.discriminatedUnion("type", [
	skillLevelUpOptionSchema,
	featLevelUpOptionSchema,
]);

export const pendingLevelUpSchema = z.object({
	level: z.number().int().min(2),
	hpGain: z.number().int().positive(),
	rerollIndex: z.number().int().min(0),
	options: z.array(levelUpOptionSchema).max(3),
});

export type SkillLevelUpOption = z.infer<typeof skillLevelUpOptionSchema>;

export type FeatLevelUpOption = z.infer<typeof featLevelUpOptionSchema>;

export type LevelUpOption = z.infer<typeof levelUpOptionSchema>;

export type PendingLevelUp = z.infer<typeof pendingLevelUpSchema>;

export const levelUpSelectionSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("skill"),
		skillId: skillIdSchema,
	}),
	z.object({
		type: z.literal("feat"),
		featId: featIdSchema,
	}),
]);

export type LevelUpSelection = z.infer<typeof levelUpSelectionSchema>;
