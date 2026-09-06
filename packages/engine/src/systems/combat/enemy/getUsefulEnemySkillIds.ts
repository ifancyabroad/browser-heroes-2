import {
	type DamageAffinityKind,
	type Effect,
	type ModifyDamageAffinityEffect,
	type RiderEffect,
	type SkillId,
} from "@app/content";

import type { ActiveCombatEffect, CombatantState } from "../../../schemas";
import { parseDiceFormula } from "../../../core/dice";

import { getDamageAffinity } from "../damage/damageAffinity";
import { getEffectiveDamageAffinities } from "../effects/getEffectiveDamageAffinities";
import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";
import { getAttributeModifier } from "../checks/getAttributeModifier";
import { getEffectiveHealingMultiplier } from "../effects/getEffectiveHealingMultiplier";

export function getUsefulEnemySkillIds(enemy: CombatantState, player: CombatantState): SkillId[] {
	return enemy.skills
		.filter((skillState) => {
			const validation = validateCombatantSkillUse(enemy, skillState.skillId);

			return (
				validation.ok &&
				isSkillUseful(validation.value.effects, enemy, player, skillState.skillId)
			);
		})
		.map((skillState) => skillState.skillId);
}

function isSkillUseful(
	effects: Effect[],
	enemy: CombatantState,
	player: CombatantState,
	skillId: SkillId,
): boolean {
	const recoveryIsRestricted = effects.some(isRecoveryEffect) && !canUseRecovery(enemy);

	return effects.some((effect, effectIndex) => {
		if (recoveryIsRestricted && effect.target !== "enemy") {
			return false;
		}

		return isEffectUseful(effect, `effect:${effectIndex}`, enemy, player, skillId);
	});
}

function isRecoveryEffect(effect: Effect): boolean {
	return effect.type === "heal" || effect.type === "healOverTime";
}

function isEffectUseful(
	effect: Effect | RiderEffect,
	sourceEffectKey: string,
	enemy: CombatantState,
	player: CombatantState,
	skillId: SkillId,
): boolean {
	const target = effect.target === "self" ? enemy : player;

	switch (effect.type) {
		case "damage":
			return (
				effect.target === "enemy" &&
				getDamageAffinity(player, effect.damageType) !== "immune"
			);

		case "attackDamage": {
			const attackDamageType = effect.damageTypeOverride ?? enemy.basicAttack.damage.type;
			return (
				getDamageAffinity(player, attackDamageType) !== "immune" ||
				(effect.extraDamageType !== undefined &&
					getDamageAffinity(player, effect.extraDamageType) !== "immune") ||
				effect.attackRiders.some((rider, riderIndex) =>
					rider.effects.some((riderEffect, riderEffectIndex) =>
						isEffectUseful(
							riderEffect,
							`${sourceEffectKey}:rider:${riderIndex}:effect:${riderEffectIndex}`,
							enemy,
							player,
							skillId,
						),
					),
				)
			);
		}

		case "heal":
			return (
				canUseRecovery(enemy) &&
				hasMeaningfulMissingHealth(enemy, expectedHealing(effect, enemy))
			);

		case "healOverTime":
			return (
				canUseRecovery(enemy) &&
				!hasActiveSourceEffect(enemy, enemy, skillId, sourceEffectKey)
			);

		case "applyStatus":
			return (
				!target.activeEffects.some(
					(activeEffect) =>
						activeEffect.type === "status" && activeEffect.statusId === effect.statusId,
				) && !hasActiveSourceEffect(target, enemy, skillId, sourceEffectKey)
			);

		case "modifyStat":
		case "modifyHealing":
		case "modifyDamage":
		case "modifyDamageTaken":
		case "modifyRoll":
		case "shield":
			return !hasActiveSourceEffect(target, enemy, skillId, sourceEffectKey);

		case "modifyDamageAffinity":
			return (
				!hasActiveSourceEffect(target, enemy, skillId, sourceEffectKey) &&
				isAffinityChangeUseful(effect, target, effect.target === "enemy")
			);

		case "damageOverTime":
			return (
				effect.target === "enemy" &&
				getDamageAffinity(player, effect.damageType) !== "immune" &&
				!hasActiveSourceEffect(target, enemy, skillId, sourceEffectKey)
			);

		case "removeStatus":
			return false;
	}
}

function canUseRecovery(combatant: CombatantState): boolean {
	return combatant.currentHp <= combatant.maxHp / 2;
}

function expectedHealing(effect: Extract<Effect, { type: "heal" }>, enemy: CombatantState): number {
	const { count, sides, modifier } = parseDiceFormula(effect.dice);
	const diceAverage = count * ((sides + 1) / 2) + modifier;
	const attributeModifier = effect.attribute ? getAttributeModifier(enemy, effect.attribute) : 0;

	return Math.max(1, (diceAverage + attributeModifier) * getEffectiveHealingMultiplier(enemy));
}

function hasMeaningfulMissingHealth(combatant: CombatantState, expectedAmount: number): boolean {
	const missingHp = combatant.maxHp - combatant.currentHp;

	return missingHp >= Math.max(1, Math.ceil(expectedAmount / 2));
}

function hasActiveSourceEffect(
	target: CombatantState,
	source: CombatantState,
	skillId: SkillId,
	sourceEffectKey: string,
): boolean {
	return target.activeEffects.some((effect: ActiveCombatEffect) =>
		isMatchingSourceEffect(effect, source.side, skillId, sourceEffectKey),
	);
}

function isAffinityChangeUseful(
	effect: ModifyDamageAffinityEffect,
	target: CombatantState,
	isEnemyTarget: boolean,
): boolean {
	const affinities = getEffectiveDamageAffinities(target);
	const before = getAffinityRank(affinities, effect.damageType);
	const affinityKey = getAffinityKey(effect.affinity);
	const changedValues = new Set(affinities[affinityKey]);

	if (effect.operation === "add") {
		changedValues.add(effect.damageType);
	} else {
		changedValues.delete(effect.damageType);
	}

	const after = getAffinityRank(
		{ ...affinities, [affinityKey]: [...changedValues] },
		effect.damageType,
	);

	return isEnemyTarget ? after > before : after < before;
}

function getAffinityKey(
	affinity: DamageAffinityKind,
): "resistances" | "immunities" | "vulnerabilities" {
	switch (affinity) {
		case "resistance":
			return "resistances";
		case "immunity":
			return "immunities";
		case "vulnerability":
			return "vulnerabilities";
	}
}

function getAffinityRank(
	affinities: CombatantState["combatStats"]["damageAffinities"],
	damageType: ModifyDamageAffinityEffect["damageType"],
): number {
	if (affinities.immunities.includes(damageType)) {
		return 0;
	}

	const isResistant = affinities.resistances.includes(damageType);
	const isVulnerable = affinities.vulnerabilities.includes(damageType);

	if (isResistant && isVulnerable) {
		return 2;
	}
	if (isVulnerable) {
		return 3;
	}
	if (isResistant) {
		return 1;
	}
	return 2;
}

function isMatchingSourceEffect(
	effect: ActiveCombatEffect,
	sourceSide: CombatantState["side"],
	skillId: SkillId,
	sourceEffectKey: string,
): boolean {
	return (
		effect.sourceSide === sourceSide &&
		effect.source.type === "skill" &&
		effect.source.skillId === skillId &&
		effect.source.sourceEffectKey === sourceEffectKey
	);
}
