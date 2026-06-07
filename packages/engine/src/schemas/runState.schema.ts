import { z } from "zod";
import { heroStateSchema } from "./heroState.schema";
import { combatStateSchema } from "./combatState.schema";
import { runLogEntrySchema } from "./log.schema";
import { rngStateSchema } from "./rng.schema";

export const runPhaseSchema = z.enum(["town", "combat", "dead", "complete"]);

export const townShopSlotSchema = z.object({
	id: z.string(),
	itemId: z.string(),
	price: z.number().int().min(0),
	purchased: z.boolean(),
});

export const townStateSchema = z.object({
	shopSlots: z.array(townShopSlotSchema),
	rerollCost: z.number().int().min(0),
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
	gold: z.number().int().min(0),
	goldMultiplier: z.number().int().min(1),
	log: z.array(runLogEntrySchema),
});

export type RunPhase = z.infer<typeof runPhaseSchema>;
export type TownShopSlot = z.infer<typeof townShopSlotSchema>;
export type TownState = z.infer<typeof townStateSchema>;
export type RunState = z.infer<typeof runStateSchema>;
