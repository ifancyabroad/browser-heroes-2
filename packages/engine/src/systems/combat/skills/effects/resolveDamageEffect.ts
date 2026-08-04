import type { DamageEffect } from "@app/content";

import type { CombatantSide, CombatState } from "../../../../schemas";
import type { RngResult, RngState } from "../../../../core/rng";

import { getCombatant, getOpponent, replaceCombatant } from "../../combatants/combatantSelectors";
import { applyDamage } from "../../damage/applyDamage";
import { calculateDamage } from "../../damage/calculateDamage";
import { resolveAttackRoll } from "../../checks/resolveAttackRoll";
import { resolveCombatSavingThrow } from "../../checks/resolveCombatSavingThrow";
import type { ActionResolution } from "../../logs/actionOutcome";
import { consumeCombatantRollModifierCharges } from "../../effects/consumeRollModifierCharges";

type ResolveDamageEffectInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	effect: DamageEffect;
	rngState: RngState;
};

export function resolveDamageEffect(input: ResolveDamageEffectInput): RngResult<ActionResolution> {
	let combat = input.combat;
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
		combat = consumeCombatantRollModifierCharges(
			combat,
			actor.side,
			attackRoll.value.consumedEffectIds,
		);

		if (!attackRoll.value.hit) {
			return {
				value: {
					combat,
					outcomes: [
						{
							type: "miss",
							targetName: target.name,
							automatic: attackRoll.value.automaticOutcome === "miss",
						},
					],
				},
				rngState,
			};
		}
	}

	if (input.effect.save) {
		const savingThrow = resolveCombatSavingThrow({
			combat,
			rngState,
			attackerSide: actor.side,
			defenderSide: target.side,
			save: input.effect.save,
		});

		rngState = savingThrow.rngState;
		successfulSave = savingThrow.value.success;
		combat = savingThrow.value.combat;

		if (successfulSave && input.effect.save.onSuccess === "noEffect") {
			return {
				value: {
					combat,
					outcomes: [
						{
							type: "resisted",
							targetName: target.name,
							subject: `${input.effect.damageType} damage`,
						},
					],
				},
				rngState,
			};
		}
	}

	const resolvedActor = getCombatant(combat, actor.side);
	const resolvedTarget = getCombatant(combat, target.side);
	const damage = calculateDamage({
		rngState,
		attacker: resolvedActor,
		defender: resolvedTarget,
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

	const appliedDamage = applyDamage(resolvedTarget, resolvedDamage);

	const updatedTarget = appliedDamage.combatant;

	const updatedCombat = replaceCombatant(combat, updatedTarget);

	return {
		value: {
			combat: updatedCombat,
			outcomes: [
				{
					type: "damage",
					targetName: target.name,
					damageType: input.effect.damageType,
					hpDamage: appliedDamage.hpDamage,
					absorbedDamage: appliedDamage.absorbedDamage,
					affinity: resolvedDamage.affinity,
					critical,
					halfDamageSave: successfulSave && input.effect.save?.onSuccess === "halfDamage",
				},
			],
		},
		rngState: damage.rngState,
	};
}
