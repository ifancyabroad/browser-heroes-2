import { z } from "zod";
import {
	attributesSchema,
	classIdSchema,
	featIdSchema,
	itemIdSchema,
	skillIdSchema,
} from "@app/content";
import { pendingLevelUpSchema } from "./levelUp.schema";
import { MAX_HEALING_POTIONS } from "../systems/consumables/healingPotionConstants";

export const heroSkillStateSchema = z.object({
	skillId: skillIdSchema,

	// Optional because not every skill needs charges.
	chargesRemaining: z.number().int().min(0).optional(),
});

export const equippedItemStateSchema = z.object({
	instanceId: z.string(),
	itemId: itemIdSchema,
});

export const heroEquipmentStateSchema = z.object({
	head: equippedItemStateSchema.nullable(),
	neck: equippedItemStateSchema.nullable(),
	body: equippedItemStateSchema.nullable(),
	hands: equippedItemStateSchema.nullable(),
	finger1: equippedItemStateSchema.nullable(),
	finger2: equippedItemStateSchema.nullable(),
	waist: equippedItemStateSchema.nullable(),
	feet: equippedItemStateSchema.nullable(),
	mainHand: equippedItemStateSchema.nullable(),
	offHand: equippedItemStateSchema.nullable(),
});

export const heroStateSchema = z.object({
	id: z.string(),
	name: z.string(),
	classId: classIdSchema,
	level: z.number().int().min(1),
	xp: z.number().int().min(0),
	maxHp: z.number().int().min(1),
	currentHp: z.number().int().min(0),
	attributes: attributesSchema,
	skills: z.array(heroSkillStateSchema),
	featIds: z.array(featIdSchema),
	equipment: heroEquipmentStateSchema,
	pendingLevelUp: pendingLevelUpSchema.nullable(),
	healingPotions: z.number().int().min(0).max(MAX_HEALING_POTIONS),
});

export type EquippedItemState = z.infer<typeof equippedItemStateSchema>;
export type HeroSkillState = z.infer<typeof heroSkillStateSchema>;
export type HeroEquipmentState = z.infer<typeof heroEquipmentStateSchema>;
export type HeroState = z.infer<typeof heroStateSchema>;
