import type {
	ModifyDamageAffinityEffect,
	ModifyDamageEffect,
	ModifyDamageTakenEffect,
	ModifyHealingEffect,
	ModifyRollEffect,
	ModifyStatEffect,
} from "@app/content";

import type {
	ActiveCombatEffect,
	ActiveEffectSource,
	CombatantSide,
	CombatState,
} from "../../../../schemas";
import type { RngResult, RngState } from "../../../../core/rng";

import { createEffectInstanceId } from "../../../../core/ids";

import { getCombatant, getOpponent, replaceCombatant } from "../../combatants/combatantSelectors";
import { upsertActiveCombatEffect } from "../../effects/upsertActiveCombatEffect";
import { isSameActiveEffectSource } from "../../effects/activeEffectSource";
import type { ActionResolution } from "../../logs/actionOutcome";
import { resolveCombatSavingThrow } from "../../checks/resolveCombatSavingThrow";

type TemporaryModifierEffect =
	| ModifyStatEffect
	| ModifyHealingEffect
	| ModifyDamageEffect
	| ModifyDamageTakenEffect
	| ModifyDamageAffinityEffect
	| ModifyRollEffect;

type ApplyTemporaryModifierEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: TemporaryModifierEffect;
	source: ActiveEffectSource;
	rngState: RngState;
};

export function applyTemporaryModifierEffect(
	input: ApplyTemporaryModifierEffectInput,
): RngResult<ActionResolution> {
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
							subject: `${input.source.sourceName}'s effect`,
						},
					],
				},
				rngState,
			};
		}
	}

	const activeEffect = createActiveCombatEffect({
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
				{ type: "modifier", targetName: target.name, effect: input.effect, refreshed },
			],
		},
		rngState,
	};
}

function createActiveCombatEffect(input: {
	combat: CombatState;
	actorId: string;
	effect: TemporaryModifierEffect;
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
		case "modifyStat":
			return {
				...base,
				type: "modifyStat",
				stat: input.effect.stat,
				value: input.effect.value,
			};

		case "modifyHealing":
			return {
				...base,
				type: "modifyHealing",
				multiplier: input.effect.multiplier,
			};

		case "modifyDamage":
			return {
				...base,
				type: "modifyDamage",
				damageType: input.effect.damageType,
				operation: input.effect.operation,
				value: input.effect.value,
			};

		case "modifyDamageTaken":
			return {
				...base,
				type: "modifyDamageTaken",
				damageType: input.effect.damageType,
				operation: input.effect.operation,
				value: input.effect.value,
			};

		case "modifyDamageAffinity":
			return {
				...base,
				type: "modifyDamageAffinity",
				affinity: input.effect.affinity,
				operation: input.effect.operation,
				damageType: input.effect.damageType,
			};

		case "modifyRoll":
			return {
				...base,
				type: "modifyRoll",
				roll: input.effect.roll,
				mode: input.effect.mode,
				attribute: input.effect.attribute,
				remainingCharges: input.effect.charges,
			};
	}
}
