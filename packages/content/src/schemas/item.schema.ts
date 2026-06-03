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
