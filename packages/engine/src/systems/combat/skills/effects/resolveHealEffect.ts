import type { HealEffect } from "@app/content";

import type { CombatantSide, CombatState } from "../../../../schemas";
import type { RngResult, RngState } from "../../../../core/rng";

import { rollDamageDice } from "../../damage/rollDamageDice";
import { getAttributeModifier } from "../../checks/getAttributeModifier";
import { getCombatant, replaceCombatant } from "../../combatants/combatantSelectors";
import { appendCombatLog } from "../../logs/appendCombatLog";
import { getEffectiveCombatStatValue } from "../../effects/getEffectiveCombatStatValue";

type ResolveHealEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: HealEffect;
	skillName: string;
	logContext?: "skill" | "rider";
	rngState: RngState;
};

export function resolveHealEffect(input: ResolveHealEffectInput): RngResult<CombatState> {
	const actor = getCombatant(input.combat, input.actorSide);

	const target = actor;

	const roll = rollDamageDice({
		rngState: input.rngState,
		formula: input.effect.dice,
	});

	const attributeModifier = input.effect.attribute
		? getAttributeModifier(actor, input.effect.attribute)
		: 0;

	const baseAmount = Math.max(0, roll.value.total + attributeModifier);

	const healingMultiplier = getEffectiveCombatStatValue(actor, "healingMultiplier");

	const healingAmount = Math.max(0, Math.floor(baseAmount * healingMultiplier));

	const actualHealing = Math.min(healingAmount, target.maxHp - target.currentHp);

	const updatedTarget = {
		...target,
		currentHp: target.currentHp + actualHealing,
	};

	const updatedCombat = replaceCombatant(input.combat, updatedTarget);

	const message =
		input.logContext === "rider"
			? `${input.skillName} restores an additional ${actualHealing} health to ${target.name}.`
			: `${actor.name} uses ${input.skillName} and restores ${actualHealing} health.`;

	return {
		value: appendCombatLog(updatedCombat, {
			turnNumber: input.combat.turnNumber,
			actor: actor.side,
			message,
			eventType: input.logContext === "rider" ? "effect_applied" : "healing_done",
		}),
		rngState: roll.rngState,
	};
}
