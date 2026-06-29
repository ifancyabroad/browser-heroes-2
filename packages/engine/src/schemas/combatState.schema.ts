import { z } from "zod";
import {
	attributeSchema,
	attributesSchema,
	basicAttackSchema,
	damageAffinitiesSchema,
	damageTypeSchema,
	featIdSchema,
	skillIdSchema,
	skillRankValueSchema,
	damageAffinityKindSchema,
	damageAffinityOperationSchema,
	modifiableStatSchema,
	modifierOperationSchema,
	statusEffectSchema,
} from "@app/content";
import { combatLogEntrySchema } from "./log.schema";

export const combatantSideSchema = z.enum(["player", "enemy"]);

export const combatantIdSchema = z.string();

const activeCombatEffectBaseSchema = z.object({
	id: z.string(),
	sourceCombatantId: combatantIdSchema,
	sourceSkillId: skillIdSchema,
	sourceEffectIndex: z.number().int().min(0),
	remainingTurns: z.number().int().positive(),
});

export const activeStatModifierSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("modifyStat"),
	stat: modifiableStatSchema,
	operation: modifierOperationSchema,
	value: z.number(),
});

export const activeDamageModifierSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("modifyDamage"),
	damageType: damageTypeSchema.optional(),
	operation: z.enum(["add", "multiply"]),
	value: z.number(),
});

export const activeDamageAffinityModifierSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("modifyDamageAffinity"),
	affinity: damageAffinityKindSchema,
	operation: damageAffinityOperationSchema,
	damageType: damageTypeSchema,
});

export const activeStatusEffectSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("status"),
	statusId: statusEffectSchema,
});

export const activeCombatEffectSchema = z.discriminatedUnion("type", [
	activeStatModifierSchema,
	activeDamageModifierSchema,
	activeDamageAffinityModifierSchema,
	activeStatusEffectSchema,
]);

export const combatantSkillStateSchema = z.object({
	skillId: skillIdSchema,
	rank: skillRankValueSchema,
	chargesRemaining: z.number().int().min(0).optional(),
});

export const combatantBasicAttackSchema = basicAttackSchema.extend({
	proficient: z.boolean(),
});

export const combatantDamageModifierSchema = z.object({
	damageType: damageTypeSchema.optional(),
	operation: z.enum(["add", "multiply"]),
	value: z.number(),
});

export const combatantCombatStatsSchema = z.object({
	armourClass: z.number().int().min(0),
	proficiencyBonus: z.number().int().min(0),
	attackRollBonus: z.number(),
	savingThrowBonus: z.number(),
	saveDcBonus: z.number(),
	critChance: z.number(),
	critMultiplier: z.number(),
	damageReduction: z.number(),
	healingMultiplier: z.number(),
	damageAffinities: damageAffinitiesSchema,
	damageModifiers: z.array(combatantDamageModifierSchema),
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
	combatStats: combatantCombatStatsSchema,
	savingThrowProficiencies: z.array(attributeSchema),
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
export type CombatantBasicAttack = z.infer<typeof combatantBasicAttackSchema>;
export type CombatantSkillState = z.infer<typeof combatantSkillStateSchema>;
export type CombatantCombatStats = z.infer<typeof combatantCombatStatsSchema>;
export type CombatantState = z.infer<typeof combatantStateSchema>;
export type CombatStatus = z.infer<typeof combatStatusSchema>;
export type CombatState = z.infer<typeof combatStateSchema>;
export type ActiveStatModifier = z.infer<typeof activeStatModifierSchema>;
export type ActiveDamageModifier = z.infer<typeof activeDamageModifierSchema>;
export type ActiveDamageAffinityModifier = z.infer<typeof activeDamageAffinityModifierSchema>;
export type ActiveStatusEffect = z.infer<typeof activeStatusEffectSchema>;
export type ActiveCombatEffect = z.infer<typeof activeCombatEffectSchema>;
