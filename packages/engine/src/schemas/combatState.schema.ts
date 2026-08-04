import { z } from "zod";
import {
	attributeSchema,
	attributesSchema,
	basicAttackSchema,
	damageAffinitiesSchema,
	damageTypeSchema,
	featIdSchema,
	skillIdSchema,
	damageAffinityKindSchema,
	damageAffinityOperationSchema,
	combatStatSchema,
	statusEffectSchema,
	diceFormulaSchema,
	tacticSchema,
	damageModifierOperationSchema,
	rollModifierModeSchema,
	rollTypeSchema,
} from "@app/content";
import { combatLogEntrySchema } from "./log.schema";

export const combatantSideSchema = z.enum(["player", "enemy"]);

export const combatantIdSchema = z.string();

export const activeEffectSourceSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("skill"),
		skillId: skillIdSchema,
		sourceName: z.string().nonempty(),
		sourceEffectKey: z.string().nonempty(),
	}),
	z.object({
		type: z.literal("basicAttack"),
		sourceName: z.string().nonempty(),
		sourceEffectKey: z.string().nonempty(),
	}),
	z.object({
		type: z.literal("feat"),
		featId: featIdSchema,
		sourceName: z.string().nonempty(),
		sourceEffectKey: z.string().nonempty(),
	}),
]);

const activeCombatEffectBaseSchema = z.object({
	id: z.string(),
	sourceCombatantId: combatantIdSchema,
	source: activeEffectSourceSchema,
	remainingTurns: z.number().int().positive(),
});

export const activeStatModifierSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("modifyStat"),
	stat: combatStatSchema,
	value: z.number(),
});

export const activeHealingModifierSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("modifyHealing"),
	multiplier: z.number().nonnegative(),
});

export const activeDamageModifierSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("modifyDamage"),
	damageType: damageTypeSchema.optional(),
	operation: damageModifierOperationSchema,
	value: z.number(),
});

export const activeDamageTakenModifierSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("modifyDamageTaken"),
	damageType: damageTypeSchema.optional(),
	operation: damageModifierOperationSchema,
	value: z.number(),
});

export const activeDamageAffinityModifierSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("modifyDamageAffinity"),
	affinity: damageAffinityKindSchema,
	operation: damageAffinityOperationSchema,
	damageType: damageTypeSchema,
});

export const activeRollModifierSchema = activeCombatEffectBaseSchema
	.extend({
		type: z.literal("modifyRoll"),
		roll: rollTypeSchema,
		mode: rollModifierModeSchema,
		attribute: attributeSchema.optional(),
		remainingCharges: z.number().int().positive().optional(),
	})
	.superRefine((effect, ctx) => {
		if (effect.roll === "savingThrow" && effect.mode === "automaticCritical") {
			ctx.addIssue({
				code: "custom",
				message: "Automatic criticals can only modify attack rolls",
				path: ["mode"],
			});
		}
	});

export const activeStatusEffectSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("status"),
	statusId: statusEffectSchema,
});

export const activeDamageOverTimeEffectSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("damageOverTime"),
	damageType: damageTypeSchema,
	dice: diceFormulaSchema,
});

export const activeHealOverTimeEffectSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("healOverTime"),
	dice: diceFormulaSchema,
});

export const activeShieldEffectSchema = activeCombatEffectBaseSchema.extend({
	type: z.literal("shield"),
	remainingAmount: z.number().int().min(0),
});

export const activeCombatEffectSchema = z.discriminatedUnion("type", [
	activeStatModifierSchema,
	activeHealingModifierSchema,
	activeDamageModifierSchema,
	activeDamageTakenModifierSchema,
	activeDamageAffinityModifierSchema,
	activeRollModifierSchema,
	activeStatusEffectSchema,
	activeDamageOverTimeEffectSchema,
	activeHealOverTimeEffectSchema,
	activeShieldEffectSchema,
]);

