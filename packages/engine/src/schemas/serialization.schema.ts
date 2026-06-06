import { z } from "zod";
import { runStateSchema } from "./runState.schema";

export const deserializeRunStateSuccessSchema = z.object({
	ok: z.literal(true),
	state: runStateSchema,
});

export const deserializeRunStateFailureSchema = z.object({
	ok: z.literal(false),
	error: z.string(),
});

export const deserializeRunStateResultSchema = z.discriminatedUnion("ok", [
	deserializeRunStateSuccessSchema,
	deserializeRunStateFailureSchema,
]);

export type DeserializeRunStateResult = z.infer<typeof deserializeRunStateResultSchema>;
