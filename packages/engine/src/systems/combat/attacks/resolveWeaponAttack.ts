import type { AttackDamageEffect, AttackRider, DamageType, SkillId } from "@app/content";

import type { CombatantBasicAttack, CombatantSide, CombatState } from "../../../schemas";

import type { RngResult, RngState } from "../../../core/rng";

import { resolveAttackRoll } from "../checks/resolveAttackRoll";
import { applyDamage } from "../damage/applyDamage";
import { calculateDamage } from "../damage/calculateDamage";
import { getCombatant, getOpponent, replaceCombatant } from "../combatants/combatantSelectors";
import { resolveAttackRiders, type AttackRiderSourceContext } from "./resolveAttackRiders";
import type { ActionResolution } from "../logs/actionOutcome";
import { resolveFeatAttackRiders } from "./resolveFeatAttackRiders";
import { consumeCombatantRollModifierCharges } from "../effects/consumeRollModifierCharges";

type WeaponSkillEnhancement = {
	effect: AttackDamageEffect;
	effectIndex: number;
	skillId: SkillId;
	skillName: string;
};
type ResolveWeaponAttackInput = {
	combat: CombatState;
	actorSide: CombatantSide;
	rngState: RngState;
	skill?: WeaponSkillEnhancement;
};

// Each attack-damage effect uses the same hand sequence as a basic attack.
export function resolveWeaponAttack(input: ResolveWeaponAttackInput): RngResult<ActionResolution> {
	const actor = getCombatant(input.combat, input.actorSide);
	const mainHand = resolveWeaponAttackPart({
		...input,
		attack: actor.basicAttack,
		hand: "mainHand",
	});
	if (
		!actor.offHandBasicAttack ||
		getOpponent(mainHand.value.combat, input.actorSide).currentHp <= 0
	) {
		return mainHand;
	}
	const offHand = resolveWeaponAttackPart({
		combat: mainHand.value.combat,
		actorSide: input.actorSide,
		rngState: mainHand.rngState,
		attack: actor.offHandBasicAttack,
		hand: "offHand",
	});
	return {
		value: {
			combat: offHand.value.combat,
			outcomes: [...mainHand.value.outcomes, ...offHand.value.outcomes],
		},
		rngState: offHand.rngState,
	};
}

function resolveWeaponAttackPart(
	input: ResolveWeaponAttackInput & {
		attack: CombatantBasicAttack;
		hand: "mainHand" | "offHand";
	},
): RngResult<ActionResolution> {
	const actor = getCombatant(input.combat, input.actorSide);

	const target = getOpponent(input.combat, input.actorSide);

	const attackAttribute =
		input.attack.attackAttribute ?? input.attack.damage.attribute ?? "strength";

	const attackRoll = resolveAttackRoll({
		rngState: input.rngState,
		attacker: actor,
		defender: target,
		attribute: attackAttribute,
		proficient: input.attack.proficient,
		rollMode: input.skill?.effect.rollMode,
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

	const damageType: DamageType =
		input.skill?.effect.damageTypeOverride ?? input.attack.damage.type;

	const mainDamage = calculateDamage({
		rngState: attackRoll.rngState,
		attacker: actor,
		defender: target,
		dice: input.attack.damage.dice,
		damageType,
		damageClass: input.skill?.effect.damageClassOverride ?? input.attack.damage.damageClass,
		attackRange: input.skill?.effect.attackRangeOverride ?? input.attack.attackRange,
		attribute: input.hand === "mainHand" ? input.attack.damage.attribute : undefined,
		critical: attackRoll.value.critical,
		multiplier: input.skill?.effect.multiplier,
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

	if (input.skill?.effect.extraDice) {
		const extraDamage = calculateDamage({
			rngState,
			attacker: actor,
			defender: updatedTarget,
			dice: input.skill.effect.extraDice,
			damageType: input.skill.effect.extraDamageType ?? damageType,
			damageClass: input.skill.effect.extraDamageClass!,
			attackRange: input.skill?.effect.attackRangeOverride ?? input.attack.attackRange,
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

	const riderGroups: { riders: AttackRider[]; context: AttackRiderSourceContext }[] = [];
	if (input.skill) {
		riderGroups.push({
			riders: input.skill.effect.attackRiders,
			context: {
				source: {
					type: "skill",
					skillId: input.skill.skillId,
					sourceName: input.skill.skillName,
				},
				sourceEffectKeyPrefix: `effect:${input.skill.effectIndex}`,
			},
		});
	}
	riderGroups.push({
		riders: input.attack.attackRiders,
		context: {
			source: {
				type: "basicAttack",
				sourceDefinitionId: `${actor.sourceId}:${input.hand}`,
				sourceName: input.attack.name,
				sourceIcon: input.attack.icon,
			},
			sourceEffectKeyPrefix: `basicAttack:${input.hand}`,
		},
	});

	for (const group of riderGroups) {
		for (const [riderIndex, rider] of group.riders.entries()) {
			if (rider.timing === "onCrit" && !attackRoll.value.critical) {
				continue;
			}
			const result = resolveAttackRiders({
				combat: resolvedCombat,
				actorSide: input.actorSide,
				effects: rider.effects,
				save: rider.save,
				sourceContext: {
					...group.context,
					sourceEffectKeyPrefix: `${group.context.sourceEffectKeyPrefix}:rider:${riderIndex}`,
				},
				rngState,
			});
			resolvedCombat = result.value.combat;
			outcomes.push(...result.value.outcomes);
			rngState = result.rngState;
		}
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
