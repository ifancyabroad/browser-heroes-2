import type { Attribute } from "@app/content";

import type { CombatantSide, CombatantState, CombatState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { appendCombatLog } from "../logs/appendCombatLog";
import { resolveAttackRoll } from "../checks/resolveAttackRoll";
import { applyDamage } from "../damage/applyDamage";
import { calculateDamage } from "../damage/calculateDamage";
import { getCombatant, getOpponent, replaceCombatant } from "../combatants/combatantSelectors";
import { getDamageMessage } from "../damage/getDamageMessage";

type ResolveBasicAttackInput = {
	combat: CombatState;
	attackerSide: CombatantSide;
	rngState: RngState;
};

export function resolveBasicAttack(input: ResolveBasicAttackInput): RngResult<CombatState> {
	const attacker = getCombatant(input.combat, input.attackerSide);

	const defender = getOpponent(input.combat, input.attackerSide);

	const attackRoll = resolveAttackRoll({
		rngState: input.rngState,
		attacker,
		defender,
		attribute: getBasicAttackAttribute(attacker.basicAttack),
		proficient: attacker.basicAttack.proficient,
	});

	if (!attackRoll.value.hit) {
		return {
			value: appendCombatLog(input.combat, {
				turnNumber: input.combat.turnNumber,
				actor: attacker.side,
				message: `${attacker.name} attacks ` + `${defender.name} but misses.`,
				eventType: "basic_attack",
			}),
			rngState: attackRoll.rngState,
		};
	}

	const damage = calculateDamage({
		rngState: attackRoll.rngState,
		attacker,
		defender,
		dice: attacker.basicAttack.damage.dice,
		damageType: attacker.basicAttack.damage.type,
		attribute: attacker.basicAttack.damage.attribute,
		critical: attackRoll.value.critical,
	});

	const appliedDamage = applyDamage(defender, damage.value);

	const updatedDefender = appliedDamage.combatant;

	const nextCombat = replaceCombatant(input.combat, updatedDefender);

	return {
		value: appendCombatLog(nextCombat, {
			turnNumber: input.combat.turnNumber,
			actor: attacker.side,
			message: getDamageMessage({
				prefix: `${attacker.name} attacks ${defender.name}`,
				hpDamage: appliedDamage.hpDamage,
				absorbedDamage: appliedDamage.absorbedDamage,
			}),
			eventType: "basic_attack",
		}),
		rngState: damage.rngState,
	};
}

function getBasicAttackAttribute(basicAttack: CombatantState["basicAttack"]): Attribute {
	return basicAttack.attackAttribute ?? basicAttack.damage.attribute ?? "strength";
}
