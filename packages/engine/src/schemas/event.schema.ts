import { equipmentSlotSchema, featIdSchema, raritySchema, skillIdSchema } from "@app/content";
import { z } from "zod";

const itemEventPayloadSchema = z.object({
	itemInstanceId: z.string().nonempty(),
	itemId: z.string().nonempty(),
	itemName: z.string().nonempty(),
	rarity: raritySchema,
});

const combatContextSchema = z.object({
	combatId: z.string().nonempty(),
	battleNumber: z.number().int().min(1),
	encounterType: z.enum(["standard", "boss", "ghost"]),
	enemySourceId: z.string().nonempty(),
});

const finishingPlayerActionSchema = z.object({
	type: z.enum(["basic_attack", "skill"]),
	targetStartedAtFullHp: z.boolean(),
});

const combatStartedEventSchema = combatContextSchema.extend({
	type: z.literal("COMBAT_STARTED"),
});

const combatTurnResolvedEventSchema = z.object({
	type: z.literal("COMBAT_TURN_RESOLVED"),
});

const skillUsedEventSchema = combatContextSchema.extend({
	type: z.literal("SKILL_USED"),
	skillId: skillIdSchema,
	turnNumber: z.number().int().min(1),
});

const combatVictoryEventSchema = combatContextSchema.extend({
	type: z.literal("COMBAT_ENDED"),
	outcome: z.literal("victory"),
	turnNumber: z.number().int().min(1),
	defeatedFinalBoss: z.boolean(),
	completedEndlessCycle: z.boolean(),
	finishingPlayerAction: finishingPlayerActionSchema.nullable(),
	reward: z.object({
		gold: z.number().int().min(0),
		xp: z.number().int().min(0),
	}),
});

const combatDefeatEventSchema = combatContextSchema.extend({
	type: z.literal("COMBAT_ENDED"),
	outcome: z.literal("defeat"),
	turnNumber: z.number().int().min(1),
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

const levelUpRerolledEventSchema = z.object({
	type: z.literal("LEVEL_UP_REROLLED"),
	remainingRerolls: z.number().int().min(0),
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
		item: itemEventPayloadSchema,
		equipmentSlot: equipmentSlotSchema,
	}),
]);

const shopRerolledEventSchema = z.object({
	type: z.literal("SHOP_REROLLED"),
	cost: z.number().int().min(0),
});

const shopLockChangedEventSchema = z.object({
	type: z.literal("SHOP_LOCK_CHANGED"),
	shopSlotId: z.string(),
	locked: z.boolean(),
});

const restedAtTownEventSchema = z.object({
	type: z.literal("RESTED_AT_TOWN"),
	cost: z.number().int().min(0),
	hpRestored: z.number().int().min(0),
});

const itemBoughtEventSchema = z.object({
	type: z.literal("ITEM_BOUGHT"),
	item: itemEventPayloadSchema,
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

const runRetiredEventSchema = z.object({
	type: z.literal("RUN_RETIRED"),
});

export const engineEventSchema = z.union([
	combatStartedEventSchema,
	combatTurnResolvedEventSchema,
	skillUsedEventSchema,
	combatVictoryEventSchema,
	combatDefeatEventSchema,
	returnedToTownEventSchema,
	nextCombatReadyEventSchema,
	runRetiredEventSchema,
	levelUpCompletedEventSchema,
	levelUpRerolledEventSchema,
	rewardSelectedEventSchema,
	shopRerolledEventSchema,
	shopLockChangedEventSchema,
	restedAtTownEventSchema,
	itemBoughtEventSchema,
	healingPotionUsedEventSchema,
	healingPotionBoughtEventSchema,
]);

export type EngineEvent = z.infer<typeof engineEventSchema>;
