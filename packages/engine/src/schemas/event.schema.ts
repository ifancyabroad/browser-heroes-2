import { featIdSchema, skillIdSchema, skillRankValueSchema } from "@app/content";
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
	resultingRank: skillRankValueSchema,
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

export const engineEventSchema = z.union([
	combatStartedEventSchema,
	combatTurnResolvedEventSchema,
	combatVictoryEventSchema,
	combatDefeatEventSchema,
	returnedToTownEventSchema,
	nextCombatReadyEventSchema,
	levelUpCompletedEventSchema,
]);

export type EngineEvent = z.infer<typeof engineEventSchema>;
