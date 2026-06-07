import { z } from "zod";
import {
	attributeSchema,
	damageTypeSchema,
	diceFormulaSchema,
	skillTargetSchema,
} from "./common.schema";

export const damageEffectSchema = z.object({
	type: z.literal("damage"),
	target: skillTargetSchema.default("enemy"),
	damageType: damageTypeSchema,
	dice: diceFormulaSchema,

	/**
	 * Optional attribute modifier added to damage.
	 * Example: 1d8 + STR mod, 2d6 + INT mod.
	 */
	attribute: attributeSchema.optional(),
});

export const weaponDamageEffectSchema = z.object({
	type: z.literal("weaponDamage"),
	target: skillTargetSchema.default("enemy"),

	/**
	 * Multiplier applied to the combatant's basic attack damage.
	 * Example: 1.5 = 150% weapon/basic attack damage.
	 */
	multiplier: z.number().positive().default(1),
	damageTypeOverride: damageTypeSchema.optional(),
	extraDice: diceFormulaSchema.optional(),
	extraDamageType: damageTypeSchema.optional(),
});

export const healEffectSchema = z.object({
	type: z.literal("heal"),
	target: skillTargetSchema.default("self"),
	dice: diceFormulaSchema,

	/**
	 * Optional attribute modifier added to healing.
	 */
	attribute: attributeSchema.optional(),
});

export const applyStatusEffectSchema = z.object({
	type: z.literal("applyStatus"),
	target: skillTargetSchema,
	statusId: z.string().nonempty(),
	durationTurns: z.number().int().positive(),
});

export const modifyStatEffectSchema = z.object({
	type: z.literal("modifyStat"),
	target: skillTargetSchema,
	stat: z.enum([
		"armourClass",
		"proficiencyBonus",
		"strength",
		"dexterity",
		"constitution",
		"intelligence",
		"wisdom",
		"charisma",
	]),
	operation: z.enum(["add", "multiply", "set"]),
	value: z.number(),

	/**
	 * If omitted, treat as lasting for the whole combat or until removed,
	 * depending on your engine rules.
	 */
	durationTurns: z.number().int().positive().optional(),
});

export const cleanseEffectSchema = z.object({
	type: z.literal("cleanse"),
	target: skillTargetSchema.default("self"),

	/**
	 * If provided, removes only these statuses.
	 */
	statusIds: z.array(z.string().nonempty()).default([]),

	/**
	 * If true, removes all negative statuses.
	 */
	allNegative: z.boolean().default(false),
});

export const effectSchema = z.discriminatedUnion("type", [
	damageEffectSchema,
	weaponDamageEffectSchema,
	healEffectSchema,
	applyStatusEffectSchema,
	modifyStatEffectSchema,
	cleanseEffectSchema,
]);

export type Effect = z.infer<typeof effectSchema>;
export type DamageEffect = z.infer<typeof damageEffectSchema>;
export type WeaponDamageEffect = z.infer<typeof weaponDamageEffectSchema>;
export type HealEffect = z.infer<typeof healEffectSchema>;
export type ApplyStatusEffect = z.infer<typeof applyStatusEffectSchema>;
export type ModifyStatEffect = z.infer<typeof modifyStatEffectSchema>;
export type CleanseEffect = z.infer<typeof cleanseEffectSchema>;
