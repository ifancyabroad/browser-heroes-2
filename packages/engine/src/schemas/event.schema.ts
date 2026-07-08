import { equipmentSlotSchema, featIdSchema, itemIdSchema, skillIdSchema } from "@app/content";
import { z } from "zod";

const combatStartedEventSchema = z.object({
	type: z.literal("COMBAT_STARTED"),
	combatId: z.string(),
});

const combatTurnResolvedEventSchema = z.object({
	type: z.literal("COMBAT_TURN_RESOLVED"),
});

const combatVictoryEventSchema = z.object({
	type: z.literal("COMBAT_ENDED"),
	outcome: z.literal("victory"),
	reward: z.object({
		gold: z.number().int().min(0),
		xp: z.number().int().min(0),
	}),
});

const combatDefeatEventSchema = z.object({
	type: z.literal("COMBAT_ENDED"),
	outcome: z.literal("defeat"),
});

const returnedToTownEventSchema = z.object({
	type: z.literal("RETURNED_TO_TOWN"),
});

const nextCombatReadyEventSchema = z.object({
	type: z.literal("NEXT_COMBAT_READY"),
});

const skillLevelUpSelectionSchema = z.object({
	type: z.literal("skill"),
	skillId: skillIdSchema,
});

const featLevelUpSelectionSchema = z.object({
	type: z.literal("feat"),
	featId: featIdSchema,
});

const completedLevelUpSelectionSchema = z.discriminatedUnion("type", [
	skillLevelUpSelectionSchema,
	featLevelUpSelectionSchema,
]);

const levelUpCompletedEventSchema = z.object({
	type: z.literal("LEVEL_UP_COMPLETED"),
	level: z.number().int().min(2),
	hpGain: z.number().int().positive(),
	newMaxHp: z.number().int().positive(),
	selection: completedLevelUpSelectionSchema.nullable(),
});

const rewardSelectedEventSchema = z.discriminatedUnion("rewardType", [
	z.object({
		type: z.literal("REWARD_SELECTED"),
		rewardType: z.literal("gold"),
		amount: z.number().int().positive(),
	}),
	z.object({
		type: z.literal("REWARD_SELECTED"),
		rewardType: z.literal("item"),
		itemId: itemIdSchema,
		equipmentSlot: equipmentSlotSchema,
	}),
]);

const shopRerolledEventSchema = z.object({
	type: z.literal("SHOP_REROLLED"),
	cost: z.number().int().min(0),
});

const restedAtTownEventSchema = z.object({
	type: z.literal("RESTED_AT_TOWN"),
	cost: z.number().int().min(0),
	hpRestored: z.number().int().min(0),
});

const itemBoughtEventSchema = z.object({
	type: z.literal("ITEM_BOUGHT"),
	itemId: itemIdSchema,
	equipmentSlot: equipmentSlotSchema,
	price: z.number().int().min(0),
});

const healingPotionUsedEventSchema = z.object({
	type: z.literal("HEALING_POTION_USED"),
	amount: z.number().int().min(0),
	remainingPotions: z.number().int().min(0),
});

const healingPotionBoughtEventSchema = z.object({
	type: z.literal("HEALING_POTION_BOUGHT"),
	cost: z.number().int().min(0),
	remainingPotions: z.number().int().min(0),
});

export const engineEventSchema = z.union([
	combatStartedEventSchema,
	combatTurnResolvedEventSchema,
	combatVictoryEventSchema,
	combatDefeatEventSchema,
	returnedToTownEventSchema,
	nextCombatReadyEventSchema,
	levelUpCompletedEventSchema,
	rewardSelectedEventSchema,
	shopRerolledEventSchema,
	restedAtTownEventSchema,
	itemBoughtEventSchema,
	healingPotionUsedEventSchema,
	healingPotionBoughtEventSchema,
]);

export type EngineEvent = z.infer<typeof engineEventSchema>;
