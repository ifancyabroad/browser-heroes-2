import { z } from "zod";
import { DamageTypeSchema } from "./common.schema";

export const EffectTypeSchema = z.enum(["auxiliary", "damage", "heal", "status", "weaponDamage"]);
export const PropertyTypeSchema = z.enum(["resistance", "damage", "stat", "auxiliaryStat", "heal"]);

export const PropertySchema = z.object({
	name: z.string().nonempty(),
	type: PropertyTypeSchema,
	value: z.number(),
});

export const EffectSchema = z.object({
	damageType: DamageTypeSchema.optional(),
	max: z.number().optional(),
	min: z.number().optional(),
	target: z.string().nonempty().optional(),
	type: EffectTypeSchema,
	difficulty: z.number().optional(),
	duration: z.number().optional(),
	modifier: z.union([z.number(), z.string()]).optional(),
	effect: z.string().optional(),
	properties: z.array(PropertySchema).optional(),
	accuracy: z.number().optional(),
	multiplier: z.number().optional(),
});
