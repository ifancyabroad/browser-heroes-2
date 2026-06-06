import { z } from "zod";
import { attributesSchema, classIds, itemIds, skillIds } from "@app/content";

export const heroSkillStateSchema = z.object({
	skillId: z.enum(skillIds),

	// Optional because not every skill needs charges.
	chargesRemaining: z.number().int().min(0).optional(),
});

export const heroItemStateSchema = z.object({
	instanceId: z.string(),
	itemId: z.enum(itemIds),

	// Keep this simple for now. Later you may add affixes, durability, rarity rolls, etc.
	equipped: z.boolean().default(false),
});

export const heroStateSchema = z.object({
	id: z.string(),
	name: z.string(),
	classId: z.enum(classIds),
	level: z.number().int().min(1),
	xp: z.number().int().min(0),
	maxHp: z.number().int().min(1),
	currentHp: z.number().int().min(0),
	stats: attributesSchema,
	skills: z.array(heroSkillStateSchema),
	items: z.array(heroItemStateSchema),
});

export type HeroSkillState = z.infer<typeof heroSkillStateSchema>;
export type HeroItemState = z.infer<typeof heroItemStateSchema>;
export type HeroState = z.infer<typeof heroStateSchema>;
