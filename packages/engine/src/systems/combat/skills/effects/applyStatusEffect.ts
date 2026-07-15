import type { ApplyStatusEffect } from "@app/content";

import type {
	ActiveEffectSource,
	ActiveStatusEffect,
	CombatantSide,
	CombatState,
} from "../../../../schemas";

import type { RngResult, RngState } from "../../../../core/rng";

import { createEffectInstanceId } from "../../../../core/ids";

import { getCombatant, getOpponent, replaceCombatant } from "../../combatants/combatantSelectors";
import { resolveSavingThrow } from "../../checks/resolveSavingThrow";
import { upsertActiveCombatEffect } from "../../effects/upsertActiveCombatEffect";
import { appendCombatLog } from "../../logs/appendCombatLog";

type ApplyStatusEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: ApplyStatusEffect;
	source: ActiveEffectSource;
	rngState: RngState;
};

export function applyStatusEffect(input: ApplyStatusEffectInput): RngResult<CombatState> {
	const actor = getCombatant(input.combat, input.actorSide);

	const target =
		input.effect.target === "self" ? actor : getOpponent(input.combat, input.actorSide);

	let rngState = input.rngState;

	if (input.effect.save) {
		const savingThrow = resolveSavingThrow({
			rngState,
			attacker: actor,
			defender: target,
			save: input.effect.save,
		});

		rngState = savingThrow.rngState;

		if (savingThrow.value.success) {
			return {
				value: appendCombatLog(input.combat, {
					turnNumber: input.combat.turnNumber,
					actor: target.side,
					message: `${target.name} resists ` + `${input.source.sourceName}.`,
					eventType: "skill_used",
				}),
				rngState,
			};
		}
	}

	const activeEffect: ActiveStatusEffect = {
		id: createEffectInstanceId(
			input.combat.id,
			input.combat.turnNumber,
			actor.id,
			input.source.sourceEffectKey,
		),
		type: "status",
		sourceCombatantId: actor.id,
		source: input.source,
		remainingTurns: input.effect.durationTurns,
		statusId: input.effect.statusId,
	};

	const updatedTarget = upsertActiveCombatEffect(target, activeEffect);

	const updatedCombat = replaceCombatant(input.combat, updatedTarget);

	return {
		value: appendCombatLog(updatedCombat, {
			turnNumber: input.combat.turnNumber,
			actor: actor.side,
			message:
				`${actor.name} uses ${input.source.sourceName}, applying ` +
				`${input.effect.statusId} to ${target.name} for ` +
				`${input.effect.durationTurns} turns.`,
			eventType: "effect_applied",
		}),
		rngState,
	};
}
