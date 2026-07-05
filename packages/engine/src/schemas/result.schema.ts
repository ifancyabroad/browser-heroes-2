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
	"SKILL_NOT_KNOWN",
	"SKILL_HAS_NO_USES_REMAINING",
	"SKILL_EFFECT_NOT_SUPPORTED",
	"PLAYER_CANNOT_ACT",
	"PLAYER_IS_SILENCED",
	"LEVEL_UP_REQUIRED",
	"REWARD_SELECTION_REQUIRED",
	"REWARD_NOT_AVAILABLE",
	"INVALID_REWARD_SELECTION",
	"INVALID_EQUIPMENT_SLOT",
	"TOWN_NOT_AVAILABLE",
	"NOT_ENOUGH_GOLD",
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
