import { z } from "zod";
import { DamageTypeSchema } from "./common.schema";
import { EffectSchema, PropertySchema } from "./effect.schema";

export const ArmourSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().nonempty().optional(),
	icon: z.string().nonempty(),
	level: z.number(),
	price: z.number(),
	armourClass: z.number().optional(),
	armourType: z.enum(["light", "medium", "heavy", "cloth", "misc"]),
	properties: z.array(PropertySchema).optional(),
	characterClass: z.string().nonempty().optional(),
	type: z.enum(["amulet", "armour", "belt", "boots", "gloves", "helmet", "ring", "shield"]),
});

export type Armour = z.infer<typeof ArmourSchema>;

export const WeaponSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().nonempty().optional(),
	icon: z.string().nonempty(),
	level: z.number(),
	price: z.number(),
	min: z.number(),
	max: z.number(),
	size: z.enum(["oneHanded", "twoHanded"]),
	type: z.literal("weapon"),
	weaponType: z.enum([
		"axe",
		"bow",
		"club",
		"crossbow",
		"dagger",
		"hammer",
		"mace",
		"spear",
		"staff",
		"sword",
		"wand",
	]),
	damageType: DamageTypeSchema,
	properties: z.array(PropertySchema).optional(),
	effects: z.array(EffectSchema).optional(),
});

export type Weapon = z.infer<typeof WeaponSchema>;
