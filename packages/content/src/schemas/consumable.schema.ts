import { z } from "zod";
import { damageClassSchema, damageTypeSchema, diceFormulaSchema } from "./common.schema";
import { effectDurationSchema, statusEffectSchema } from "./effect.schema";

export const consumableHealPercentEffectSchema = z.object({
	type: z.literal("healPercent"),
	target: z.literal("self"),
	percent: z.number().positive().max(1),
});

export const consumableDamageEffectSchema = z.object({
	type: z.literal("damage"),
	target: z.literal("enemy"),
	dice: diceFormulaSchema,
	damageType: damageTypeSchema,
	damageClass: damageClassSchema,
});

export const consumableApplyStatusEffectSchema = z.object({
	type: z.literal("applyStatus"),
	target: z.literal("self"),
	statusId: statusEffectSchema,
	duration: effectDurationSchema,
});

export const consumableEffectSchema = z.discriminatedUnion("type", [
	consumableHealPercentEffectSchema,
	consumableDamageEffectSchema,
	consumableApplyStatusEffectSchema,
]);

export const consumableSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	icon: z.string().nonempty(),
	basePrice: z.number().int().positive(),
	maxCarry: z.number().int().positive(),
	effect: consumableEffectSchema,
});

export type ConsumableHealPercentEffect = z.infer<typeof consumableHealPercentEffectSchema>;
export type ConsumableDamageEffect = z.infer<typeof consumableDamageEffectSchema>;
export type ConsumableApplyStatusEffect = z.infer<typeof consumableApplyStatusEffectSchema>;
export type ConsumableDefinition = z.infer<typeof consumableSchema>;
export type ConsumableDefinitionInput = z.input<typeof consumableSchema>;
