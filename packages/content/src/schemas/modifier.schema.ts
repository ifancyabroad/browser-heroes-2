import { z } from "zod";
import {
	attackRangeSchema,
	attributes,
	damageClassSchema,
	damageTypeSchema,
} from "./common.schema";

export const combatStats = [
	"armourClass",
	"attackRollBonus",
	"savingThrowBonus",
	"saveDcBonus",
	"criticalRangeBonus",
	"criticalDiceMultiplierBonus",
	"maxHpBonus",
] as const;

export const combatStatSchema = z.enum(combatStats);

export const modifiableStats = [...combatStats, ...attributes] as const;

export const modifiableStatSchema = z.enum(modifiableStats);

export const damageAffinityKindSchema = z.enum(["resistance", "immunity", "vulnerability"]);

export const damageAffinityOperationSchema = z.enum(["add", "remove"]);

export const passiveStatModifierSchema = z.object({
	type: z.literal("modifyStat"),
	stat: modifiableStatSchema,
	value: z.number(),
});

export const passiveHealingModifierSchema = z.object({
	type: z.literal("modifyHealing"),
	multiplier: z.number().nonnegative(),
});

export const damageModifierOperationSchema = z.enum(["add", "multiply"]);

export const passiveDamageModifierSchema = z.object({
	type: z.literal("modifyDamage"),
	damageType: damageTypeSchema.optional(),
	damageClass: damageClassSchema.optional(),
	attackRange: attackRangeSchema.optional(),
	operation: damageModifierOperationSchema,
	value: z.number(),
});

export const passiveDamageTakenModifierSchema = z.object({
	type: z.literal("modifyDamageTaken"),
	damageType: damageTypeSchema.optional(),
	damageClass: damageClassSchema.optional(),
	attackRange: attackRangeSchema.optional(),
	operation: damageModifierOperationSchema,
	value: z.number(),
});

export const passiveDamageAffinityModifierSchema = z.object({
	type: z.literal("modifyDamageAffinity"),
	affinity: damageAffinityKindSchema,
	operation: damageAffinityOperationSchema,
	damageType: damageTypeSchema,
});

export const passiveModifierSchema = z.discriminatedUnion("type", [
	passiveStatModifierSchema,
	passiveHealingModifierSchema,
	passiveDamageModifierSchema,
	passiveDamageTakenModifierSchema,
	passiveDamageAffinityModifierSchema,
]);

export type CombatStat = z.infer<typeof combatStatSchema>;
export type ModifiableStat = z.infer<typeof modifiableStatSchema>;
export type DamageAffinityKind = z.infer<typeof damageAffinityKindSchema>;
export type DamageAffinityOperation = z.infer<typeof damageAffinityOperationSchema>;
export type DamageModifierOperation = z.infer<typeof damageModifierOperationSchema>;
export type PassiveStatModifier = z.infer<typeof passiveStatModifierSchema>;
export type PassiveHealingModifier = z.infer<typeof passiveHealingModifierSchema>;
export type PassiveDamageModifier = z.infer<typeof passiveDamageModifierSchema>;
export type PassiveDamageTakenModifier = z.infer<typeof passiveDamageTakenModifierSchema>;
export type PassiveDamageAffinityModifier = z.infer<typeof passiveDamageAffinityModifierSchema>;
export type PassiveModifier = z.infer<typeof passiveModifierSchema>;
