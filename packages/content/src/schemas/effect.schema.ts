import { z } from "zod";
import {
	attributeSchema,
	damageTypeSchema,
	diceFormulaSchema,
	skillTargetSchema,
} from "./common.schema";

export const modifiableStatSchema = z.enum([
	"armourClass",
	"damageReduction",
	"proficiencyBonus",
	"attackRollBonus",
	"savingThrowBonus",
	"saveDcBonus",
	"critChance",
	"critMultiplier",
	"healingMultiplier",
	"strength",
	"dexterity",
	"constitution",
	"intelligence",
	"wisdom",
	"charisma",
]);

export const modifierOperationSchema = z.enum(["add", "multiply", "set"]);

export const saveOutcomeSchema = z.enum(["noEffect", "halfDamage"]);

export const saveDcSchema = z.object({
	base: z.number().int().default(8),
	attribute: attributeSchema,
	includeProficiency: z.boolean().default(true),
	bonus: z.number().int().default(0),
});

export const savingThrowSchema = z.object({
	attribute: attributeSchema,
	dc: saveDcSchema,
	onSuccess: saveOutcomeSchema.default("noEffect"),
});

export const damageEffectSchema = z
	.object({
		type: z.literal("damage"),
		target: skillTargetSchema.default("enemy"),
		damageType: damageTypeSchema,
		dice: diceFormulaSchema,
		attribute: attributeSchema.optional(),
		requiresAttackRoll: z.boolean().default(false),
		save: savingThrowSchema.optional(),
	})
	.refine((effect) => !(effect.requiresAttackRoll && effect.save), {
		message: "Damage effect should not require both an attack roll and a saving throw",
		path: ["save"],
	});

export const healEffectSchema = z.object({
	type: z.literal("heal"),
	target: z.literal("self").default("self"),
	dice: diceFormulaSchema,
	attribute: attributeSchema.optional(),
});

export const statusEffectSchema = z.enum([
	"bleeding",
	"burning",
	"poisoned",
	"stunned",
	"frozen",
	"weakened",
	"vulnerable",
	"shielded",
	"regenerating",
]);

export const applyStatusEffectSchema = z.object({
	type: z.literal("applyStatus"),
	target: skillTargetSchema,
	statusId: statusEffectSchema,
	durationTurns: z.number().int().positive(),
});

export const modifyStatEffectSchema = z.object({
	type: z.literal("modifyStat"),
	target: skillTargetSchema,
	stat: modifiableStatSchema,
	operation: modifierOperationSchema,
	value: z.number(),
	durationTurns: z.number().int().positive().optional(),
});

export const modifyDamageEffectSchema = z.object({
	type: z.literal("modifyDamage"),
	target: skillTargetSchema.default("self"),
	damageType: damageTypeSchema.optional(),
	operation: z.enum(["add", "multiply"]),
	value: z.number(),
	durationTurns: z.number().int().positive().optional(),
});

export const cleanseEffectSchema = z.object({
	type: z.literal("cleanse"),
	target: z.literal("self").default("self"),
	statusIds: z.array(statusEffectSchema).default([]),
	allNegative: z.boolean().default(false),
});

export const riderEffectSchema = z.discriminatedUnion("type", [
	damageEffectSchema,
	healEffectSchema,
	applyStatusEffectSchema,
	modifyStatEffectSchema,
	modifyDamageEffectSchema,
	cleanseEffectSchema,
]);

export const attackRiderTimingSchema = z.enum(["onHit", "onCrit"]);

export const attackRiderSchema = z.object({
	timing: attackRiderTimingSchema,
	save: savingThrowSchema.optional(),
	effects: z.array(riderEffectSchema).min(1),
});

export const attackDamageEffectSchema = z.object({
	type: z.literal("attackDamage"),
	target: z.literal("enemy").default("enemy"),
	multiplier: z.number().positive().default(1),
	damageTypeOverride: damageTypeSchema.optional(),
	extraDice: diceFormulaSchema.optional(),
	extraDamageType: damageTypeSchema.optional(),
	attackRiders: z.array(attackRiderSchema).default([]),
});

export const effectSchema = z.discriminatedUnion("type", [
	damageEffectSchema,
	attackDamageEffectSchema,
	healEffectSchema,
	applyStatusEffectSchema,
	modifyStatEffectSchema,
	modifyDamageEffectSchema,
	cleanseEffectSchema,
]);

export type StatusEffect = z.infer<typeof statusEffectSchema>;

export type SaveOutcome = z.infer<typeof saveOutcomeSchema>;
export type SavingThrow = z.infer<typeof savingThrowSchema>;

export type RiderEffect = z.infer<typeof riderEffectSchema>;
export type AttackRiderTiming = z.infer<typeof attackRiderTimingSchema>;
export type AttackRider = z.infer<typeof attackRiderSchema>;

export type Effect = z.infer<typeof effectSchema>;

export type DamageEffect = z.infer<typeof damageEffectSchema>;
export type AttackDamageEffect = z.infer<typeof attackDamageEffectSchema>;
export type HealEffect = z.infer<typeof healEffectSchema>;
export type ApplyStatusEffect = z.infer<typeof applyStatusEffectSchema>;
export type ModifyStatEffect = z.infer<typeof modifyStatEffectSchema>;
export type ModifyDamageEffect = z.infer<typeof modifyDamageEffectSchema>;
export type CleanseEffect = z.infer<typeof cleanseEffectSchema>;
