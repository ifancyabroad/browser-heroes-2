import type { ActiveCombatEffect, CombatantState } from "../../../schemas";

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
		if (!effectIds.has(effect.id)) {
			activeEffects.push(effect);
			continue;
		}

		const remainingTurns = effect.remainingTurns - 1;

		if (remainingTurns <= 0) {
			expiredEffects.push(effect);
			continue;
		}

		activeEffects.push({
			...effect,
			remainingTurns,
		});
	}

	return {
		combatant: {
			...combatant,
			activeEffects,
		},
		expiredEffects,
	};
}

export function getActiveEffectIds(combatant: CombatantState): Set<string> {
	return new Set(combatant.activeEffects.map((effect) => effect.id));
}
