import { z } from "zod";
import {
	attributesSchema,
	damageTypeSchema,
	equipmentSchema,
	resistancesSchema,
} from "./common.schema";

export const enemyZoneSchema = z.enum([
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

export const enemyTacticSchema = z.enum(["caster", "concede", "default"]);

export const enemySchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	portrait: z.string().nonempty(),
	boss: z.boolean(),
	challenge: z.number(),
	zone: enemyZoneSchema,
	resistances: resistancesSchema,
	skills: z.array(z.string().nonempty()),
	stats: attributesSchema,
	tactics: enemyTacticSchema,
	naturalArmourClass: z.number(),
	naturalMinDamage: z.number(),
	naturalMaxDamage: z.number(),
	naturalDamageType: damageTypeSchema,
	equipment: equipmentSchema.optional(),
});

export type Enemy = z.infer<typeof enemySchema>;
export type EnemyZone = z.infer<typeof enemyZoneSchema>;
export type EnemyTactic = z.infer<typeof enemyTacticSchema>;
export type EnemyDefinition = Enemy;
