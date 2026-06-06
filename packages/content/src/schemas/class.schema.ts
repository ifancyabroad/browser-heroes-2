import { z } from "zod";
import { attributesSchema, equipmentSchema } from "./common.schema";

export const classTacticSchema = z.enum(["caster", "default"]);

export const classSchema = z.object({
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
	stats: attributesSchema,
	tactics: classTacticSchema,
	equipment: equipmentSchema.optional(),
});

export type Class = z.infer<typeof classSchema>;
