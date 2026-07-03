import { SKILLS_BY_ID } from "@app/content";

import type { ActiveCombatEffect, CombatantSide, CombatState } from "../../../schemas";

import { advanceActiveEffects } from "./advanceActiveEffects";
import { getCombatant, replaceCombatant } from "../combatants/combatantSelectors";
import { appendCombatLog } from "../logs/appendCombatLog";

type AdvanceCombatantEffectsInput = {
	combat: CombatState;
	combatantSide: CombatantSide;
	effectIds: ReadonlySet<string>;
};

export function advanceCombatantEffects(input: AdvanceCombatantEffectsInput): CombatState {
	const combatant = getCombatant(input.combat, input.combatantSide);

	const result = advanceActiveEffects(combatant, input.effectIds);

	let combat = replaceCombatant(input.combat, result.combatant);

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

	return combat;
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
