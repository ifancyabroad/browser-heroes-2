import { z } from "zod";
import { classIdSchema } from "@app/content";

export const createRunBodySchema = z.object({
	heroName: z.string().trim().min(1).max(32),
	classId: classIdSchema,
});

export type CreateRunBody = z.infer<typeof createRunBodySchema>;
