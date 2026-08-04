import { z } from "zod";
import {
	attributeSchema,
	damageTypeSchema,
	diceFormulaSchema,
	skillTargetSchema,
} from "./common.schema";
import {
	damageAffinityKindSchema,
	damageAffinityOperationSchema,
	damageModifierOperationSchema,
	combatStatSchema,
} from "./modifier.schema";

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

export const negatingSavingThrowSchema = savingThrowSchema.extend({
	onSuccess: z.literal("noEffect").default("noEffect"),
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
	})
	.refine((effect) => !effect.requiresAttackRoll || effect.attribute !== undefined, {
		message: "Attack-roll damage effects must provide an attribute",
		path: ["attribute"],
	});

export const healEffectSchema = z.object({
	type: z.literal("heal"),
	target: z.literal("self").default("self"),
	dice: diceFormulaSchema,
	attribute: attributeSchema.optional(),
});

export const statusEffectSchema = z.enum(["stunned", "silenced"]);

export const applyStatusEffectSchema = z.object({
	type: z.literal("applyStatus"),
	target: skillTargetSchema,
	statusId: statusEffectSchema,
	durationTurns: z.number().int().positive(),
	save: negatingSavingThrowSchema.optional(),
});

export const removeStatusEffectSchema = z
	.object({
		type: z.literal("removeStatus"),
		target: skillTargetSchema,
		statusIds: z.array(statusEffectSchema).default([]),
		allNegative: z.boolean().default(false),
		allPositive: z.boolean().default(false),
	})
	.refine((effect) => effect.statusIds.length > 0 || effect.allNegative || effect.allPositive, {
		message: "removeStatus effect must provide statusIds, allNegative, or allPositive",
		path: ["statusIds"],
	});

export const modifyStatEffectSchema = z.object({
	type: z.literal("modifyStat"),
	target: skillTargetSchema,
	stat: combatStatSchema,
	value: z.number(),
	durationTurns: z.number().int().positive(),
	save: negatingSavingThrowSchema.optional(),
});

export const modifyHealingEffectSchema = z.object({
	type: z.literal("modifyHealing"),
	target: skillTargetSchema,
	multiplier: z.number().nonnegative(),
	durationTurns: z.number().int().positive(),
	save: negatingSavingThrowSchema.optional(),
});

export const modifyDamageEffectSchema = z.object({
	type: z.literal("modifyDamage"),
	target: skillTargetSchema.default("self"),
	damageType: damageTypeSchema.optional(),
	operation: damageModifierOperationSchema,
	value: z.number(),
	durationTurns: z.number().int().positive(),
	save: negatingSavingThrowSchema.optional(),
});

export const modifyDamageTakenEffectSchema = z.object({
	type: z.literal("modifyDamageTaken"),
	target: skillTargetSchema,
	damageType: damageTypeSchema.optional(),
	operation: damageModifierOperationSchema,
	value: z.number(),
	durationTurns: z.number().int().positive(),
	save: negatingSavingThrowSchema.optional(),
});

export const modifyDamageAffinityEffectSchema = z.object({
	type: z.literal("modifyDamageAffinity"),
	target: skillTargetSchema,
	affinity: damageAffinityKindSchema,
	operation: damageAffinityOperationSchema,
	damageType: damageTypeSchema,
	durationTurns: z.number().int().positive(),
	save: negatingSavingThrowSchema.optional(),
});

export const rollTypeSchema = z.enum(["attack", "savingThrow"]);

export const rollModeSchema = z.enum(["advantage", "disadvantage"]);

export const automaticRollOutcomeSchema = z.enum([
	"automaticSuccess",
	"automaticFailure",
	"automaticCritical",
]);

export const rollModifierModeSchema = z.union([rollModeSchema, automaticRollOutcomeSchema]);

export const modifyRollEffectSchema = z
	.object({
		type: z.literal("modifyRoll"),
		target: skillTargetSchema,
		roll: rollTypeSchema,
		mode: rollModifierModeSchema,
		attribute: attributeSchema.optional(),
		charges: z.number().int().positive().optional(),
		durationTurns: z.number().int().positive(),
		save: negatingSavingThrowSchema.optional(),
	})
	.superRefine((effect, ctx) => {
		const automatic = automaticRollOutcomeSchema.safeParse(effect.mode).success;

		if (automatic && effect.charges === undefined) {
			ctx.addIssue({
				code: "custom",
				message: "Automatic roll outcomes require charges",
				path: ["charges"],
			});
		}

		if (effect.roll === "savingThrow" && effect.mode === "automaticCritical") {
			ctx.addIssue({
				code: "custom",
				message: "Automatic criticals can only modify attack rolls",
				path: ["mode"],
			});
		}
	});

