import { z } from "zod";
import { damageTypeSchema } from "./common.schema";

export const effectTypeSchema = z.enum(["auxiliary", "damage", "heal", "status", "weaponDamage"]);
export const propertyTypeSchema = z.enum(["resistance", "damage", "stat", "auxiliaryStat", "heal"]);

export const propertySchema = z.object({
	name: z.string().nonempty(),
	type: propertyTypeSchema,
	value: z.number(),
});

export const effectSchema = z.object({
	damageType: damageTypeSchema.optional(),
	max: z.number().optional(),
	min: z.number().optional(),
	target: z.string().nonempty().optional(),
	type: effectTypeSchema,
	difficulty: z.number().optional(),
	duration: z.number().optional(),
	modifier: z.union([z.number(), z.string()]).optional(),
	effect: z.string().optional(),
	properties: z.array(propertySchema).optional(),
	accuracy: z.number().optional(),
	multiplier: z.number().optional(),
});

export type EffectType = z.infer<typeof effectTypeSchema>;
export type PropertyType = z.infer<typeof propertyTypeSchema>;
export type Property = z.infer<typeof propertySchema>;
export type Effect = z.infer<typeof effectSchema>;
