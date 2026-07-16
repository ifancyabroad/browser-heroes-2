import type { ActiveCombatEffect, CombatantSide, CombatState } from "../../../schemas";

import { advanceActiveEffects } from "./advanceActiveEffects";
import { getCombatant, replaceCombatant } from "../combatants/combatantSelectors";
import { appendCombatLog } from "../logs/appendCombatLog";
import { RngResult, RngState } from "../../../core/rng";
import { resolveDamageOverTimeEffects } from "./resolveDamageOverTimeEffects";
import { resolveHealOverTimeEffects } from "./resolveHealOverTimeEffects";
import { isSameActiveEffectSource } from "./activeEffectSource";

type AdvanceCombatantEffectsInput = {
	combat: CombatState;
	combatantSide: CombatantSide;
	effectIds: ReadonlySet<string>;
	rngState: RngState;
};

export function advanceCombatantEffects(
	input: AdvanceCombatantEffectsInput,
): RngResult<CombatState> {
	let currentResult = resolveDamageOverTimeEffects({
		combat: input.combat,
		combatantSide: input.combatantSide,
		effectIds: input.effectIds,
		rngState: input.rngState,
	});

	const combatantAfterDamage = getCombatant(currentResult.value, input.combatantSide);

	if (combatantAfterDamage.currentHp > 0) {
		currentResult = resolveHealOverTimeEffects({
			combat: currentResult.value,
			combatantSide: input.combatantSide,
			effectIds: input.effectIds,
			rngState: currentResult.rngState,
		});
	}

	const combatant = getCombatant(currentResult.value, input.combatantSide);

	const result = advanceActiveEffects(combatant, input.effectIds);

	let combat = replaceCombatant(currentResult.value, result.combatant);

	for (const expiredEffect of getUniqueExpiredEffectSources(result.expiredEffects)) {
		const stillActive = result.combatant.activeEffects.some((activeEffect) =>
			isSameActiveEffectSource(activeEffect, expiredEffect),
		);

		if (stillActive) {
			continue;
		}

		combat = appendCombatLog(combat, {
			turnNumber: input.combat.turnNumber,
			actor: input.combatantSide,
			message: `${expiredEffect.source.sourceName} ends on ${result.combatant.name}.`,
			eventType: "effect_expired",
		});
	}

	return {
		value: combat,
		rngState: currentResult.rngState,
	};
}

function getUniqueExpiredEffectSources(effects: ActiveCombatEffect[]): ActiveCombatEffect[] {
	return effects.filter(
		(effect, index) =>
			effects.findIndex((candidate) => isSameActiveEffectSource(candidate, effect)) === index,
	);
}