export const combatantSkillStateSchema = z.object({
	skillId: skillIdSchema,
	chargesRemaining: z.number().int().min(0).optional(),
});

export const combatantBasicAttackSchema = basicAttackSchema.extend({
	proficient: z.boolean(),
});

export const combatantDamageModifierSchema = z.object({
	damageType: damageTypeSchema.optional(),
	operation: damageModifierOperationSchema,
	value: z.number(),
});

export const combatantCombatStatsSchema = z.object({
	armourClass: z.number().int().min(0),
	attackRollBonus: z.number(),
	savingThrowBonus: z.number(),
	saveDcBonus: z.number(),
	criticalRangeBonus: z.number().int().min(0),
	criticalDiceMultiplierBonus: z.number().int().min(0),
	healingMultiplier: z.number(),
	maxHpBonus: z.number(),
	damageAffinities: damageAffinitiesSchema,
	damageModifiers: z.array(combatantDamageModifierSchema),
	damageTakenModifiers: z.array(combatantDamageModifierSchema),
});

export const combatantStateSchema = z.object({
	id: combatantIdSchema,
	side: combatantSideSchema,
	sourceId: z.string(),
	name: z.string(),
	portrait: z.string(),
	level: z.number().int().min(1),
	maxHp: z.number().int().min(1),
	currentHp: z.number().int().min(0),
	attributes: attributesSchema,
	combatStats: combatantCombatStatsSchema,
	savingThrowProficiencies: z.array(attributeSchema),
	basicAttack: combatantBasicAttackSchema,
	offHandBasicAttack: combatantBasicAttackSchema.nullable(),
	skills: z.array(combatantSkillStateSchema),
	featIds: z.array(featIdSchema),
	activeEffects: z.array(activeCombatEffectSchema),
	tactic: tacticSchema,
});

export const combatStatusSchema = z.enum(["active", "player_won", "enemy_won"]);

export const combatStateSchema = z.object({
	id: z.string(),
	encounterType: z.enum(["standard", "boss", "ghost"]),
	turnNumber: z.number().int().min(1),
	activeActor: combatantSideSchema,
	player: combatantStateSchema,
	enemy: combatantStateSchema,
	log: z.array(combatLogEntrySchema),
	status: combatStatusSchema,
});

export type CombatantSide = z.infer<typeof combatantSideSchema>;
export type CombatantId = z.infer<typeof combatantIdSchema>;
export type CombatantBasicAttack = z.infer<typeof combatantBasicAttackSchema>;
export type CombatantSkillState = z.infer<typeof combatantSkillStateSchema>;
export type CombatantCombatStats = z.infer<typeof combatantCombatStatsSchema>;
export type CombatantState = z.infer<typeof combatantStateSchema>;
export type CombatStatus = z.infer<typeof combatStatusSchema>;
export type CombatState = z.infer<typeof combatStateSchema>;
export type ActiveStatModifier = z.infer<typeof activeStatModifierSchema>;
export type ActiveHealingModifier = z.infer<typeof activeHealingModifierSchema>;
export type ActiveDamageModifier = z.infer<typeof activeDamageModifierSchema>;
export type ActiveDamageTakenModifier = z.infer<typeof activeDamageTakenModifierSchema>;
export type ActiveDamageAffinityModifier = z.infer<typeof activeDamageAffinityModifierSchema>;
export type ActiveRollModifier = z.infer<typeof activeRollModifierSchema>;
export type ActiveStatusEffect = z.infer<typeof activeStatusEffectSchema>;
export type ActiveDamageOverTimeEffect = z.infer<typeof activeDamageOverTimeEffectSchema>;
export type ActiveHealOverTimeEffect = z.infer<typeof activeHealOverTimeEffectSchema>;
export type ActiveShieldEffect = z.infer<typeof activeShieldEffectSchema>;
export type ActiveCombatEffect = z.infer<typeof activeCombatEffectSchema>;
export type ActiveEffectSource = z.infer<typeof activeEffectSourceSchema>;
