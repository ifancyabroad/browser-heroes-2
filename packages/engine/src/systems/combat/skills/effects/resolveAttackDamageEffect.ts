import type { AttackDamageEffect, DamageType } from "@app/content";

import type { CombatantSide, CombatState } from "../../../../schemas";
import type { RngResult, RngState } from "../../../../core/rng";

import { resolveAttackRoll } from "../../checks/resolveAttackRoll";
import { applyDamage } from "../../damage/applyDamage";
import { calculateDamage } from "../../damage/calculateDamage";
import { getCombatant, getOpponent, replaceCombatant } from "../../combatants/combatantSelectors";
import { appendCombatLog } from "../../logs/appendCombatLog";

type ResolveAttackDamageEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: AttackDamageEffect;
	skillName: string;
	rngState: RngState;
};

export function resolveAttackDamageEffect(
	input: ResolveAttackDamageEffectInput,
): RngResult<CombatState> {
	const actor = getCombatant(input.combat, input.actorSide);

	const target = getOpponent(input.combat, input.actorSide);

	const attackAttribute =
		actor.basicAttack.attackAttribute ?? actor.basicAttack.damage.attribute ?? "strength";

	const attackRoll = resolveAttackRoll({
		rngState: input.rngState,
		attacker: actor,
		defender: target,
		attribute: attackAttribute,
		proficient: actor.basicAttack.proficient,
	});

	if (!attackRoll.value.hit) {
		return {
			value: appendCombatLog(input.combat, {
				turnNumber: input.combat.turnNumber,
				actor: actor.side,
				message: `${actor.name} uses ${input.skillName} on ` + `${target.name} but misses.`,
				eventType: "skill_used",
			}),
			rngState: attackRoll.rngState,
		};
	}

	const damageType: DamageType = input.effect.damageTypeOverride ?? actor.basicAttack.damage.type;

	const damage = calculateDamage({
		rngState: attackRoll.rngState,
		attacker: actor,
		defender: target,
		dice: actor.basicAttack.damage.dice,
		damageType,
		attribute: actor.basicAttack.damage.attribute,
		critical: attackRoll.value.critical,
		multiplier: input.effect.multiplier,
	});

	const updatedTarget = applyDamage(target, damage.value);

	const updatedCombat = replaceCombatant(input.combat, updatedTarget);

	return {
		value: appendCombatLog(updatedCombat, {
			turnNumber: input.combat.turnNumber,
			actor: actor.side,
			message:
				`${actor.name} uses ${input.skillName} on ` +
				`${target.name} for ${damage.value.amount} damage.`,
			eventType: "skill_used",
		}),
		rngState: damage.rngState,
	};
}
