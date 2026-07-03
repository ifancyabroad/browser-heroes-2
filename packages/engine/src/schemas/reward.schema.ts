import { z } from "zod";
import { equipmentSlotSchema, itemIdSchema } from "@app/content";

export const rewardOptionSchema = z.discriminatedUnion("type", [
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
	options: z.tuple([rewardOptionSchema, rewardOptionSchema, rewardOptionSchema]),
});

export const rewardSelectionSchema = z.object({
	optionIndex: z.number().int().min(0).max(2),
	equipmentSlot: equipmentSlotSchema.optional(),
});

export type RewardOption = z.infer<typeof rewardOptionSchema>;
export type PendingRewardChoice = z.infer<typeof pendingRewardChoiceSchema>;
export type RewardSelection = z.infer<typeof rewardSelectionSchema>;
