import { z } from "zod";
import { skillIds } from "@app/content";

export const enterCombatActionSchema = z.object({
	type: z.literal("ENTER_COMBAT"),
});

export const playerBasicAttackActionSchema = z.object({
	type: z.literal("PLAYER_BASIC_ATTACK"),
});

export const playerUseSkillActionSchema = z.object({
	type: z.literal("PLAYER_USE_SKILL"),
	skillId: z.enum(skillIds),
	targetCombatantId: z.string(),
});

export const playerUseConsumableActionSchema = z.object({
	type: z.literal("PLAYER_USE_CONSUMABLE"),
	itemInstanceId: z.string(),
});

export const continueToNextCombatActionSchema = z.object({
	type: z.literal("CONTINUE_TO_NEXT_COMBAT"),
});

export const returnToTownActionSchema = z.object({
	type: z.literal("RETURN_TO_TOWN"),
});

export const buyItemActionSchema = z.object({
	type: z.literal("BUY_ITEM"),
	shopSlotId: z.string(),
});

export const restAtTownActionSchema = z.object({
	type: z.literal("REST_AT_TOWN"),
});

export const rerollShopActionSchema = z.object({
	type: z.literal("REROLL_SHOP"),
});

export const engineActionSchema = z.discriminatedUnion("type", [
	enterCombatActionSchema,
	playerBasicAttackActionSchema,
	playerUseSkillActionSchema,
	playerUseConsumableActionSchema,
	continueToNextCombatActionSchema,
	returnToTownActionSchema,
	buyItemActionSchema,
	restAtTownActionSchema,
	rerollShopActionSchema,
]);

export type EnterCombatAction = z.infer<typeof enterCombatActionSchema>;
export type PlayerBasicAttackAction = z.infer<typeof playerBasicAttackActionSchema>;
export type PlayerUseSkillAction = z.infer<typeof playerUseSkillActionSchema>;
export type PlayerUseConsumableAction = z.infer<typeof playerUseConsumableActionSchema>;
export type ContinueToNextCombatAction = z.infer<typeof continueToNextCombatActionSchema>;
export type ReturnToTownAction = z.infer<typeof returnToTownActionSchema>;
export type BuyItemAction = z.infer<typeof buyItemActionSchema>;
export type RestAtTownAction = z.infer<typeof restAtTownActionSchema>;
export type RerollShopAction = z.infer<typeof rerollShopActionSchema>;

export type EngineAction = z.infer<typeof engineActionSchema>;
