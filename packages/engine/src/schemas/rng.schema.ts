import { z } from "zod";

export const rngStateSchema = z.object({
	value: z.number().int().min(0),
});

export type RngState = z.infer<typeof rngStateSchema>;
