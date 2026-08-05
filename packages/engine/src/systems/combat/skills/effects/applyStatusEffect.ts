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
import { resolveCombatSavingThrow } from "../../checks/resolveCombatSavingThrow";
import { upsertActiveCombatEffect } from "../../effects/upsertActiveCombatEffect";
import { isSameActiveEffectSource } from "../../effects/activeEffectSource";
import type { ActionResolution } from "../../logs/actionOutcome";
import { createActiveEffectDuration } from "../../effects/createActiveEffectDuration";

type ApplyStatusEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: ApplyStatusEffect;
	source: ActiveEffectSource;
	rngState: RngState;
};

export function applyStatusEffect(input: ApplyStatusEffectInput): RngResult<ActionResolution> {
	let combat = input.combat;
	const actor = getCombatant(input.combat, input.actorSide);

	const target =
		input.effect.target === "self" ? actor : getOpponent(input.combat, input.actorSide);

	let rngState = input.rngState;

	if (input.effect.save) {
		const savingThrow = resolveCombatSavingThrow({
			combat,
			rngState,
			attackerSide: actor.side,
			defenderSide: target.side,
			save: input.effect.save,
		});

		rngState = savingThrow.rngState;
		combat = savingThrow.value.combat;

		if (savingThrow.value.success) {
			return {
				value: {
					combat,
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
			combat.id,
			combat.turnNumber,
			actor.id,
			input.source.sourceEffectKey,
		),
		type: "status",
		sourceCombatantId: actor.id,
		sourceSide: actor.side,
		source: input.source,
		duration: createActiveEffectDuration(input.effect.duration),
		statusId: input.effect.statusId,
	};

	const resolvedTarget = getCombatant(combat, target.side);
	const refreshed = resolvedTarget.activeEffects.some((effect) =>
		isSameActiveEffectSource(effect, activeEffect),
	);
	const updatedTarget = upsertActiveCombatEffect(resolvedTarget, activeEffect);

	const updatedCombat = replaceCombatant(combat, updatedTarget);

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
