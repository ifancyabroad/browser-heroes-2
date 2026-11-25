import { z } from "zod";
import { damageClassSchema, damageTypeSchema, diceFormulaSchema } from "./common.schema";
import { effectDurationSchema } from "./effect.schema";

export const consumableHealPercentEffectSchema = z.object({
	type: z.literal("healPercent"),
	percent: z.number().positive().max(1),
});

export const consumableDamageEffectSchema = z.object({
	type: z.literal("damage"),
	dice: diceFormulaSchema,
	damageType: damageTypeSchema,
	damageClass: damageClassSchema,
});

export const consumableActFirstEffectSchema = z.object({
	type: z.literal("actFirst"),
	duration: effectDurationSchema,
});

export const consumableEffectSchema = z.discriminatedUnion("type", [
	consumableHealPercentEffectSchema,
	consumableDamageEffectSchema,
	consumableActFirstEffectSchema,
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
export type ConsumableActFirstEffect = z.infer<typeof consumableActFirstEffectSchema>;
export type ConsumableDefinition = z.infer<typeof consumableSchema>;
export type ConsumableDefinitionInput = z.input<typeof consumableSchema>;
