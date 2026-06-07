import { z } from "zod";
import {
	armourTypeSchema,
	attributesSchema,
	diceFormulaSchema,
	equipmentSchema,
	skillPoolSchema,
	tacticSchema,
	weaponTypeSchema,
} from "./common.schema";

export const classProficienciesSchema = z.object({
	armourTypes: z.array(armourTypeSchema).default([]),
	weaponTypes: z.array(weaponTypeSchema).default([]),
});

export const classCombatSchema = z.object({
	hitDie: diceFormulaSchema,
	skillIds: z.array(z.string().nonempty()).default([]),
	featIds: z.array(z.string().nonempty()).default([]),
	tactic: tacticSchema.default("default"),
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
	tags: z.array(z.string().nonempty()).default([]),
});

export type Class = z.infer<typeof classSchema>;
export type ClassDefinition = Class;
