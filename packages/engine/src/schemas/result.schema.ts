import { z } from "zod";
import { engineEventSchema, type EngineEvent } from "./event.schema";
import { runStateSchema, type RunState } from "./runState.schema";

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
	"NO_LEVEL_UP_REROLLS_REMAINING",
	"NO_ALTERNATIVE_LEVEL_UP_OPTIONS",
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
	"SHOP_SLOT_NOT_FOUND",
	"SHOP_SLOT_ALREADY_PURCHASED",
	"ITEM_DEFINITION_NOT_FOUND",
	"NO_HEALING_POTIONS_AVAILABLE",
	"CONSUMABLE_NOT_USABLE",
	"HEALING_POTIONS_FULL",
	"CONSUMABLE_NOT_AVAILABLE",
	"NO_ELIGIBLE_ITEM_BASE",
]);

export type EngineErrorCode = z.infer<typeof engineErrorCodeSchema>;

export type EngineSuccessResult = {
	ok: true;
	state: RunState;
	events: EngineEvent[];
};

export type EngineFailureResult = {
	ok: false;
	state: RunState;
	events: EngineEvent[];
	error: EngineErrorCode;
};

export type EngineResult = EngineSuccessResult | EngineFailureResult;

export const engineSuccessResultSchema: z.ZodType<EngineSuccessResult> = z.object({
	ok: z.literal(true),
	state: runStateSchema,
	events: z.array(engineEventSchema),
});

export const engineFailureResultSchema: z.ZodType<EngineFailureResult> = z.object({
	ok: z.literal(false),
	state: runStateSchema,
	events: z.array(engineEventSchema),
	error: engineErrorCodeSchema,
});

export const engineResultSchema: z.ZodType<EngineResult> = z.union([
	engineSuccessResultSchema,
	engineFailureResultSchema,
]);
