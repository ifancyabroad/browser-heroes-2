import { z } from "zod";
import {
	attributeSchema,
	damageTypeSchema,
	diceFormulaSchema,
	weaponTypeSchema,
} from "./common.schema";
import { attackRiderSchema } from "./effect.schema";
import { itemModifierSchema, itemRaritySchema } from "./armour.schema";

export const weaponHandednessSchema = z.enum(["oneHanded", "twoHanded"]);

export const weaponRangeSchema = z.enum(["melee", "ranged"]);

export const weaponDamageSchema = z.object({
	dice: diceFormulaSchema,
	type: damageTypeSchema,
	attribute: attributeSchema,
});

export const weaponSchema = z.object({
	type: z.literal("weapon"),
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	icon: z.string().nonempty(),
	price: z.number().int().nonnegative(),
	rarity: itemRaritySchema.default("common"),
	weaponType: weaponTypeSchema,
	handedness: weaponHandednessSchema,
	range: weaponRangeSchema,
	damage: weaponDamageSchema,
	modifiers: z.array(itemModifierSchema).default([]),
	attackRiders: z.array(attackRiderSchema).default([]),
	tags: z.array(z.string().nonempty()).default([]),
});

export type WeaponHandedness = z.infer<typeof weaponHandednessSchema>;
export type WeaponRange = z.infer<typeof weaponRangeSchema>;
export type WeaponDamage = z.infer<typeof weaponDamageSchema>;
export type Weapon = z.infer<typeof weaponSchema>;
export type WeaponInput = z.input<typeof weaponSchema>;
