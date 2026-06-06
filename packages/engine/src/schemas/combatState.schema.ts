import { z } from "zod";
import { AttributesSchema, itemIds, skillIds } from "@app/content";
import { combatLogEntrySchema } from "./log.schema";

export const combatantSideSchema = z.enum(["player", "enemy"]);

export const combatantIdSchema = z.string();

export const activeCombatEffectSchema = z.object({
	id: z.string(),
	// Example: poison, burn, stun, strength_buff, etc.
	effectId: z.string(),
	sourceCombatantId: combatantIdSchema,
	targetCombatantId: combatantIdSchema,
	durationTurns: z.number().int().min(0),
	stacks: z.number().int().min(1).default(1),
});

export const combatantSkillStateSchema = z.object({
	skillId: z.enum(skillIds),
	chargesRemaining: z.number().int().min(0).optional(),
	cooldownRemaining: z.number().int().min(0).optional(),
});

export const combatantItemStateSchema = z.object({
	instanceId: z.string(),
	itemId: z.enum(itemIds),
	equipped: z.boolean().default(false),
});

export const combatantStateSchema = z.object({
	id: combatantIdSchema,
	side: combatantSideSchema,
	name: z.string(),
	level: z.number().int().min(1),
	maxHp: z.number().int().min(1),
	currentHp: z.number().int().min(0),
	stats: AttributesSchema,
	skills: z.array(combatantSkillStateSchema),
	items: z.array(combatantItemStateSchema),
	activeEffects: z.array(activeCombatEffectSchema),
	isDead: z.boolean(),
});

export const combatStatusSchema = z.enum(["active", "enemy_dead", "player_dead", "complete"]);

export const combatStateSchema = z.object({
	id: z.string(),
	encounterType: z.enum(["standard", "boss", "ghost"]),
	turnNumber: z.number().int().min(1),
	activeActor: combatantSideSchema,
	player: combatantStateSchema,
	enemy: combatantStateSchema,
	log: z.array(combatLogEntrySchema),
	status: combatStatusSchema,
});

export type CombatantSide = z.infer<typeof combatantSideSchema>;
export type CombatantId = z.infer<typeof combatantIdSchema>;
export type ActiveCombatEffect = z.infer<typeof activeCombatEffectSchema>;
export type CombatantSkillState = z.infer<typeof combatantSkillStateSchema>;
export type CombatantItemState = z.infer<typeof combatantItemStateSchema>;
export type CombatantState = z.infer<typeof combatantStateSchema>;
export type CombatStatus = z.infer<typeof combatStatusSchema>;
export type CombatState = z.infer<typeof combatStateSchema>;
