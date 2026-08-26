import { z } from "zod";
import { heroStateSchema } from "./heroState.schema";

export const ghostEncounterSchema = z.object({
	ghostId: z.string(),
	ghostUsername: z.string(),
	ghostSource: z.enum(["player", "system"]),
	hero: heroStateSchema,
});

export const engineExternalInputSchema = z.object({
	ghostEncounter: ghostEncounterSchema.optional(),
});

export type GhostEncounter = z.infer<typeof ghostEncounterSchema>;
export type EngineExternalInput = z.infer<typeof engineExternalInputSchema>;
