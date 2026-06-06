import { z } from "zod";

export const engineEventSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("COMBAT_STARTED"),
		combatId: z.string(),
	}),

	z.object({
		type: z.literal("COMBAT_TURN_RESOLVED"),
	}),

	z.object({
		type: z.literal("COMBAT_ENDED"),
		outcome: z.enum(["victory", "defeat"]),
	}),

	z.object({
		type: z.literal("RETURNED_TO_TOWN"),
	}),

	z.object({
		type: z.literal("NEXT_COMBAT_READY"),
	}),
]);

export type EngineEvent = z.infer<typeof engineEventSchema>;
