import type {
	ModifyDamageAffinityEffect,
	ModifyDamageEffect,
	ModifyStatEffect,
	SkillId,
} from "@app/content";

import type { ActiveCombatEffect, CombatantSide, CombatState } from "../../../../schemas";

import { createEffectInstanceId } from "../../../../core/ids";

import { getCombatant, getOpponent, replaceCombatant } from "../../combatants/combatantSelectors";
import { appendCombatLog } from "../../logs/appendCombatLog";
import { upsertActiveCombatEffect } from "../../effects/upsertActiveCombatEffect";

type TemporaryModifierEffect = ModifyStatEffect | ModifyDamageEffect | ModifyDamageAffinityEffect;

type ApplyTemporaryModifierEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: TemporaryModifierEffect;
	effectIndex: number;
	skillId: SkillId;
	skillName: string;
};

export function applyTemporaryModifierEffect(
	input: ApplyTemporaryModifierEffectInput,
): CombatState {
	const actor = getCombatant(input.combat, input.actorSide);

	const target =
		input.effect.target === "self" ? actor : getOpponent(input.combat, input.actorSide);

	const activeEffect = createActiveCombatEffect({
		combat: input.combat,
		actorId: actor.id,
		effect: input.effect,
		effectIndex: input.effectIndex,
		skillId: input.skillId,
	});

	const updatedTarget = upsertActiveCombatEffect(target, activeEffect);

	const updatedCombat = replaceCombatant(input.combat, updatedTarget);

	return appendCombatLog(updatedCombat, {
		turnNumber: input.combat.turnNumber,
		actor: actor.side,
		message:
			`${actor.name} uses ${input.skillName}, applying an effect ` +
			`to ${target.name} for ${activeEffect.remainingTurns} turns.`,
		eventType: "effect_applied",
	});
}

function createActiveCombatEffect(input: {
	combat: CombatState;
	actorId: string;
	effect: TemporaryModifierEffect;
	effectIndex: number;
	skillId: SkillId;
}): ActiveCombatEffect {
	const base = {
		id: createEffectInstanceId(
			input.combat.id,
			input.combat.turnNumber,
			input.actorId,
			input.effectIndex,
		),
		sourceCombatantId: input.actorId,
		sourceSkillId: input.skillId,
		sourceEffectIndex: input.effectIndex,
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

		case "modifyDamageAffinity":
			return {
				...base,
				type: "modifyDamageAffinity",
				affinity: input.effect.affinity,
				operation: input.effect.operation,
				damageType: input.effect.damageType,
			};
	}
}
