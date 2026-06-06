import { z } from "zod";
import {
	AttributesSchema,
	DamageTypeSchema,
	EquipmentSchema,
	ResistancesSchema,
} from "./common.schema";

export const EnemyZoneSchema = z.enum([
	"abyss",
	"castle",
	"desert",
	"dungeon",
	"forest",
	"hills",
	"ocean",
	"plains",
	"tower",
	"volcano",
]);

export const EnemyTacticSchema = z.enum(["caster", "concede", "default"]);

export const EnemySchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	portrait: z.string().nonempty(),
	boss: z.boolean(),
	challenge: z.number(),
	zone: EnemyZoneSchema,
	resistances: ResistancesSchema,
	skills: z.array(z.string().nonempty()),
	stats: AttributesSchema,
	tactics: EnemyTacticSchema,
	naturalArmourClass: z.number(),
	naturalMinDamage: z.number(),
	naturalMaxDamage: z.number(),
	naturalDamageType: DamageTypeSchema,
	equipment: EquipmentSchema.optional(),
});

export type Enemy = z.infer<typeof EnemySchema>;
