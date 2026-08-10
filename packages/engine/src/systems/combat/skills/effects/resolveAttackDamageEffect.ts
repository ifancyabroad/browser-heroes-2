import type { AttackDamageEffect, DamageType, SkillId } from "@app/content";

import type { CombatantSide, CombatState } from "../../../../schemas";

import type { RngResult, RngState } from "../../../../core/rng";

import { resolveAttackRoll } from "../../checks/resolveAttackRoll";
import { applyDamage } from "../../damage/applyDamage";
import { calculateDamage } from "../../damage/calculateDamage";
import { getCombatant, getOpponent, replaceCombatant } from "../../combatants/combatantSelectors";
import { resolveAttackRiders } from "../../attacks/resolveAttackRiders";
import type { ActionResolution } from "../../logs/actionOutcome";
import { resolveFeatAttackRiders } from "../../attacks/resolveFeatAttackRiders";
import { consumeCombatantRollModifierCharges } from "../../effects/consumeRollModifierCharges";

type ResolveAttackDamageEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: AttackDamageEffect;
	effectIndex: number;
	skillId: SkillId;
	skillName: string;
	rngState: RngState;
};

export function resolveAttackDamageEffect(
	input: ResolveAttackDamageEffectInput,
): RngResult<ActionResolution> {
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
		rollMode: input.effect.rollMode,
	});
	const combatAfterRoll = consumeCombatantRollModifierCharges(
		input.combat,
		input.actorSide,
		attackRoll.value.consumedEffectIds,
	);

	if (!attackRoll.value.hit) {
		return {
			value: {
				combat: combatAfterRoll,
				outcomes: [
					{
						type: "miss",
						targetId: target.id,
						targetName: target.name,
					},
				],
			},
			rngState: attackRoll.rngState,
		};
	}

	const damageType: DamageType = input.effect.damageTypeOverride ?? actor.basicAttack.damage.type;

	const mainDamage = calculateDamage({
		rngState: attackRoll.rngState,
		attacker: actor,
		defender: target,
		dice: actor.basicAttack.damage.dice,
		damageType,
		attribute: actor.basicAttack.damage.attribute,
		critical: attackRoll.value.critical,
		multiplier: input.effect.multiplier,
	});

	let rngState = mainDamage.rngState;

	const appliedMainDamage = applyDamage(target, mainDamage.value);

	let updatedTarget = appliedMainDamage.combatant;
	const outcomes: ActionResolution["outcomes"] = [
		{
			type: "damage",
			targetId: target.id,
			targetName: target.name,
			damageType,
			hpDamage: appliedMainDamage.hpDamage,
			absorbedDamage: appliedMainDamage.absorbedDamage,
			affinity: mainDamage.value.affinity,
			critical: attackRoll.value.critical,
			halfDamageSave: false,
		},
	];

	if (input.effect.extraDice) {
		const extraDamage = calculateDamage({
			rngState,
			attacker: actor,
			defender: updatedTarget,
			dice: input.effect.extraDice,
			damageType: input.effect.extraDamageType ?? damageType,
			critical: attackRoll.value.critical,
		});

		rngState = extraDamage.rngState;

		const appliedExtraDamage = applyDamage(updatedTarget, extraDamage.value);

		updatedTarget = appliedExtraDamage.combatant;
		outcomes.push({
			type: "damage",
			targetId: target.id,
			targetName: target.name,
			damageType: extraDamage.value.damageType,
			hpDamage: appliedExtraDamage.hpDamage,
			absorbedDamage: appliedExtraDamage.absorbedDamage,
			affinity: extraDamage.value.affinity,
			critical: attackRoll.value.critical,
			halfDamageSave: false,
		});
	}

	let resolvedCombat = replaceCombatant(combatAfterRoll, updatedTarget);

	for (let riderIndex = 0; riderIndex < input.effect.attackRiders.length; riderIndex += 1) {
		const rider = input.effect.attackRiders[riderIndex];

		const shouldResolve =
			rider.timing === "onHit" || (rider.timing === "onCrit" && attackRoll.value.critical);

		if (!shouldResolve) {
			continue;
		}

		const riderResult = resolveAttackRiders({
			combat: resolvedCombat,
			actorSide: input.actorSide,
			effects: rider.effects,
			save: rider.save,
			sourceContext: {
				source: {
					type: "skill",
					skillId: input.skillId,
					sourceName: input.skillName,
				},
				sourceEffectKeyPrefix: `effect:${input.effectIndex}:rider:${riderIndex}`,
			},
			rngState,
		});

		resolvedCombat = riderResult.value.combat;
		outcomes.push(...riderResult.value.outcomes);
		rngState = riderResult.rngState;
	}

	const featRiderResult = resolveFeatAttackRiders({
		combat: resolvedCombat,
		actorSide: input.actorSide,
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
