import type { Attribute } from "@app/content";
import type { CombatantSide, CombatState } from "../../schemas";
import type { RngResult, RngState } from "../../core/rng";
import { appendCombatLog } from "./combatLog";
import { resolveAttackRoll } from "./checks";
import { applyDamage, calculateDamage } from "./damage";

export function resolveBasicAttack(input: {
	combat: CombatState;
	attackerSide: CombatantSide;
	rngState: RngState;
}): RngResult<CombatState> {
	const attacker = getCombatant(input.combat, input.attackerSide);
	const defender = getOpponent(input.combat, input.attackerSide);
	const attackAttribute = getBasicAttackAttribute(attacker.basicAttack);
	const attackRoll = resolveAttackRoll({
		rngState: input.rngState,
		attacker,
		defender,
		attribute: attackAttribute,
		proficient: attacker.basicAttack.proficient,
	});

	if (!attackRoll.value.hit) {
		return {
			value: appendCombatLog(input.combat, {
				turnNumber: input.combat.turnNumber,
				actor: attacker.side,
				message: `${attacker.name} attacks ${defender.name} but misses.`,
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
	const updatedDefender = applyDamage(defender, damage.value);
	const nextCombat: CombatState = {
		...input.combat,
		player: updatedDefender.side === "player" ? updatedDefender : input.combat.player,
		enemy: updatedDefender.side === "enemy" ? updatedDefender : input.combat.enemy,
	};

	return {
		value: appendCombatLog(nextCombat, {
			turnNumber: input.combat.turnNumber,
			actor: attacker.side,
			message: `${attacker.name} attacks ${defender.name} for ${damage.value.amount} damage.`,
			eventType: "basic_attack",
		}),
		rngState: damage.rngState,
	};
}

function getBasicAttackAttribute(basicAttack: CombatState["player"]["basicAttack"]): Attribute {
	return basicAttack.attackAttribute ?? basicAttack.damage.attribute ?? "strength";
}

function getCombatant(combat: CombatState, side: CombatantSide): CombatState["player"] {
	return side === "player" ? combat.player : combat.enemy;
}

function getOpponent(combat: CombatState, side: CombatantSide): CombatState["player"] {
	return side === "player" ? combat.enemy : combat.player;
}
