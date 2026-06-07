import { z } from "zod";
import { effectSchema } from "./effect.schema";
import {
	attributeSchema,
	skillCategorySchema,
	skillPoolSchema,
	skillTargetSchema,
} from "./common.schema";

export const saveOutcomeSchema = z.enum(["noEffect", "halfDamage"]);

export const saveDcSchema = z.object({
	/**
	 * DnD-style default:
	 * 8 + source attribute modifier + proficiency bonus
	 */
	base: z.number().int().default(8),

	/**
	 * Attribute used by the skill user to calculate the DC.
	 * Example: mage = intelligence, cleric = wisdom.
	 */
	attribute: attributeSchema,
	includeProficiency: z.boolean().default(true),
	bonus: z.number().int().default(0),
});

export const savingThrowSchema = z.object({
	/**
	 * Attribute rolled by the target.
	 * Example: poison = constitution, fire burst = dexterity.
	 */
	attribute: attributeSchema,
	dc: saveDcSchema,
	onSuccess: saveOutcomeSchema.default("noEffect"),
});

export const skillUsageSchema = z
	.object({
		target: skillTargetSchema,

		/**
		 * Number of times usable per combat.
		 * Omit for unlimited use.
		 */
		maxUses: z.number().int().positive().optional(),

		/**
		 * Whether the skill requires an attack roll against armour class.
		 */
		requiresAttackRoll: z.boolean().default(false),

		/**
		 * Optional saving throw made by the target.
		 */
		save: savingThrowSchema.optional(),
	})
	.refine((usage) => !(usage.requiresAttackRoll && usage.save), {
		message: "A skill should not require both an attack roll and a saving throw",
		path: ["save"],
	});

export const skillRankBaseSchema = z.object({
	description: z.string().optional(),
	effects: z.array(effectSchema).min(1),
});

export const skillRankOneSchema = skillRankBaseSchema.extend({
	rank: z.literal(1),
});

export const skillRankTwoSchema = skillRankBaseSchema.extend({
	rank: z.literal(2),
});

export const skillRankThreeSchema = skillRankBaseSchema.extend({
	rank: z.literal(3),
});

export const skillRanksSchema = z.tuple([
	skillRankOneSchema,
	skillRankTwoSchema,
	skillRankThreeSchema,
]);

/**
 * Main skill definition
 */

export const skillSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	icon: z.string().nonempty(),

	/**
	 * Each skill belongs to exactly one pool.
	 * Classes can gain access to one or more pools.
	 */
	pool: skillPoolSchema,
	category: skillCategorySchema,
	usage: skillUsageSchema,

	/**
	 * Exactly three rank definitions.
	 */
	ranks: skillRanksSchema,
	tags: z.array(z.string().nonempty()).default([]),
});

export type SkillUsage = z.infer<typeof skillUsageSchema>;
export type SkillRank = z.infer<typeof skillRanksSchema>[number];
export type Skill = z.infer<typeof skillSchema>;
export type SkillDefinition = Skill;
export type SaveOutcome = z.infer<typeof saveOutcomeSchema>;
export type SavingThrow = z.infer<typeof savingThrowSchema>;
