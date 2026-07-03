import type { DamageType, SkillId } from "@app/content";

import type { CombatantSide, CombatState } from "../../../../schemas";

import type { RngResult, RngState } from "../../../../core/rng";

import type { SupportedAttackDamageEffect } from "../validatePlayerSkillUse";

import { resolveAttackRoll } from "../../checks/resolveAttackRoll";
import { applyDamage } from "../../damage/applyDamage";
import { calculateDamage } from "../../damage/calculateDamage";
import { getCombatant, getOpponent, replaceCombatant } from "../../combatants/combatantSelectors";
import { appendCombatLog } from "../../logs/appendCombatLog";
import { resolveAttackRiderEffects } from "../resolveAttackRiderEffects";
import { getDamageMessage } from "../../damage/getDamageMessage";

type ResolveAttackDamageEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: SupportedAttackDamageEffect;
	effectIndex: number;
	skillId: SkillId;
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
	let totalHpDamage = appliedMainDamage.hpDamage;
	let totalAbsorbedDamage = appliedMainDamage.absorbedDamage;

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
		totalHpDamage += appliedExtraDamage.hpDamage;
		totalAbsorbedDamage += appliedExtraDamage.absorbedDamage;
	}

	let resolvedCombat = replaceCombatant(input.combat, updatedTarget);

	resolvedCombat = appendCombatLog(resolvedCombat, {
		turnNumber: input.combat.turnNumber,
		actor: actor.side,
		message: getDamageMessage({
			prefix: `${actor.name} uses ${input.skillName} on ` + `${target.name}`,
			hpDamage: totalHpDamage,
			absorbedDamage: totalAbsorbedDamage,
		}),
		eventType: "skill_used",
	});

	for (let riderIndex = 0; riderIndex < input.effect.attackRiders.length; riderIndex += 1) {
		const rider = input.effect.attackRiders[riderIndex];

		const shouldResolve =
			rider.timing === "onHit" || (rider.timing === "onCrit" && attackRoll.value.critical);

		if (!shouldResolve) {
			continue;
		}

		const riderResult = resolveAttackRiderEffects({
			combat: resolvedCombat,
			actorSide: input.actorSide,
			effects: rider.effects,
			save: rider.save,
			skillId: input.skillId,
			skillName: input.skillName,
			parentEffectIndex: input.effectIndex,
			riderIndex,
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
