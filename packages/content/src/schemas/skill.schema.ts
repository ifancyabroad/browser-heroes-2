import { z } from "zod";
import { effectSchema } from "./effect.schema";

export const skillSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().nonempty().optional(),
	icon: z.string().nonempty(),
	level: z.number(),
	price: z.number(),
	maxUses: z.number(),
	class: z.enum([
		"assassin",
		"barbarian",
		"cleric",
		"common",
		"mage",
		"occultist",
		"rogue",
		"unique",
		"warlock",
		"warrior",
	]),
	target: z.enum(["enemy"]).optional(),
	effects: z.array(effectSchema).optional(),
});

export type Skill = z.infer<typeof skillSchema>;
export type SkillClass = Skill["class"];
export type SkillTarget = NonNullable<Skill["target"]>;
export type SkillDefinition = Skill;
