import { z } from "zod";
import { damageClassSchema, damageTypeSchema, diceFormulaSchema } from "./common.schema";

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

export const consumableEffectSchema = z.discriminatedUnion("type", [
	consumableHealPercentEffectSchema,
	consumableDamageEffectSchema,
]);

export const consumableSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	basePrice: z.number().int().positive(),
	maxCarry: z.number().int().positive(),
	effect: consumableEffectSchema,
});

export type ConsumableHealPercentEffect = z.infer<typeof consumableHealPercentEffectSchema>;
export type ConsumableDamageEffect = z.infer<typeof consumableDamageEffectSchema>;
export type ConsumableDefinition = z.infer<typeof consumableSchema>;
export type ConsumableDefinitionInput = z.input<typeof consumableSchema>;
