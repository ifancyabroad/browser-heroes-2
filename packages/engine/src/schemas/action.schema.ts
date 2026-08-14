import { z } from "zod";
import { equipmentSlotSchema, skillIdSchema } from "@app/content";
import { levelUpSelectionSchema } from "./levelUp.schema";
import { rewardSelectionSchema } from "./reward.schema";
import { heroStateSchema } from "./heroState.schema";

export const ghostEncounterSchema = z.object({
	ghostId: z.string(),
	ghostUsername: z.string(),
	hero: heroStateSchema,
});

export const enterCombatActionSchema = z.object({
	type: z.literal("ENTER_COMBAT"),
	ghostEncounter: ghostEncounterSchema.optional(),
});

export const playerBasicAttackActionSchema = z.object({
	type: z.literal("PLAYER_BASIC_ATTACK"),
});

export const playerUseSkillActionSchema = z.object({
	type: z.literal("PLAYER_USE_SKILL"),
	skillId: skillIdSchema,
});

export const consumableTypeSchema = z.enum(["healingPotion"]);

export const playerUseConsumableActionSchema = z.object({
	type: z.literal("PLAYER_USE_CONSUMABLE"),
	consumableType: consumableTypeSchema,
});

export const buyConsumableActionSchema = z.object({
	type: z.literal("BUY_CONSUMABLE"),
	consumableType: consumableTypeSchema,
});

export const continueToNextCombatActionSchema = z.object({
	type: z.literal("CONTINUE_TO_NEXT_COMBAT"),
	ghostEncounter: ghostEncounterSchema.optional(),
});

export const returnToTownActionSchema = z.object({
	type: z.literal("RETURN_TO_TOWN"),
});

export const buyItemActionSchema = z.object({
	type: z.literal("BUY_ITEM"),
	shopSlotId: z.string(),
	equipmentSlot: equipmentSlotSchema.optional(),
});

export const restAtTownActionSchema = z.object({
	type: z.literal("REST_AT_TOWN"),
});

export const rerollShopActionSchema = z.object({
	type: z.literal("REROLL_SHOP"),
});

export const setShopLockActionSchema = z.object({
	type: z.literal("SET_SHOP_LOCK"),
	shopSlotId: z.string(),
	locked: z.boolean(),
});

export const completeLevelUpActionSchema = z.object({
	type: z.literal("COMPLETE_LEVEL_UP"),
	selection: levelUpSelectionSchema.nullable(),
});

export const rerollLevelUpActionSchema = z.object({
	type: z.literal("REROLL_LEVEL_UP"),
});

export const playerSkipTurnActionSchema = z.object({
	type: z.literal("PLAYER_SKIP_TURN"),
});

export const selectRewardActionSchema = z.object({
	type: z.literal("SELECT_REWARD"),
	selection: rewardSelectionSchema,
});

export const retireRunActionSchema = z.object({
	type: z.literal("RETIRE_RUN"),
});

export const swapHandWeaponsActionSchema = z.object({
	type: z.literal("SWAP_HAND_WEAPONS"),
});

export const engineActionSchema = z.discriminatedUnion("type", [
	enterCombatActionSchema,
	playerBasicAttackActionSchema,
	playerUseSkillActionSchema,
	playerUseConsumableActionSchema,
	continueToNextCombatActionSchema,
	returnToTownActionSchema,
	buyItemActionSchema,
	buyConsumableActionSchema,
	restAtTownActionSchema,
	rerollShopActionSchema,
	setShopLockActionSchema,
	completeLevelUpActionSchema,
	rerollLevelUpActionSchema,
	playerSkipTurnActionSchema,
	selectRewardActionSchema,
	retireRunActionSchema,
	swapHandWeaponsActionSchema,
]);

export type GhostEncounter = z.infer<typeof ghostEncounterSchema>;
export type EnterCombatAction = z.infer<typeof enterCombatActionSchema>;
export type PlayerBasicAttackAction = z.infer<typeof playerBasicAttackActionSchema>;
export type PlayerUseSkillAction = z.infer<typeof playerUseSkillActionSchema>;
export type PlayerUseConsumableAction = z.infer<typeof playerUseConsumableActionSchema>;
export type ContinueToNextCombatAction = z.infer<typeof continueToNextCombatActionSchema>;
export type ReturnToTownAction = z.infer<typeof returnToTownActionSchema>;
export type BuyItemAction = z.infer<typeof buyItemActionSchema>;
export type BuyConsumableAction = z.infer<typeof buyConsumableActionSchema>;
export type RestAtTownAction = z.infer<typeof restAtTownActionSchema>;
export type RerollShopAction = z.infer<typeof rerollShopActionSchema>;
export type SetShopLockAction = z.infer<typeof setShopLockActionSchema>;
export type CompleteLevelUpAction = z.infer<typeof completeLevelUpActionSchema>;
export type RerollLevelUpAction = z.infer<typeof rerollLevelUpActionSchema>;
export type PlayerSkipTurnAction = z.infer<typeof playerSkipTurnActionSchema>;
export type SelectRewardAction = z.infer<typeof selectRewardActionSchema>;
export type RetireRunAction = z.infer<typeof retireRunActionSchema>;
export type SwapHandWeaponsAction = z.infer<typeof swapHandWeaponsActionSchema>;

export type EngineAction = z.infer<typeof engineActionSchema>;
