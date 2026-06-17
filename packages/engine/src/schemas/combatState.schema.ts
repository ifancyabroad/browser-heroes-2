import { z } from "zod";
import {
	attributeSchema,
	attributesSchema,
	basicAttackSchema,
	damageAffinitiesSchema,
	featIdSchema,
	skillIdSchema,
	skillRankValueSchema,
} from "@app/content";
import { combatLogEntrySchema } from "./log.schema";

export const combatantSideSchema = z.enum(["player", "enemy"]);

export const combatantIdSchema = z.string();

export const activeCombatEffectSchema = z.object({
	id: z.string(),
	// Placeholder until active combat effects are implemented in a focused pass.
	effectId: z.string(),
	sourceCombatantId: combatantIdSchema,
	targetCombatantId: combatantIdSchema,
	durationTurns: z.number().int().min(0),
	stacks: z.number().int().min(1).default(1),
});

export const combatantSkillStateSchema = z.object({
	skillId: skillIdSchema,
	rank: skillRankValueSchema,
	chargesRemaining: z.number().int().min(0).optional(),
});

export const combatantBasicAttackSchema = basicAttackSchema.extend({
	proficient: z.boolean(),
});

export const combatantStateSchema = z.object({
	id: combatantIdSchema,
	side: combatantSideSchema,
	sourceId: z.string(),
	name: z.string(),
	level: z.number().int().min(1),
	maxHp: z.number().int().min(1),
	currentHp: z.number().int().min(0),
	attributes: attributesSchema,
	armourClass: z.number().int().min(0),
	proficiencyBonus: z.number().int().min(0),
	savingThrowProficiencies: z.array(attributeSchema),
	damageAffinities: damageAffinitiesSchema,
	basicAttack: combatantBasicAttackSchema,
	skills: z.array(combatantSkillStateSchema),
	featIds: z.array(featIdSchema),
	activeEffects: z.array(activeCombatEffectSchema),
});

export const combatStatusSchema = z.enum(["active", "player_won", "enemy_won"]);

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
export type CombatantBasicAttack = z.infer<typeof combatantBasicAttackSchema>;
export type CombatantSkillState = z.infer<typeof combatantSkillStateSchema>;
export type CombatantState = z.infer<typeof combatantStateSchema>;
export type CombatStatus = z.infer<typeof combatStatusSchema>;
export type CombatState = z.infer<typeof combatStateSchema>;
