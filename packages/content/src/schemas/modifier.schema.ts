import { z } from "zod";
import { damageTypeSchema } from "./common.schema";

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

export const damageAffinityKindSchema = z.enum(["resistance", "immunity", "vulnerability"]);

export const damageAffinityOperationSchema = z.enum(["add", "remove"]);

export const passiveStatModifierSchema = z.object({
	type: z.literal("modifyStat"),
	stat: modifiableStatSchema,
	operation: modifierOperationSchema,
	value: z.number(),
});

export const passiveDamageModifierSchema = z.object({
	type: z.literal("modifyDamage"),
	damageType: damageTypeSchema.optional(),
	operation: z.enum(["add", "multiply"]),
	value: z.number(),
});

export const passiveDamageAffinityModifierSchema = z.object({
	type: z.literal("modifyDamageAffinity"),
	affinity: damageAffinityKindSchema,
	operation: damageAffinityOperationSchema,
	damageType: damageTypeSchema,
});

export const passiveModifierSchema = z.discriminatedUnion("type", [
	passiveStatModifierSchema,
	passiveDamageModifierSchema,
	passiveDamageAffinityModifierSchema,
]);

export type PassiveModifier = z.infer<typeof passiveModifierSchema>;
