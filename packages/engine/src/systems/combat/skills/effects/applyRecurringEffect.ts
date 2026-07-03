import type { DamageOverTimeEffect, HealOverTimeEffect, ShieldEffect, SkillId } from "@app/content";

import type { ActiveCombatEffect, CombatantSide, CombatState } from "../../../../schemas";

import { createEffectInstanceId } from "../../../../core/ids";

import { getCombatant, getOpponent, replaceCombatant } from "../../combatants/combatantSelectors";
import { upsertActiveCombatEffect } from "../../effects/upsertActiveCombatEffect";
import { appendCombatLog } from "../../logs/appendCombatLog";

type RecurringEffect = DamageOverTimeEffect | HealOverTimeEffect | ShieldEffect;

type ApplyRecurringEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: RecurringEffect;
	sourceEffectKey: string;
	skillId: SkillId;
	skillName: string;
};

export function applyRecurringEffect(input: ApplyRecurringEffectInput): CombatState {
	const actor = getCombatant(input.combat, input.actorSide);

	const target =
		input.effect.target === "self" ? actor : getOpponent(input.combat, input.actorSide);

	const activeEffect = createActiveRecurringEffect({
		combat: input.combat,
		actorId: actor.id,
		effect: input.effect,
		sourceEffectKey: input.sourceEffectKey,
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

function createActiveRecurringEffect(input: {
	combat: CombatState;
	actorId: string;
	effect: RecurringEffect;
	sourceEffectKey: string;
	skillId: SkillId;
}): ActiveCombatEffect {
	const base = {
		id: createEffectInstanceId(
			input.combat.id,
			input.combat.turnNumber,
			input.actorId,
			input.sourceEffectKey,
		),
		sourceCombatantId: input.actorId,
		sourceSkillId: input.skillId,
		sourceEffectKey: input.sourceEffectKey,
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
