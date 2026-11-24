import { CONSUMABLES_BY_ID, type ConsumableId } from "@app/content";
import type { EngineErrorCode, HeroState } from "../../schemas";

type ValidateConsumableUseResult = { ok: true } | { ok: false; error: EngineErrorCode };

export function validateConsumableUse(
	hero: HeroState,
	consumableType: ConsumableId,
): ValidateConsumableUseResult {
	if (!Object.hasOwn(CONSUMABLES_BY_ID, consumableType)) {
		return { ok: false, error: "CONSUMABLE_NOT_AVAILABLE" };
	}
	if (hero.consumables[consumableType] <= 0) {
		return { ok: false, error: "NO_HEALING_POTIONS_AVAILABLE" };
	}
	return { ok: true };
}
