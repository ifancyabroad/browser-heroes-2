import { damageTypeSchema } from "@app/content";
import { z } from "zod";

export const logActorSchema = z.enum(["system", "player", "enemy"]);

const combatLogEntryContentBaseSchema = z.object({
	message: z.string(),
});

const combatDamageOutcomeSchema = z.object({
	type: z.literal("damage"),
	targetId: z.string(),
	hpDamage: z.number().int().min(0),
	absorbedDamage: z.number().int().min(0),
	damageType: damageTypeSchema,
	affinity: z.enum(["normal", "resistant", "immune", "vulnerable"]),
	critical: z.boolean(),
	halfDamageSave: z.boolean(),
});

const combatMissOutcomeSchema = z.object({
	type: z.literal("miss"),
	targetId: z.string(),
});

const otherCombatLogEventTypeSchema = z.enum([
	"combat_started",
	"basic_attack",
	"skill_used",
	"effect_applied",
	"effect_resisted",
	"effect_expired",
	"healing_done",
	"combat_ended",
	"turn_skipped",
	"healing_potion_used",
	"combatant_slain",
	"reward_gained",
]);

const combatLogEntryContentSchema = z.union([
	combatLogEntryContentBaseSchema.extend({
		eventType: z.literal("damage_dealt"),
		outcome: combatDamageOutcomeSchema,
	}),
	combatLogEntryContentBaseSchema.extend({
		eventType: z.literal("attack_missed"),
		outcome: combatMissOutcomeSchema,
	}),
	combatLogEntryContentBaseSchema.extend({
		eventType: z.literal("effect_triggered"),
		outcome: combatDamageOutcomeSchema.optional(),
	}),
	combatLogEntryContentBaseSchema.extend({
		eventType: otherCombatLogEventTypeSchema.optional(),
		outcome: z.never().optional(),
	}),
]);

const combatLogEntryInputSchema = z.intersection(
	z.object({
		turnNumber: z.number().int().min(1),
		actor: logActorSchema,
	}),
	combatLogEntryContentSchema,
);

export const combatLogEntrySchema = z.intersection(
	z.object({ id: z.string() }),
	combatLogEntryInputSchema,
);

export const runLogEntrySchema = z.object({
	id: z.string(),
	message: z.string(),
	eventType: z
		.enum([
			"run_started",
			"entered_town",
			"entered_combat",
			"combat_won",
			"combat_lost",
			"level_up",
			"item_acquired",
			"item_purchased",
		])
		.optional(),
});

export type LogActor = z.infer<typeof logActorSchema>;
export type CombatLogEntry = z.infer<typeof combatLogEntrySchema>;
export type CombatLogOutcome = NonNullable<CombatLogEntry["outcome"]>;
export type CombatLogEntryContent = z.infer<typeof combatLogEntryContentSchema>;
export type CombatLogEntryInput = z.infer<typeof combatLogEntryInputSchema>;
export type RunLogEntry = z.infer<typeof runLogEntrySchema>;
