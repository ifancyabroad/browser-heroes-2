import { z } from "zod";
import { classIds } from "@app/content";

export const createRunBodySchema = z.object({
	heroName: z.string().trim().min(1).max(32),
	classId: z.enum(classIds),
});

export type CreateRunBody = z.infer<typeof createRunBodySchema>;
