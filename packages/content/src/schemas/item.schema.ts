import { z } from "zod";
import { damageTypeSchema } from "./common.schema";
import { effectSchema, propertySchema } from "./effect.schema";

export const armourSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().nonempty().optional(),
	icon: z.string().nonempty(),
	level: z.number(),
	price: z.number(),
	armourClass: z.number().optional(),
	armourType: z.enum(["light", "medium", "heavy", "cloth", "misc"]),
	properties: z.array(propertySchema).optional(),
	characterClass: z.string().nonempty().optional(),
	type: z.enum(["amulet", "armour", "belt", "boots", "gloves", "helmet", "ring", "shield"]),
});

export type Armour = z.infer<typeof armourSchema>;

export const weaponSchema = z.object({
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
	damageType: damageTypeSchema,
	properties: z.array(propertySchema).optional(),
	effects: z.array(effectSchema).optional(),
});

export type Weapon = z.infer<typeof weaponSchema>;
export type ArmourSlot = Armour["type"];
export type WeaponSize = Weapon["size"];
export type ItemDefinition = Armour | Weapon;
