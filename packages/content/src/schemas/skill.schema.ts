import { z } from "zod";
import { EffectSchema } from "./effect.schema";

export const SkillSchema = z.object({
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
	effects: z.array(EffectSchema).optional(),
});

export type Skill = z.infer<typeof SkillSchema>;
