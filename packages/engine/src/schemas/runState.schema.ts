import { z } from "zod";
import { itemIdSchema } from "@app/content";
import { heroStateSchema } from "./heroState.schema";
import { combatStateSchema } from "./combatState.schema";
import { runLogEntrySchema } from "./log.schema";
import { rngStateSchema } from "./rng.schema";
import { pendingRewardChoiceSchema } from "./reward.schema";

export const runPhaseSchema = z.enum(["town", "combat", "dead", "retired"]);

export const townShopSlotSchema = z.object({
	id: z.string(),
	itemId: itemIdSchema,
	price: z.number().int().min(0),
	purchased: z.boolean(),
});

export const townStateSchema = z.object({
	shopSlots: z.array(townShopSlotSchema),
	rerollCost: z.number().int().min(0),
	restCost: z.number().int().min(0),
	rerollCount: z.number().int().min(0),
	restCount: z.number().int().min(0),
	shopLevel: z.number().int().min(1),
	healingPotionCost: z.number().int().min(0),
});

export const runStateSchema = z.object({
	version: z.number().int().min(1),
	id: z.string(),
	seed: z.string(),
	rngState: rngStateSchema,
	phase: runPhaseSchema,
	battleNumber: z.number().int().min(1),
	zoneNumber: z.number().int().min(1),
	endlessCycle: z.number().int().min(0),
	hero: heroStateSchema,
	combat: combatStateSchema.nullable(),
	town: townStateSchema.nullable(),
	pendingRewardChoice: pendingRewardChoiceSchema.nullable(),
	gold: z.number().int().min(0),
	streak: z.number().int().min(0),
	log: z.array(runLogEntrySchema),
});

export type RunPhase = z.infer<typeof runPhaseSchema>;
export type TownShopSlot = z.infer<typeof townShopSlotSchema>;
export type TownState = z.infer<typeof townStateSchema>;
export type RunState = z.infer<typeof runStateSchema>;
