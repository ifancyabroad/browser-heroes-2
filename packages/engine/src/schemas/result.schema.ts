import { z } from "zod";
import { runStateSchema } from "./runState.schema";
import { engineEventSchema } from "./event.schema";

export const engineErrorCodeSchema = z.enum([
	"INVALID_PHASE",
	"INVALID_ACTION",
	"COMBAT_NOT_ACTIVE",
	"RUN_ENDED",
	"VALIDATION_FAILED",
	"NO_ELIGIBLE_ENEMY",
	"ENEMY_DEFINITION_NOT_FOUND",
	"LEVEL_UP_NOT_AVAILABLE",
	"INVALID_LEVEL_UP_SELECTION",
]);

export const engineSuccessResultSchema = z.object({
	ok: z.literal(true),
	state: runStateSchema,
	events: z.array(engineEventSchema),
});

export const engineFailureResultSchema = z.object({
	ok: z.literal(false),
	state: runStateSchema,
	events: z.array(engineEventSchema),
	error: engineErrorCodeSchema,
});

export const engineResultSchema = z.discriminatedUnion("ok", [
	engineSuccessResultSchema,
	engineFailureResultSchema,
]);

export type EngineErrorCode = z.infer<typeof engineErrorCodeSchema>;
export type EngineSuccessResult = z.infer<typeof engineSuccessResultSchema>;
export type EngineFailureResult = z.infer<typeof engineFailureResultSchema>;
export type EngineResult = z.infer<typeof engineResultSchema>;
