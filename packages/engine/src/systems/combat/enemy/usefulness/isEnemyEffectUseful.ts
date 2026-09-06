import {
	type DamageAffinityKind,
	type Effect,
	type FeatId,
	type ModifyDamageAffinityEffect,
	type ModifyDamageEffect,
	type ModifyRollEffect,
	type ModifyStatEffect,
	type RiderEffect,
	type SkillId,
} from "@app/content";

import type { ActiveCombatEffect, CombatantState } from "../../../../schemas";
import { parseDiceFormula } from "../../../../core/dice";

import { getAttributeModifier } from "../../checks/getAttributeModifier";
import { getDamageAffinity } from "../../damage/damageAffinity";
import { getEffectiveDamageAffinities } from "../../effects/getEffectiveDamageAffinities";
import { getEffectiveHealingMultiplier } from "../../effects/getEffectiveHealingMultiplier";

export type EnemyEffectSource =
	| { type: "skill"; skillId: SkillId }
	| { type: "basicAttack"; sourceDefinitionId: string }
	| { type: "feat"; featId: FeatId };

type IsEnemyEffectUsefulInput = {
	effect: Effect | RiderEffect;
	source: EnemyEffectSource;
	sourceEffectKey: string;
	enemy: CombatantState;
	player: CombatantState;
};

export function isEnemyEffectUseful(input: IsEnemyEffectUsefulInput): boolean {
	const { effect, sourceEffectKey, enemy, player, source } = input;
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
						isEnemyEffectUseful({
							effect: riderEffect,
							source,
							sourceEffectKey: `${sourceEffectKey}:rider:${riderIndex}:effect:${riderEffectIndex}`,
							enemy,
							player,
						}),
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
			return canUseRecovery(enemy) && !hasActiveSourceEffect(target, source, sourceEffectKey);

		case "applyStatus":
			return (
				!target.activeEffects.some(
					(activeEffect) =>
						activeEffect.type === "status" && activeEffect.statusId === effect.statusId,
				) && !hasActiveSourceEffect(target, source, sourceEffectKey)
			);

		case "modifyStat":
			return (
				!hasActiveSourceEffect(target, source, sourceEffectKey) &&
				isStatChangeUseful(effect)
			);

		case "modifyHealing":
		case "modifyDamageTaken":
		case "shield":
			return !hasActiveSourceEffect(target, source, sourceEffectKey);

		case "modifyDamage":
			return (
				!hasActiveSourceEffect(target, source, sourceEffectKey) &&
				isDamageChangeUseful(effect)
			);

		case "modifyRoll":
			return (
				!hasActiveSourceEffect(target, source, sourceEffectKey) &&
				isRollChangeUseful(effect)
			);

		case "modifyDamageAffinity":
			return (
				!hasActiveSourceEffect(target, source, sourceEffectKey) &&
				isAffinityChangeUseful(effect, target, effect.target === "enemy")
			);

		case "damageOverTime":
			return (
				effect.target === "enemy" &&
				getDamageAffinity(player, effect.damageType) !== "immune" &&
				!hasActiveSourceEffect(target, source, sourceEffectKey)
			);

		case "removeStatus":
			return false;
	}
}

function isStatChangeUseful(effect: ModifyStatEffect): boolean {
	return effect.value !== 0 && (effect.target === "self" ? effect.value > 0 : effect.value < 0);
}

function isDamageChangeUseful(effect: ModifyDamageEffect): boolean {
	return effect.target === "self"
		? effect.operation === "add"
			? effect.value > 0
			: effect.value > 1
		: effect.operation === "add"
			? effect.value < 0
			: effect.value < 1;
}

function isRollChangeUseful(effect: ModifyRollEffect): boolean {
	return effect.target === "self"
		? effect.mode === "advantage" ||
				effect.mode === "automaticSuccess" ||
				effect.mode === "automaticCritical"
		: effect.mode === "disadvantage" || effect.mode === "automaticFailure";
}

export function canUseRecovery(combatant: CombatantState): boolean {
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
	source: EnemyEffectSource,
	sourceEffectKey: string,
): boolean {
	return target.activeEffects.some(
		(effect) =>
			effect.sourceSide === "enemy" &&
			effect.source.sourceEffectKey === sourceEffectKey &&
			isMatchingSource(effect, source),
	);
}

function isMatchingSource(effect: ActiveCombatEffect, source: EnemyEffectSource): boolean {
	switch (source.type) {
		case "skill":
			return effect.source.type === "skill" && effect.source.skillId === source.skillId;
		case "basicAttack":
			return (
				effect.source.type === "basicAttack" &&
				effect.source.sourceDefinitionId === source.sourceDefinitionId
			);
		case "feat":
			return effect.source.type === "feat" && effect.source.featId === source.featId;
	}
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
