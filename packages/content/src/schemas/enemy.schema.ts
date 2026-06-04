import { z } from "zod";

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

export const EnemyStatsSchema = z.object({
	charisma: z.number(),
	constitution: z.number(),
	dexterity: z.number(),
	intelligence: z.number(),
	strength: z.number(),
	wisdom: z.number(),
});

export const EnemyResistanceSchema = z.object({
	acid: z.number(),
	cold: z.number(),
	crushing: z.number(),
	fire: z.number(),
	lightning: z.number(),
	necrotic: z.number(),
	piercing: z.number(),
	poison: z.number(),
	radiant: z.number(),
	slashing: z.number(),
});

export const EnemyEquipmentSchema = z
	.object({
		body: z.string().nonempty().optional(),
		hand1: z.string().nonempty().optional(),
		hand2: z.string().nonempty().optional(),
		head: z.string().nonempty().optional(),
	})
	.optional();

export const EnemySchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	portrait: z.string().nonempty(),
	boss: z.boolean(),
	challenge: z.number(),
	zone: EnemyZoneSchema,
	resistances: EnemyResistanceSchema,
	skills: z.array(z.string().nonempty()).optional(),
	stats: EnemyStatsSchema,
	tactics: EnemyTacticSchema,
	naturalArmourClass: z.number(),
	naturalMinDamage: z.number(),
	naturalMaxDamage: z.number(),
	naturalDamageType: z.enum([
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
	equipment: EnemyEquipmentSchema,
});

export type Enemy = z.infer<typeof EnemySchema>;
