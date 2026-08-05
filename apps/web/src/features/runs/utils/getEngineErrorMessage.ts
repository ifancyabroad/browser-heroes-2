import type { EngineErrorCode } from "@app/engine";

const engineErrorMessages: Record<EngineErrorCode, string> = {
	INVALID_PHASE: "That action is not available right now.",
	INVALID_ACTION: "That action is not valid.",
	COMBAT_NOT_ACTIVE: "There is no active combat.",
	RUN_ENDED: "This run has already ended.",
	VALIDATION_FAILED: "The action could not be validated.",
	NO_ELIGIBLE_ENEMY: "No enemy is available for this battle.",
	ENEMY_DEFINITION_NOT_FOUND: "Enemy details could not be loaded for this battle.",
	LEVEL_UP_NOT_AVAILABLE: "There is no level-up available right now.",
	INVALID_LEVEL_UP_SELECTION: "That level-up choice is not available.",
	NO_LEVEL_UP_REROLLS_REMAINING: "No level-up rerolls remain.",
	NO_ALTERNATIVE_LEVEL_UP_OPTIONS: "No alternative level-up choices are available.",
	SKILL_NOT_KNOWN: "You do not know that skill.",
	SKILL_HAS_NO_USES_REMAINING: "That skill has no uses remaining.",
	SKILL_EFFECT_NOT_SUPPORTED: "That skill is not supported yet.",
	PLAYER_CANNOT_ACT: "You cannot act right now.",
	PLAYER_IS_SILENCED: "You cannot use skills while silenced.",
	LEVEL_UP_REQUIRED: "Choose a level-up reward before continuing.",
	REWARD_SELECTION_REQUIRED: "Choose a reward before continuing.",
	REWARD_NOT_AVAILABLE: "There is no reward available right now.",
	INVALID_REWARD_SELECTION: "That reward choice is not available.",
	INVALID_EQUIPMENT_SLOT: "That item cannot be equipped there.",
	TOWN_NOT_AVAILABLE: "Town is not available right now.",
	NOT_ENOUGH_GOLD: "You do not have enough gold.",
	SHOP_SLOT_NOT_FOUND: "That shop item is no longer available.",
	SHOP_SLOT_ALREADY_PURCHASED: "That shop item has already been purchased.",
	ITEM_DEFINITION_NOT_FOUND: "Item details could not be loaded.",
	NO_HEALING_POTIONS_AVAILABLE: "You do not have any health potions.",
	CONSUMABLE_NOT_USABLE: "That consumable cannot be used right now.",
	HEALING_POTIONS_FULL: "You cannot carry any more health potions.",
	CONSUMABLE_NOT_AVAILABLE: "That consumable is not available.",
	NO_ELIGIBLE_ITEM_BASE: "No eligible item base.",
};

export function getEngineErrorMessage(error: EngineErrorCode): string {
	return engineErrorMessages[error];
}
