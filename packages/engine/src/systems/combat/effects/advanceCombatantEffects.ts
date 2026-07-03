import { SKILLS_BY_ID } from "@app/content";

import type { ActiveCombatEffect, CombatantSide, CombatState } from "../../../schemas";

import { advanceActiveEffects } from "./advanceActiveEffects";
import { getCombatant, replaceCombatant } from "../combatants/combatantSelectors";
import { appendCombatLog } from "../logs/appendCombatLog";
import { RngResult, RngState } from "../../../core/rng";
import { resolveDamageOverTimeEffects } from "./resolveDamageOverTimeEffects";
import { resolveHealOverTimeEffects } from "./resolveHealOverTimeEffects";

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

	for (const expiredEffect of getUniqueExpiredSkillEffects(result.expiredEffects)) {
		const stillActive = result.combatant.activeEffects.some(
			(activeEffect) =>
				activeEffect.sourceCombatantId === expiredEffect.sourceCombatantId &&
				activeEffect.sourceSkillId === expiredEffect.sourceSkillId,
		);

		if (stillActive) {
			continue;
		}

		const skill = SKILLS_BY_ID[expiredEffect.sourceSkillId];

		combat = appendCombatLog(combat, {
			turnNumber: input.combat.turnNumber,
			actor: input.combatantSide,
			message: `${skill.name} expires on ` + `${result.combatant.name}.`,
			eventType: "effect_expired",
		});
	}

	return {
		value: combat,
		rngState: currentResult.rngState,
	};
}

function getUniqueExpiredSkillEffects(effects: ActiveCombatEffect[]): ActiveCombatEffect[] {
	return effects.filter(
		(effect, index) =>
			effects.findIndex(
				(candidate) =>
					candidate.sourceCombatantId === effect.sourceCombatantId &&
					candidate.sourceSkillId === effect.sourceSkillId,
			) === index,
	);
}
