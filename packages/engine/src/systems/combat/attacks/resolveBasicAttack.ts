import type { Attribute } from "@app/content";

import type {
	CombatantBasicAttack,
	CombatantSide,
	CombatantState,
	CombatState,
} from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { resolveAttackRoll } from "../checks/resolveAttackRoll";
import { applyDamage } from "../damage/applyDamage";
import { calculateDamage } from "../damage/calculateDamage";
import { getCombatant, getOpponent, replaceCombatant } from "../combatants/combatantSelectors";
import { resolveAttackRiders } from "./resolveAttackRiders";
import type { ActionResolution } from "../logs/actionOutcome";
import { formatBasicAttackHeading } from "../logs/formatActionLog";
import { appendActionLog } from "../logs/appendActionLog";
import { resolveFeatAttackRiders } from "./resolveFeatAttackRiders";
import { consumeCombatantRollModifierCharges } from "../effects/consumeRollModifierCharges";

type ResolveBasicAttackInput = {
	combat: CombatState;
	attackerSide: CombatantSide;
	rngState: RngState;
};

type BasicAttackPart = {
	attack: CombatantBasicAttack;
	damageAttribute: Attribute | undefined;
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
	const outcomes: ActionResolution["outcomes"] = [];
	const initialDefender = getOpponent(input.combat, input.attackerSide);

	for (const attackPart of attackParts) {
		const result = resolveBasicAttackPart({
			combat,
			attackerSide: input.attackerSide,
			attackPart,
			rngState,
		});

		combat = result.value.combat;
		outcomes.push(...result.value.outcomes);
		rngState = result.rngState;

		const defender = getOpponent(combat, input.attackerSide);

		if (defender.currentHp <= 0) {
			break;
		}
	}

	return {
		value: appendActionLog({
			combat,
			actor: attacker.side,
			heading: formatBasicAttackHeading(attacker.name, initialDefender.name),
			eventType: "basic_attack",
			outcomes,
		}),
		rngState,
	};
}

function getBasicAttackParts(attacker: CombatantState): BasicAttackPart[] {
	const attackParts: BasicAttackPart[] = [
		{
			attack: attacker.basicAttack,
			damageAttribute: attacker.basicAttack.damage.attribute,
			sourceKey: "mainHand",
		},
	];

	if (attacker.offHandBasicAttack) {
		attackParts.push({
			attack: attacker.offHandBasicAttack,
			damageAttribute: undefined,
			sourceKey: "offHand",
		});
	}

	return attackParts;
}

function resolveBasicAttackPart(input: ResolveBasicAttackPartInput): RngResult<ActionResolution> {
	const attacker = getCombatant(input.combat, input.attackerSide);

	const defender = getOpponent(input.combat, input.attackerSide);

	const attackRoll = resolveAttackRoll({
		rngState: input.rngState,
		attacker,
		defender,
		attribute: getBasicAttackAttribute(input.attackPart.attack),
		proficient: input.attackPart.attack.proficient,
	});
	const combatAfterRoll = consumeCombatantRollModifierCharges(
		input.combat,
		input.attackerSide,
		attackRoll.value.consumedEffectIds,
	);

	if (!attackRoll.value.hit) {
		return {
			value: {
				combat: combatAfterRoll,
				outcomes: [
					{
						type: "miss",
						targetId: defender.id,
						targetName: defender.name,
					},
				],
			},
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

	let resolvedCombat = replaceCombatant(combatAfterRoll, appliedDamage.combatant);
	const outcomes: ActionResolution["outcomes"] = [
		{
			type: "damage",
			targetId: defender.id,
			targetName: defender.name,
			damageType: damage.value.damageType,
			hpDamage: appliedDamage.hpDamage,
			absorbedDamage: appliedDamage.absorbedDamage,
			affinity: damage.value.affinity,
			critical: attackRoll.value.critical,
			halfDamageSave: false,
		},
	];

	let rngState = damage.rngState;

	const attackRiders = input.attackPart.attack.attackRiders;

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
					sourceDefinitionId: `${attacker.sourceId}:${input.attackPart.sourceKey}`,
					sourceName: input.attackPart.attack.name,
				},
				sourceEffectKeyPrefix: `basicAttack:${input.attackPart.sourceKey}:rider:${riderIndex}`,
			},
			rngState,
		});

		resolvedCombat = riderResult.value.combat;
		outcomes.push(...riderResult.value.outcomes);
		rngState = riderResult.rngState;
	}

	const featRiderResult = resolveFeatAttackRiders({
		combat: resolvedCombat,
		actorSide: input.attackerSide,
		critical: attackRoll.value.critical,
		rngState,
	});

	resolvedCombat = featRiderResult.value.combat;
	outcomes.push(...featRiderResult.value.outcomes);
	rngState = featRiderResult.rngState;

	return {
		value: { combat: resolvedCombat, outcomes },
		rngState,
	};
}

function getBasicAttackAttribute(basicAttack: CombatantBasicAttack): Attribute {
	return basicAttack.attackAttribute ?? basicAttack.damage.attribute ?? "strength";
}
