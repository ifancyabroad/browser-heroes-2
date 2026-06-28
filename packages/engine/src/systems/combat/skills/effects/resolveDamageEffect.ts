import type { DamageEffect } from "@app/content";

import type { CombatantSide, CombatState } from "../../../../schemas";
import type { RngResult, RngState } from "../../../../core/rng";

import { getCombatant, getOpponent, replaceCombatant } from "../../combatants/combatantSelectors";
import { appendCombatLog } from "../../logs/appendCombatLog";
import { applyDamage } from "../../damage/applyDamage";
import { calculateDamage } from "../../damage/calculateDamage";
import { resolveAttackRoll } from "../../checks/resolveAttackRoll";
import { resolveSavingThrow } from "../../checks/resolveSavingThrow";

type ResolveDamageEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: DamageEffect;
	skillName: string;
	logContext?: "skill" | "rider";
	rngState: RngState;
};

export function resolveDamageEffect(input: ResolveDamageEffectInput): RngResult<CombatState> {
	const actor = getCombatant(input.combat, input.actorSide);

	const target =
		input.effect.target === "self" ? actor : getOpponent(input.combat, input.actorSide);

	let rngState = input.rngState;
	let critical = false;
	let successfulSave = false;

	if (input.effect.requiresAttackRoll) {
		const attackRoll = resolveAttackRoll({
			rngState,
			attacker: actor,
			defender: target,
			attribute: input.effect.attribute!,
			proficient: true,
		});

		rngState = attackRoll.rngState;
		critical = attackRoll.value.critical;

		if (!attackRoll.value.hit) {
			return {
				value: appendCombatLog(input.combat, {
					turnNumber: input.combat.turnNumber,
					actor: actor.side,
					message:
						`${actor.name} uses ${input.skillName} on ` + `${target.name} but misses.`,
					eventType: "skill_used",
				}),
				rngState,
			};
		}
	}

	if (input.effect.save) {
		const savingThrow = resolveSavingThrow({
			rngState,
			attacker: actor,
			defender: target,
			save: input.effect.save,
		});

		rngState = savingThrow.rngState;
		successfulSave = savingThrow.value.success;

		if (successfulSave && input.effect.save.onSuccess === "noEffect") {
			return {
				value: appendCombatLog(input.combat, {
					turnNumber: input.combat.turnNumber,
					actor: actor.side,
					message: `${target.name} resists ${actor.name}'s ` + `${input.skillName}.`,
					eventType: "skill_used",
				}),
				rngState,
			};
		}
	}

	const damage = calculateDamage({
		rngState,
		attacker: actor,
		defender: target,
		dice: input.effect.dice,
		damageType: input.effect.damageType,
		attribute: input.effect.attribute,
		critical,
	});

	const resolvedDamage =
		successfulSave && input.effect.save?.onSuccess === "halfDamage"
			? {
					...damage.value,
					amount: Math.floor(damage.value.amount / 2),
				}
			: damage.value;

	const updatedTarget = applyDamage(target, resolvedDamage);

	const updatedCombat = replaceCombatant(input.combat, updatedTarget);

	const message =
		input.logContext === "rider"
			? `${input.skillName} deals an additional ${damage.value.amount} damage to ${target.name}.`
			: `${actor.name} uses ${input.skillName} on ${target.name} for ${damage.value.amount} damage.`;

	return {
		value: appendCombatLog(updatedCombat, {
			turnNumber: input.combat.turnNumber,
			actor: actor.side,
			message,
			eventType: input.logContext === "rider" ? "effect_applied" : "damage_dealt",
		}),
		rngState: damage.rngState,
	};
}
