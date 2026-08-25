import { z } from "zod";
import {
	attributeSchema,
	attributesSchema,
	damageAffinitiesSchema,
	hitDieSchema,
	tacticSchema,
	zoneSchema,
} from "./common.schema";
import { basicAttackSchema } from "./attack.schema";

export const enemyRankSchema = z.enum(["normal", "elite", "boss"]);

export const enemyProficienciesSchema = z.object({
	savingThrows: z.array(attributeSchema).default([]),
});

export const enemyCombatSchema = z.object({
	hitDie: hitDieSchema,
	armourClass: z.number().int().positive(),
	damageAffinities: damageAffinitiesSchema.default({
		resistances: [],
		immunities: [],
		vulnerabilities: [],
	}),
	basicAttack: basicAttackSchema,
	skillIds: z.array(z.string().nonempty()).default([]),
	featIds: z.array(z.string().nonempty()).default([]),
	tactic: tacticSchema.default("default"),
});

export const enemyEncounterSchema = z.object({
	zone: zoneSchema,
	weight: z.number().positive().default(1),
});

export const enemySchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	portrait: z.string().nonempty(),
	rank: enemyRankSchema.default("normal"),
	threat: z.number().int().positive().default(1),
	attributes: attributesSchema,
	combat: enemyCombatSchema,
	proficiencies: enemyProficienciesSchema,
	encounter: enemyEncounterSchema,
	tags: z.array(z.string().nonempty()).default([]),
});

export type EnemyDefinition = z.infer<typeof enemySchema>;
export type EnemyDefinitionInput = z.input<typeof enemySchema>;
export type EnemyRank = z.infer<typeof enemyRankSchema>;
