import type { CombatantSide, CombatantState, CombatState } from "../../../schemas";

import { getCombatant, replaceCombatant } from "../combatants/combatantSelectors";
import { replaceCombatantActiveEffects } from "./replaceCombatantActiveEffects";

export function consumeCombatantRollModifierCharges(
	combat: CombatState,
	combatantSide: CombatantSide,
	effectIds: readonly string[],
): CombatState {
	if (effectIds.length === 0) {
		return combat;
	}

	return replaceCombatant(
		combat,
		consumeRollModifierCharges(getCombatant(combat, combatantSide), effectIds),
	);
}

export function consumeRollModifierCharges(
	combatant: CombatantState,
	effectIds: readonly string[],
): CombatantState {
	if (effectIds.length === 0) {
		return combatant;
	}

	const consumedIds = new Set(effectIds);
	const activeEffects = combatant.activeEffects.flatMap((effect) => {
		if (
			effect.type !== "modifyRoll" ||
			effect.remainingCharges === undefined ||
			!consumedIds.has(effect.id)
		) {
			return [effect];
		}

		if (effect.remainingCharges === 1) {
			return [];
		}

		return [{ ...effect, remainingCharges: effect.remainingCharges - 1 }];
	});

	return replaceCombatantActiveEffects(combatant, activeEffects);
}
