import type { CombatantState } from "../../../schemas";
import { adjustCurrentHpForMaxHpChange } from "../../health/adjustCurrentHpForMaxHpChange";
import { getEffectiveCombatStatValue } from "./getEffectiveCombatStatValue";

export function reconcileCombatantMaxHpChange(
	previous: CombatantState,
	next: CombatantState,
): CombatantState {
	const previousBonus = getEffectiveCombatStatValue(previous, "maxHpBonus");
	const nextBonus = getEffectiveCombatStatValue(next, "maxHpBonus");
	const maxHpDelta = nextBonus - previousBonus;

	if (maxHpDelta === 0) {
		return next;
	}

	const maxHp = Math.max(1, previous.maxHp + maxHpDelta);

	return {
		...next,
		maxHp,
		currentHp: Math.min(maxHp, adjustCurrentHpForMaxHpChange(previous.currentHp, maxHpDelta)),
	};
}
