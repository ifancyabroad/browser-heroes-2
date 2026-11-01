import {
	type DamageAffinityKind,
	type Effect,
	type ModifyDamageAffinityEffect,
	type ModifyDamageEffect,
	type ModifyRollEffect,
	type ModifyStatEffect,
} from "@app/content";

import type { ActiveCombatEffect, CombatantState } from "../../../../schemas";
import { parseDiceFormula } from "../../../../core/dice";

import {
	collectWeaponAttackComponents,
	type EnemyEffectSource,
	type WeaponSkillEffect,
} from "./collectWeaponAttackComponents";
import { getPreferredSkillCategory, type EnemySkillCategory } from "../enemyActions";
import { getAttributeModifier } from "../../checks/getAttributeModifier";
import { getDamageAffinity } from "../../damage/damageAffinity";
import { getEffectiveDamageAffinities } from "../../effects/getEffectiveDamageAffinities";
import { getEffectiveHealingMultiplier } from "../../effects/getEffectiveHealingMultiplier";

type AssessEnemyEffectInput = {
	effect: Effect;
	source: EnemyEffectSource;
	sourceEffectKey: string;
	enemy: CombatantState;
	player: CombatantState;
};

export function assessEnemyEffect(input: AssessEnemyEffectInput): EnemySkillCategory | null {
	const { effect, sourceEffectKey, enemy, player, source } = input;
	const target = effect.target === "self" ? enemy : player;

	switch (effect.type) {
		case "attackDamage":
			return assessEnemyWeaponAttack(enemy, player, {
				effect,
				source,
				sourceEffectKey,
			});

		case "damage":
			return effect.target === "enemy" &&
				getDamageAffinity(player, effect.damageType) !== "immune"
				? "standard"
				: null;

		case "heal":
			return canUseRecovery(enemy) &&
				hasMeaningfulMissingHealth(enemy, expectedHealing(effect, enemy))
				? "recovery"
				: null;

		case "healOverTime":
			return canUseRecovery(enemy) && !hasActiveSourceEffect(target, source, sourceEffectKey)
				? "recovery"
				: null;

		case "applyStatus": {
			const alreadyActive =
				target.activeEffects.some(
					(activeEffect) =>
						activeEffect.type === "status" && activeEffect.statusId === effect.statusId,
				) || hasActiveSourceEffect(target, source, sourceEffectKey);
			if (alreadyActive) {
				return null;
			}
			// Preserve legacy eligibility for self-statuses, without setup preference.
			return effect.target === "enemy" ? "setup" : "standard";
		}

		case "modifyStat":
			return !hasActiveSourceEffect(target, source, sourceEffectKey) &&
				isStatChangeUseful(effect)
				? "setup"
				: null;

		case "modifyHealing": {
			if (hasActiveSourceEffect(target, source, sourceEffectKey)) {
				return null;
			}
			const beneficial =
				effect.target === "self" ? effect.multiplier > 1 : effect.multiplier < 1;
			return beneficial ? "setup" : "standard";
		}
		case "modifyDamageTaken": {
			if (hasActiveSourceEffect(target, source, sourceEffectKey)) {
				return null;
			}
			const neutralValue = effect.operation === "add" ? 0 : 1;
			const beneficial =
				effect.target === "self"
					? effect.value < neutralValue
					: effect.value > neutralValue;
			return beneficial ? "setup" : "standard";
		}
		case "shield":
			return !hasActiveSourceEffect(target, source, sourceEffectKey) ? "setup" : null;

		case "modifyDamage":
			return !hasActiveSourceEffect(target, source, sourceEffectKey) &&
				isDamageChangeUseful(effect)
				? "setup"
				: null;

		case "modifyRoll":
			return !hasActiveSourceEffect(target, source, sourceEffectKey) &&
				isRollChangeUseful(effect)
				? "setup"
				: null;

		case "modifyDamageAffinity":
			return !hasActiveSourceEffect(target, source, sourceEffectKey) &&
				isAffinityChangeUseful(effect, target, effect.target === "enemy")
				? "setup"
				: null;

		case "damageOverTime":
			return effect.target === "enemy" &&
				getDamageAffinity(player, effect.damageType) !== "immune" &&
				!hasActiveSourceEffect(target, source, sourceEffectKey)
				? "setup"
				: null;

		case "removeStatus":
			return null;
	}
}

export function assessEnemyWeaponAttack(
	enemy: CombatantState,
	player: CombatantState,
	skill?: WeaponSkillEffect,
): EnemySkillCategory | null {
	const components = collectWeaponAttackComponents(enemy, skill);
	const categories = components.riderEffects.map((rider) =>
		assessEnemyEffect({ ...rider, enemy, player }),
	);
	if (components.damageTypes.some((type) => getDamageAffinity(player, type) !== "immune")) {
		categories.push("standard");
	}
	return getPreferredSkillCategory(categories);
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
