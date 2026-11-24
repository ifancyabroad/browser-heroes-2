import { z } from "zod";

export const healPercentEffectSchema = z.object({
	type: z.literal("healPercent"),
	percent: z.number().positive().max(1),
});

export const consumableSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	basePrice: z.number().int().positive(),
	maxCarry: z.number().int().positive(),
	effect: healPercentEffectSchema,
});

export type ConsumableDefinition = z.infer<typeof consumableSchema>;
export type ConsumableDefinitionInput = z.input<typeof consumableSchema>;
