import type { Attribute } from "@app/content";

import type {
	CombatantBasicAttack,
	CombatantSide,
	CombatantState,
	CombatState,
} from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { appendCombatLog } from "../logs/appendCombatLog";
import { resolveAttackRoll } from "../checks/resolveAttackRoll";
import { applyDamage } from "../damage/applyDamage";
import { calculateDamage } from "../damage/calculateDamage";
import { getCombatant, getOpponent, replaceCombatant } from "../combatants/combatantSelectors";
import { getDamageMessage } from "../damage/getDamageMessage";
import { resolveAttackRiders } from "./resolveAttackRiders";
import { getSupportedAttackRiders } from "./getSupportedAttackRiders";

type ResolveBasicAttackInput = {
	combat: CombatState;
	attackerSide: CombatantSide;
	rngState: RngState;
};

type BasicAttackPart = {
	attack: CombatantBasicAttack;
	damageAttribute: Attribute | undefined;
	messageVerb: string;
	sourceKey: "mainHand" | "offHand";
};

type ResolveBasicAttackPartInput = {
	combat: CombatState;
	attackerSide: CombatantSide;
	attackPart: BasicAttackPart;
	rngState: RngState;
};

export function resolveBasicAttack(input: ResolveBasicAttackInput): RngResult<CombatState> {
	const attacker = getCombatant(input.combat, input.attackerSide);

	const attackParts = getBasicAttackParts(attacker);

	let combat = input.combat;
	let rngState = input.rngState;

	for (const attackPart of attackParts) {
		const result = resolveBasicAttackPart({
			combat,
			attackerSide: input.attackerSide,
			attackPart,
			rngState,
		});

		combat = result.value;
		rngState = result.rngState;

		const defender = getOpponent(combat, input.attackerSide);

		if (defender.currentHp <= 0) {
			break;
		}
	}

	return {
		value: combat,
		rngState,
	};
}

function getBasicAttackParts(attacker: CombatantState): BasicAttackPart[] {
	const attackParts: BasicAttackPart[] = [
		{
			attack: attacker.basicAttack,
			damageAttribute: attacker.basicAttack.damage.attribute,
			messageVerb: "attacks",
			sourceKey: "mainHand",
		},
	];

	if (attacker.offHandBasicAttack) {
		attackParts.push({
			attack: attacker.offHandBasicAttack,
			damageAttribute: undefined,
			messageVerb: "attacks with their off-hand weapon",
			sourceKey: "offHand",
		});
	}

	return attackParts;
}

function resolveBasicAttackPart(input: ResolveBasicAttackPartInput): RngResult<CombatState> {
	const attacker = getCombatant(input.combat, input.attackerSide);

	const defender = getOpponent(input.combat, input.attackerSide);

	const attackRoll = resolveAttackRoll({
		rngState: input.rngState,
		attacker,
		defender,
		attribute: getBasicAttackAttribute(input.attackPart.attack),
		proficient: input.attackPart.attack.proficient,
	});

	if (!attackRoll.value.hit) {
		return {
			value: appendCombatLog(input.combat, {
				turnNumber: input.combat.turnNumber,
				actor: attacker.side,
				message:
					`${attacker.name} ${input.attackPart.messageVerb} ` +
					`${defender.name} but misses.`,
				eventType: "basic_attack",
			}),
			rngState: attackRoll.rngState,
		};
	}

	const damage = calculateDamage({
		rngState: attackRoll.rngState,
		attacker,
		defender,
		dice: input.attackPart.attack.damage.dice,
		damageType: input.attackPart.attack.damage.type,
		attribute: input.attackPart.damageAttribute,
		critical: attackRoll.value.critical,
	});

	const appliedDamage = applyDamage(defender, damage.value);

	let resolvedCombat = replaceCombatant(input.combat, appliedDamage.combatant);

	resolvedCombat = appendCombatLog(resolvedCombat, {
		turnNumber: input.combat.turnNumber,
		actor: attacker.side,
		message: getDamageMessage({
			prefix: `${attacker.name} ${input.attackPart.messageVerb} ` + `${defender.name}`,
			hpDamage: appliedDamage.hpDamage,
			absorbedDamage: appliedDamage.absorbedDamage,
		}),
		eventType: "basic_attack",
	});

	let rngState = damage.rngState;

	const attackRiders = getSupportedAttackRiders(input.attackPart.attack.attackRiders);

	if (!attackRiders) {
		throw new Error(`${input.attackPart.attack.name} has unsupported attack riders`);
	}

	for (let riderIndex = 0; riderIndex < attackRiders.length; riderIndex += 1) {
		const rider = attackRiders[riderIndex];

		const shouldResolve =
			rider.timing === "onHit" || (rider.timing === "onCrit" && attackRoll.value.critical);

		if (!shouldResolve) {
			continue;
		}

		const riderResult = resolveAttackRiders({
			combat: resolvedCombat,
			actorSide: input.attackerSide,
			effects: rider.effects,
			save: rider.save,
			sourceContext: {
				source: {
					type: "basicAttack",
					sourceName: input.attackPart.attack.name,
				},
				sourceEffectKeyPrefix: `basicAttack:${input.attackPart.sourceKey}:rider:${riderIndex}`,
			},
			rngState,
		});

		resolvedCombat = riderResult.value;
		rngState = riderResult.rngState;
	}

	return {
		value: resolvedCombat,
		rngState,
	};
}

function getBasicAttackAttribute(basicAttack: CombatantBasicAttack): Attribute {
	return basicAttack.attackAttribute ?? basicAttack.damage.attribute ?? "strength";
}
