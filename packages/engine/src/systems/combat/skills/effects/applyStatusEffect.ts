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
import { isSameActiveEffectSource } from "../../effects/activeEffectSource";
import type { ActionResolution } from "../../logs/actionOutcome";

type ApplyStatusEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: ApplyStatusEffect;
	source: ActiveEffectSource;
	rngState: RngState;
};

export function applyStatusEffect(input: ApplyStatusEffectInput): RngResult<ActionResolution> {
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
				value: {
					combat: input.combat,
					outcomes: [
						{
							type: "resisted",
							targetName: target.name,
							subject:
								input.effect.statusId === "stunned"
									? "being stunned"
									: "being silenced",
						},
					],
				},
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

	const refreshed = target.activeEffects.some((effect) =>
		isSameActiveEffectSource(effect, activeEffect),
	);
	const updatedTarget = upsertActiveCombatEffect(target, activeEffect);

	const updatedCombat = replaceCombatant(input.combat, updatedTarget);

	return {
		value: {
			combat: updatedCombat,
			outcomes: [
				{ type: "status", targetName: target.name, effect: input.effect, refreshed },
			],
		},
		rngState,
	};
}
