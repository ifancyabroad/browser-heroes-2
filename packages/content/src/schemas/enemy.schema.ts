import { z } from "zod";
import {
	attributeSchema,
	attributesSchema,
	basicAttackSchema,
	damageTypeSchema,
	diceFormulaSchema,
	skillRefSchema,
	tacticSchema,
	zoneSchema,
} from "./common.schema";

export const enemyRankSchema = z.enum(["normal", "elite", "boss"]);

export const damageAffinitiesSchema = z
	.object({
		resistances: z.array(damageTypeSchema).default([]),
		immunities: z.array(damageTypeSchema).default([]),
		vulnerabilities: z.array(damageTypeSchema).default([]),
	})
	.superRefine((affinities, ctx) => {
		const groups = [
			["resistances", affinities.resistances],
			["immunities", affinities.immunities],
			["vulnerabilities", affinities.vulnerabilities],
		] as const;

		const seen = new Map<string, string>();

		for (const [groupName, damageTypes] of groups) {
			for (const damageType of damageTypes) {
				const existingGroup = seen.get(damageType);

				if (existingGroup) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `${damageType} cannot appear in both ${existingGroup} and ${groupName}`,
						path: [groupName],
					});
				}

				seen.set(damageType, groupName);
			}
		}
	});

export const enemyProficienciesSchema = z.object({
	savingThrows: z.array(attributeSchema).default([]),
});

export const enemyCombatSchema = z.object({
	hitDice: diceFormulaSchema,
	armourClass: z.number().int().positive(),
	proficiencyBonus: z.number().int().min(0).default(0),
	damageAffinities: damageAffinitiesSchema.default({
		resistances: [],
		immunities: [],
		vulnerabilities: [],
	}),
	basicAttack: basicAttackSchema,
	skills: z.array(skillRefSchema).default([]),
	featIds: z.array(z.string().nonempty()).default([]),
	tactic: tacticSchema.default("default"),
});

export const enemyEncounterSchema = z
	.object({
		zone: zoneSchema,
		minBattle: z.number().int().positive().optional(),
		maxBattle: z.number().int().positive().optional(),
		weight: z.number().positive().default(1),
	})
	.refine(
		(encounter) =>
			encounter.minBattle === undefined ||
			encounter.maxBattle === undefined ||
			encounter.maxBattle >= encounter.minBattle,
		{
			message: "maxBattle must be greater than or equal to minBattle",
			path: ["maxBattle"],
		},
	);

export const enemySchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	portrait: z.string().nonempty(),
	rank: enemyRankSchema.default("normal"),
	level: z.number().int().positive(),
	threat: z.number().int().positive().default(1),
	attributes: attributesSchema,
	combat: enemyCombatSchema,
	proficiencies: enemyProficienciesSchema,
	encounter: enemyEncounterSchema,
	tags: z.array(z.string().nonempty()).default([]),
});

export type Enemy = z.infer<typeof enemySchema>;
export type EnemyDefinition = Enemy;
export type EnemyRank = z.infer<typeof enemyRankSchema>;
