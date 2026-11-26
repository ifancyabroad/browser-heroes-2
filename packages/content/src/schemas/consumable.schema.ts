import { z } from "zod";
import { sharedEffectSchema } from "./effect.schema";

export const consumableSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	icon: z.string().nonempty(),
	basePrice: z.number().int().positive(),
	maxCarry: z.number().int().positive(),
	effects: z.array(sharedEffectSchema).min(1),
});

export type ConsumableEffect = z.infer<typeof sharedEffectSchema>;
export type ConsumableDefinition = z.infer<typeof consumableSchema>;
export type ConsumableDefinitionInput = z.input<typeof consumableSchema>;
