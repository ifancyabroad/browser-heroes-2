import { z } from "zod";
import { attributes, damageTypeSchema } from "./common.schema";

export const combatStats = [
	"armourClass",
	"attackRollBonus",
	"savingThrowBonus",
	"saveDcBonus",
	"criticalRangeBonus",
	"criticalDiceMultiplierBonus",
	"healingMultiplier",
	"maxHpBonus",
] as const;

export const combatStatSchema = z.enum(combatStats);

export const modifiableStats = [...combatStats, ...attributes] as const;

export const modifiableStatSchema = z.enum(modifiableStats);

export const modifierOperationSchema = z.enum(["add", "multiply", "set"]);

export const damageAffinityKindSchema = z.enum(["resistance", "immunity", "vulnerability"]);

export const damageAffinityOperationSchema = z.enum(["add", "remove"]);

export const passiveStatModifierSchema = z.object({
	type: z.literal("modifyStat"),
	stat: modifiableStatSchema,
	operation: modifierOperationSchema,
	value: z.number(),
});

export const damageModifierOperationSchema = z.enum(["add", "multiply"]);

export const passiveDamageModifierSchema = z.object({
	type: z.literal("modifyDamage"),
	damageType: damageTypeSchema.optional(),
	operation: damageModifierOperationSchema,
	value: z.number(),
});

export const passiveDamageTakenModifierSchema = z.object({
	type: z.literal("modifyDamageTaken"),
	damageType: damageTypeSchema.optional(),
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
	passiveDamageModifierSchema,
	passiveDamageTakenModifierSchema,
	passiveDamageAffinityModifierSchema,
]);

export type CombatStat = z.infer<typeof combatStatSchema>;
export type ModifiableStat = z.infer<typeof modifiableStatSchema>;
export type ModifierOperation = z.infer<typeof modifierOperationSchema>;
export type DamageAffinityKind = z.infer<typeof damageAffinityKindSchema>;
export type DamageAffinityOperation = z.infer<typeof damageAffinityOperationSchema>;
export type DamageModifierOperation = z.infer<typeof damageModifierOperationSchema>;
export type PassiveStatModifier = z.infer<typeof passiveStatModifierSchema>;
export type PassiveDamageModifier = z.infer<typeof passiveDamageModifierSchema>;
export type PassiveDamageTakenModifier = z.infer<typeof passiveDamageTakenModifierSchema>;
export type PassiveDamageAffinityModifier = z.infer<typeof passiveDamageAffinityModifierSchema>;
export type PassiveModifier = z.infer<typeof passiveModifierSchema>;
