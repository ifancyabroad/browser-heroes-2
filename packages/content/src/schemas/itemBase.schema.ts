import { z } from "zod";

import {
	attributeSchema,
	damageTypeSchema,
	diceFormulaSchema,
	weaponTypeSchema,
} from "./common.schema";
import { bodyArmourCategorySchema } from "./armour.schema";
import { weaponHandednessSchema, weaponRangeSchema } from "./weapon.schema";

const itemBaseCommonSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	iconPool: z.array(z.string().nonempty()).min(1),
	basePrice: z.number().int().positive(),
	tags: z.array(z.string().nonempty()).default([]),
});

export const weaponItemBaseSchema = itemBaseCommonSchema.extend({
	type: z.literal("weapon"),
	weaponType: weaponTypeSchema,
	handedness: weaponHandednessSchema,
	range: weaponRangeSchema,
	damage: z.object({
		dice: diceFormulaSchema,
		type: damageTypeSchema,
		attribute: attributeSchema,
	}),
});

export const bodyArmourItemBaseSchema = itemBaseCommonSchema.extend({
	type: z.literal("armour"),
	slot: z.literal("body"),
	category: bodyArmourCategorySchema,
	armourClass: z.number().int().positive(),
});

export const shieldItemBaseSchema = itemBaseCommonSchema.extend({
	type: z.literal("armour"),
	slot: z.literal("shield"),
	armourClass: z.number().int().positive(),
});

export const accessoryItemBaseSchema = itemBaseCommonSchema.extend({
	type: z.literal("armour"),
	slot: z.enum(["helmet", "gloves", "boots", "belt", "amulet", "ring"]),
});

export const armourItemBaseSchema = z.union([
	bodyArmourItemBaseSchema,
	shieldItemBaseSchema,
	accessoryItemBaseSchema,
]);

export const itemBaseSchema = z.union([weaponItemBaseSchema, armourItemBaseSchema]);

export type WeaponItemBaseDefinition = z.infer<typeof weaponItemBaseSchema>;
export type BodyArmourItemBaseDefinition = z.infer<typeof bodyArmourItemBaseSchema>;
export type ShieldItemBaseDefinition = z.infer<typeof shieldItemBaseSchema>;
export type AccessoryItemBaseDefinition = z.infer<typeof accessoryItemBaseSchema>;
export type ArmourItemBaseDefinition = z.infer<typeof armourItemBaseSchema>;
export type ItemBaseDefinition = z.infer<typeof itemBaseSchema>;

export type WeaponItemBaseDefinitionInput = z.input<typeof weaponItemBaseSchema>;
export type BodyArmourItemBaseDefinitionInput = z.input<typeof bodyArmourItemBaseSchema>;
export type ShieldItemBaseDefinitionInput = z.input<typeof shieldItemBaseSchema>;
export type AccessoryItemBaseDefinitionInput = z.input<typeof accessoryItemBaseSchema>;
export type ArmourItemBaseDefinitionInput = z.input<typeof armourItemBaseSchema>;
export type ItemBaseDefinitionInput = z.input<typeof itemBaseSchema>;
