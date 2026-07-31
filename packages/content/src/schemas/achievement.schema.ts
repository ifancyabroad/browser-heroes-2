import { z } from "zod";

export const achievementSchema = z.object({
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().nonempty(),
	icon: z.string().nonempty(),
});

export type AchievementDefinition = z.infer<typeof achievementSchema>;
export type AchievementDefinitionInput = z.input<typeof achievementSchema>;
