import type { ActiveCombatEffect, CombatantState } from "../../../schemas";
import { replaceCombatantActiveEffects } from "./replaceCombatantActiveEffects";

export type AdvanceActiveEffectsResult = {
	combatant: CombatantState;
	expiredEffects: ActiveCombatEffect[];
};

export function advanceActiveEffects(
	combatant: CombatantState,
	effectIds: ReadonlySet<string>,
): AdvanceActiveEffectsResult {
	const activeEffects: ActiveCombatEffect[] = [];
	const expiredEffects: ActiveCombatEffect[] = [];

	for (const effect of combatant.activeEffects) {
		if (!effectIds.has(effect.id) || effect.duration.unit !== "turns") {
			activeEffects.push(effect);
			continue;
		}

		const remaining = effect.duration.remaining - 1;

		if (remaining <= 0) {
			expiredEffects.push(effect);
			continue;
		}

		activeEffects.push({
			...effect,
			duration: { unit: "turns", remaining },
		});
	}

	return {
		combatant: replaceCombatantActiveEffects(combatant, activeEffects),
		expiredEffects,
	};
}

export function getActiveEffectIds(combatant: CombatantState): Set<string> {
	return new Set(combatant.activeEffects.map((effect) => effect.id));
}
