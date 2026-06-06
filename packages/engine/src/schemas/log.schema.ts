import { z } from "zod";

export const logActorSchema = z.enum(["system", "player", "enemy"]);

export const combatLogEntrySchema = z.object({
	id: z.string(),
	turnNumber: z.number().int().min(1),
	actor: logActorSchema,
	message: z.string(),
	// Optional for now, but useful later for richer UI/replay/debugging.
	eventType: z
		.enum([
			"combat_started",
			"basic_attack",
			"skill_used",
			"effect_applied",
			"effect_expired",
			"damage_dealt",
			"healing_done",
			"combat_ended",
		])
		.optional(),
});

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
			"run_completed",
		])
		.optional(),
});

export type LogActor = z.infer<typeof logActorSchema>;
export type CombatLogEntry = z.infer<typeof combatLogEntrySchema>;
export type RunLogEntry = z.infer<typeof runLogEntrySchema>;
