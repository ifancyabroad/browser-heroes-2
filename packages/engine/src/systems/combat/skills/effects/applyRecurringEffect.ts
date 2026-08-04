import type { DamageOverTimeEffect, HealOverTimeEffect, ShieldEffect } from "@app/content";

import type {
	ActiveCombatEffect,
	ActiveEffectSource,
	CombatantSide,
	CombatState,
} from "../../../../schemas";

import { createEffectInstanceId } from "../../../../core/ids";

import { getCombatant, getOpponent, replaceCombatant } from "../../combatants/combatantSelectors";
import { upsertActiveCombatEffect } from "../../effects/upsertActiveCombatEffect";
import type { RngResult, RngState } from "../../../../core/rng";
import { resolveCombatSavingThrow } from "../../checks/resolveCombatSavingThrow";
import { isSameActiveEffectSource } from "../../effects/activeEffectSource";
import type { ActionResolution } from "../../logs/actionOutcome";

type RecurringEffect = DamageOverTimeEffect | HealOverTimeEffect | ShieldEffect;

type ApplyRecurringEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: RecurringEffect;
	source: ActiveEffectSource;
	rngState: RngState;
};

export function applyRecurringEffect(
	input: ApplyRecurringEffectInput,
): RngResult<ActionResolution> {
	let combat = input.combat;
	const actor = getCombatant(input.combat, input.actorSide);

	const target =
		input.effect.target === "self" ? actor : getOpponent(input.combat, input.actorSide);

	let rngState = input.rngState;

	if (input.effect.type === "damageOverTime" && input.effect.save) {
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
							subject: `${input.effect.damageType} damage`,
						},
					],
				},
				rngState,
			};
		}
	}

	const activeEffect = createActiveRecurringEffect({
		combat,
		actorId: actor.id,
		effect: input.effect,
		source: input.source,
	});

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
				{ type: "recurring", targetName: target.name, effect: input.effect, refreshed },
			],
		},
		rngState,
	};
}

function createActiveRecurringEffect(input: {
	combat: CombatState;
	actorId: string;
	effect: RecurringEffect;
	source: ActiveEffectSource;
}): ActiveCombatEffect {
	const base = {
		id: createEffectInstanceId(
			input.combat.id,
			input.combat.turnNumber,
			input.actorId,
			input.source.sourceEffectKey,
		),
		sourceCombatantId: input.actorId,
		source: input.source,
		remainingTurns: input.effect.durationTurns,
	};

	switch (input.effect.type) {
		case "damageOverTime":
			return {
				...base,
				type: "damageOverTime",
				damageType: input.effect.damageType,
				dice: input.effect.dice,
			};

		case "healOverTime":
			return {
				...base,
				type: "healOverTime",
				dice: input.effect.dice,
			};

		case "shield":
			return {
				...base,
				type: "shield",
				remainingAmount: input.effect.amount,
			};
	}
}