export const damageOverTimeEffectSchema = z.object({
	type: z.literal("damageOverTime"),
	target: skillTargetSchema,
	damageType: damageTypeSchema,
	dice: diceFormulaSchema,
	durationTurns: z.number().int().positive(),
	save: negatingSavingThrowSchema.optional(),
});

export const healOverTimeEffectSchema = z.object({
	type: z.literal("healOverTime"),
	target: z.literal("self").default("self"),
	dice: diceFormulaSchema,
	durationTurns: z.number().int().positive(),
});

export const shieldEffectSchema = z.object({
	type: z.literal("shield"),
	target: z.literal("self").default("self"),
	amount: z.number().int().positive(),
	durationTurns: z.number().int().positive(),
});

export const riderEffectSchema = z.discriminatedUnion("type", [
	damageEffectSchema,
	healEffectSchema,
	applyStatusEffectSchema,
	modifyStatEffectSchema,
	modifyHealingEffectSchema,
	modifyDamageEffectSchema,
	modifyDamageTakenEffectSchema,
	modifyDamageAffinityEffectSchema,
	modifyRollEffectSchema,
	damageOverTimeEffectSchema,
	healOverTimeEffectSchema,
	shieldEffectSchema,
]);

export const attackRiderTimingSchema = z.enum(["onHit", "onCrit"]);

export const attackRiderSchema = z.object({
	timing: attackRiderTimingSchema,
	save: negatingSavingThrowSchema.optional(),
	effects: z.array(riderEffectSchema).min(1),
});

export const attackDamageEffectSchema = z
	.object({
		type: z.literal("attackDamage"),
		target: z.literal("enemy").default("enemy"),
		multiplier: z.number().positive().default(1),
		damageTypeOverride: damageTypeSchema.optional(),
		extraDice: diceFormulaSchema.optional(),
		extraDamageType: damageTypeSchema.optional(),
		rollMode: rollModeSchema.optional(),
		attackRiders: z.array(attackRiderSchema).default([]),
	})
	.refine((effect) => effect.extraDamageType === undefined || effect.extraDice !== undefined, {
		message: "extraDamageType requires extraDice",
		path: ["extraDamageType"],
	});

export const effectSchema = z.discriminatedUnion("type", [
	damageEffectSchema,
	attackDamageEffectSchema,
	healEffectSchema,
	applyStatusEffectSchema,
	removeStatusEffectSchema,
	modifyStatEffectSchema,
	modifyHealingEffectSchema,
	modifyDamageEffectSchema,
	modifyDamageTakenEffectSchema,
	modifyDamageAffinityEffectSchema,
	modifyRollEffectSchema,
	damageOverTimeEffectSchema,
	healOverTimeEffectSchema,
	shieldEffectSchema,
]);

export type StatusEffect = z.infer<typeof statusEffectSchema>;

export type SaveOutcome = z.infer<typeof saveOutcomeSchema>;
export type SavingThrow = z.infer<typeof savingThrowSchema>;
export type RollType = z.infer<typeof rollTypeSchema>;
export type RollMode = z.infer<typeof rollModeSchema>;
export type AutomaticRollOutcome = z.infer<typeof automaticRollOutcomeSchema>;
export type RollModifierMode = z.infer<typeof rollModifierModeSchema>;

export type RiderEffect = z.infer<typeof riderEffectSchema>;
export type AttackRiderTiming = z.infer<typeof attackRiderTimingSchema>;
export type AttackRider = z.infer<typeof attackRiderSchema>;

export type Effect = z.infer<typeof effectSchema>;

export type DamageEffect = z.infer<typeof damageEffectSchema>;
export type AttackDamageEffect = z.infer<typeof attackDamageEffectSchema>;
export type HealEffect = z.infer<typeof healEffectSchema>;
export type ApplyStatusEffect = z.infer<typeof applyStatusEffectSchema>;
export type RemoveStatusEffect = z.infer<typeof removeStatusEffectSchema>;
export type ModifyStatEffect = z.infer<typeof modifyStatEffectSchema>;
export type ModifyHealingEffect = z.infer<typeof modifyHealingEffectSchema>;
export type ModifyDamageEffect = z.infer<typeof modifyDamageEffectSchema>;
export type ModifyDamageTakenEffect = z.infer<typeof modifyDamageTakenEffectSchema>;
export type ModifyDamageAffinityEffect = z.infer<typeof modifyDamageAffinityEffectSchema>;
export type ModifyRollEffect = z.infer<typeof modifyRollEffectSchema>;
export type DamageOverTimeEffect = z.infer<typeof damageOverTimeEffectSchema>;
export type HealOverTimeEffect = z.infer<typeof healOverTimeEffectSchema>;
export type ShieldEffect = z.infer<typeof shieldEffectSchema>;
