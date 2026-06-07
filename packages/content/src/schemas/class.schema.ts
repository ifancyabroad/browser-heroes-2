import { z } from "zod";
import {
	armourTypeSchema,
	attributesSchema,
	diceSchema,
	equipmentSchema,
	skillPoolSchema,
	weaponTypeSchema,
} from "./common.schema";

export const classTacticSchema = z.enum(["default", "aggressive", "defensive", "caster"]);

export const classProficienciesSchema = z.object({
	armourTypes: z.array(armourTypeSchema).default([]),
	weaponTypes: z.array(weaponTypeSchema).default([]),
});

export const classCombatSchema = z.object({
	hitDie: diceSchema,
	skillIds: z.array(z.string().nonempty()).default([]),
	featIds: z.array(z.string().nonempty()).default([]),
});

export const classSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	portrait: z.string().nonempty(),
	enemyPortrait: z.string().nonempty(),
	icon: z.string().nonempty(),
	attributes: attributesSchema,
	combat: classCombatSchema,
	proficiencies: classProficienciesSchema,
	skillPoolIds: z.array(skillPoolSchema).default([]),
	startingEquipment: equipmentSchema.optional(),
	tactic: classTacticSchema.default("default"),
	tags: z.array(z.string().nonempty()).default([]),
});

export type Class = z.infer<typeof classSchema>;
export type ClassTactic = z.infer<typeof classTacticSchema>;
export type ClassDefinition = Class;
