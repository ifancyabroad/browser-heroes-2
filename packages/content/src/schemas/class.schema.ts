import { z } from "zod";

export const ClassTacticSchema = z.enum(["caster", "default"]);

export const ClassEquipmentSchema = z
	.object({
		body: z.string().nonempty().optional(),
		hand1: z.string().nonempty().optional(),
		hand2: z.string().nonempty().optional(),
	})
	.optional();

export const ClassStatsSchema = z.object({
	charisma: z.number(),
	constitution: z.number(),
	dexterity: z.number(),
	intelligence: z.number(),
	strength: z.number(),
	wisdom: z.number(),
});

export const ClassSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().nonempty().optional(),
	portrait: z.string().nonempty(),
	fallenImage: z.string().nonempty(),
	icon: z.string().nonempty(),
	skillClasses: z.array(
		z.enum([
			"assassin",
			"barbarian",
			"cleric",
			"mage",
			"occultist",
			"rogue",
			"warlock",
			"warrior",
		]),
	),
	armourTypes: z.array(z.enum(["cloth", "heavy", "light", "medium", "misc"])),
	weaponTypes: z.array(
		z.enum([
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
	),
	skills: z.array(z.string().nonempty()),
	stats: ClassStatsSchema,
	tactics: ClassTacticSchema,
	equipment: ClassEquipmentSchema,
});

export type Class = z.infer<typeof ClassSchema>;
