import { z } from "zod";
import { itemIdSchema } from "@app/content";

export const bossRewardOptionSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("item"),
		itemId: itemIdSchema,
	}),
	z.object({
		type: z.literal("gold"),
		amount: z.number().int().positive(),
	}),
]);

export const pendingRewardChoiceSchema = z.object({
	options: z.tuple([bossRewardOptionSchema, bossRewardOptionSchema, bossRewardOptionSchema]),
});

export type BossRewardOption = z.infer<typeof bossRewardOptionSchema>;
export type PendingRewardChoice = z.infer<typeof pendingRewardChoiceSchema>;
