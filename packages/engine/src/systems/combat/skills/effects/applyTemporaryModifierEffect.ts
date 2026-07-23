import type {
	ModifyDamageAffinityEffect,
	ModifyDamageEffect,
	ModifyDamageTakenEffect,
	ModifyRollEffect,
	ModifyStatEffect,
} from "@app/content";

import type {
	ActiveCombatEffect,
	ActiveEffectSource,
	CombatantSide,
	CombatState,
} from "../../../../schemas";

import { createEffectInstanceId } from "../../../../core/ids";

import { getCombatant, getOpponent, replaceCombatant } from "../../combatants/combatantSelectors";
import { upsertActiveCombatEffect } from "../../effects/upsertActiveCombatEffect";
import { isSameActiveEffectSource } from "../../effects/activeEffectSource";
import type { ActionResolution } from "../../logs/actionOutcome";

type TemporaryModifierEffect =
	| ModifyStatEffect
	| ModifyDamageEffect
	| ModifyDamageTakenEffect
	| ModifyDamageAffinityEffect
	| ModifyRollEffect;

type ApplyTemporaryModifierEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: TemporaryModifierEffect;
	source: ActiveEffectSource;
};

export function applyTemporaryModifierEffect(
	input: ApplyTemporaryModifierEffectInput,
): ActionResolution {
	const actor = getCombatant(input.combat, input.actorSide);

	const target =
		input.effect.target === "self" ? actor : getOpponent(input.combat, input.actorSide);

	const activeEffect = createActiveCombatEffect({
		combat: input.combat,
		actorId: actor.id,
		effect: input.effect,
		source: input.source,
	});

	const refreshed = target.activeEffects.some((effect) =>
		isSameActiveEffectSource(effect, activeEffect),
	);
	const updatedTarget = upsertActiveCombatEffect(target, activeEffect);

	const updatedCombat = replaceCombatant(input.combat, updatedTarget);

	return {
		combat: updatedCombat,
		outcomes: [{ type: "modifier", targetName: target.name, effect: input.effect, refreshed }],
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
				operation: input.effect.operation,
				value: input.effect.value,
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
			};
	}
}
