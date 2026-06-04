import { z } from "zod";

export const ArmourPropertySchema = z.object({
	name: z.string().nonempty(),
	type: z.enum(["resistance", "damage", "stat", "auxiliaryStat", "heal"]),
	value: z.number(),
});

export const ArmourSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().nonempty().optional(),
	icon: z.string().nonempty(),
	level: z.number(),
	price: z.number(),
	armourClass: z.number().optional(),
	armourType: z.enum(["light", "medium", "heavy", "cloth", "misc"]),
	properties: z.array(ArmourPropertySchema).optional(),
	characterClass: z.string().nonempty().optional(),
	type: z.enum(["amulet", "armour", "belt", "boots", "gloves", "helmet", "ring", "shield"]),
});

export type Armour = z.infer<typeof ArmourSchema>;

export const EffectSchema = z.object({
	damageType: z
		.enum([
			"acid",
			"cold",
			"crushing",
			"fire",
			"lightning",
			"necrotic",
			"piercing",
			"poison",
			"radiant",
			"slashing",
		])
		.optional(),
	max: z.number().optional(),
	min: z.number().optional(),
	target: z.enum(["enemy", "self"]).optional(),
	type: z.enum(["auxiliary", "damage", "heal", "status"]),
	difficulty: z.number().optional(),
	duration: z.number().optional(),
	modifier: z.number().optional(),
	effect: z.string().optional(),
	properties: z.array(ArmourPropertySchema).optional(),
});

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
	damageType: z.enum([
		"acid",
		"cold",
		"crushing",
		"fire",
		"lightning",
		"necrotic",
		"piercing",
		"poison",
		"radiant",
		"slashing",
	]),
	properties: z.array(ArmourPropertySchema).optional(),
	effects: z.array(EffectSchema).optional(),
});

export type Weapon = z.infer<typeof WeaponSchema>;
