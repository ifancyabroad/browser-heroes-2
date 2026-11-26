import { CONSUMABLES_BY_ID, type ConsumableId } from "@app/content";
import type { CombatState, EngineErrorCode, HeroState } from "../../schemas";
import { canTargetCombatant } from "../combat/combatants/canTargetCombatant";

type ValidateConsumableUseResult = { ok: true } | { ok: false; error: EngineErrorCode };

export function validateConsumableUse(
	hero: HeroState,
	consumableType: ConsumableId,
	combat: CombatState,
): ValidateConsumableUseResult {
	if (!Object.hasOwn(CONSUMABLES_BY_ID, consumableType)) {
		return { ok: false, error: "CONSUMABLE_NOT_AVAILABLE" };
	}
	if (hero.consumables[consumableType] <= 0) {
		return { ok: false, error: "NO_CONSUMABLES_AVAILABLE" };
	}
	if (
		CONSUMABLES_BY_ID[consumableType].effects.some((effect) => effect.target === "enemy") &&
		!canTargetCombatant(combat.player, combat.enemy)
	) {
		return { ok: false, error: "TARGET_NOT_AVAILABLE" };
	}
	return { ok: true };
}
