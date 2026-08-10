import type { EffectDuration, ModifiableStat, RollModifierMode } from "@app/content";

import type { CombatLogEntryContent } from "../../../schemas/log.schema";
import type { ActionOutcome } from "./actionOutcome";

const statLabels: Record<ModifiableStat, string> = {
	strength: "Strength",
	dexterity: "Dexterity",
	constitution: "Constitution",
	intelligence: "Intelligence",
	wisdom: "Wisdom",
	charisma: "Charisma",
	armourClass: "Armour Class",
	attackRollBonus: "attack rolls",
	savingThrowBonus: "saving throws",
	saveDcBonus: "save DC",
	criticalRangeBonus: "critical range",
	criticalDiceMultiplierBonus: "critical damage dice multiplier",
	maxHpBonus: "maximum HP",
};

export function formatSkillHeading(
	actorName: string,
	skillName: string,
	outcomes: ActionOutcome[],
): string {
	const targets = [...new Set(outcomes.map((outcome) => outcome.targetName))];
	const targetSuffix =
		targets.length === 1 && targets[0] !== actorName ? ` on ${targets[0]}` : "";
	return `${actorName} uses ${skillName}${targetSuffix}.`;
}

export function formatBasicAttackHeading(actorName: string, targetName: string): string {
	return `${actorName} attacks ${targetName}.`;
}

export function formatActionOutcome(outcome: ActionOutcome): CombatLogEntryContent {
	switch (outcome.type) {
		case "miss":
			return {
				message: `The attack misses ${outcome.targetName}.`,
				eventType: "attack_missed",
				outcome: {
					type: "miss",
					targetId: outcome.targetId,
				},
			};

		case "resisted":
			return {
				message: `${outcome.targetName} resists ${outcome.subject}.`,
				eventType: "effect_resisted",
			};

		case "damage":
			return {
				message: formatDamageOutcome(outcome),
				eventType: "damage_dealt",
				outcome: {
					type: "damage",
					targetId: outcome.targetId,
					hpDamage: outcome.hpDamage,
					absorbedDamage: outcome.absorbedDamage,
					damageType: outcome.damageType,
					affinity: outcome.affinity,
					critical: outcome.critical,
					halfDamageSave: outcome.halfDamageSave,
				},
			};

		case "healing":
			return {
				message:
					outcome.amount === 0
						? `${outcome.targetName} is already at full health.`
						: `${outcome.targetName} restores ${outcome.amount} health.`,
				eventType: "healing_done",
			};

		case "status":
			return {
				message: outcome.refreshed
					? `${capitalize(outcome.effect.statusId === "stunned" ? "stun" : "silence")} on ${outcome.targetName} is refreshed for ${formatEffectDuration(outcome.effect.duration)}.`
					: `${outcome.targetName} is ${outcome.effect.statusId} for ${formatEffectDuration(outcome.effect.duration)}.`,
				eventType: "effect_applied",
			};

		case "modifier":
			return {
				message: formatModifierOutcome(outcome),
				eventType: "effect_applied",
			};

		case "recurring":
			return {
				message: formatRecurringOutcome(outcome),
				eventType: "effect_applied",
			};
	}
}

function formatDamageOutcome(outcome: Extract<ActionOutcome, { type: "damage" }>): string {
	const prefix = outcome.critical ? "Critical hit! " : "";
	const saveText = outcome.halfDamageSave ? " succeeds on the saving throw and" : "";

	if (outcome.affinity === "immune") {
		return `${prefix}${outcome.targetName} is immune to ${outcome.damageType} damage.`;
	}

	if (outcome.hpDamage === 0 && outcome.absorbedDamage > 0) {
		const savePrefix = outcome.halfDamageSave
			? `${outcome.targetName} succeeds on the saving throw, and `
			: "";
		return `${prefix}${savePrefix}${outcome.targetName}'s shield absorbs all ${outcome.absorbedDamage} ${outcome.damageType} damage.`;
	}

	if (outcome.absorbedDamage > 0) {
		return `${prefix}${outcome.targetName}${saveText} takes ${outcome.hpDamage} ${outcome.damageType} damage after a shield absorbs ${outcome.absorbedDamage}.`;
	}

	return `${prefix}${outcome.targetName}${saveText} takes ${outcome.hpDamage} ${outcome.damageType} damage.`;
}

function formatModifierOutcome(outcome: Extract<ActionOutcome, { type: "modifier" }>): string {
	const { effect, targetName, refreshed } = outcome;
	const duration = formatEffectDuration(effect.duration);

	switch (effect.type) {
		case "modifyStat":
			if (refreshed) {
				return `${targetName}'s ${statLabels[effect.stat]} ${effect.value < 0 ? "reduction" : "increase"} of ${Math.abs(effect.value)} is refreshed for ${duration}.`;
			}
			return `${targetName}'s ${statLabels[effect.stat]} is ${effect.value < 0 ? "reduced" : "increased"} by ${Math.abs(effect.value)} for ${duration}.`;

		case "modifyHealing": {
			const percent = Math.round(Math.abs(1 - effect.multiplier) * 100);
			return refreshed
				? `${targetName}'s ${percent}% healing ${effect.multiplier < 1 ? "reduction" : "increase"} is refreshed for ${duration}.`
				: `${targetName}'s healing is ${effect.multiplier < 1 ? "reduced" : "increased"} by ${percent}% for ${duration}.`;
		}

		case "modifyDamage":
		case "modifyDamageTaken": {
			const subject = effect.type === "modifyDamage" ? "damage" : "incoming damage";
			const typedSubject = effect.damageType ? `${effect.damageType} ${subject}` : subject;
			if (effect.operation === "multiply") {
				const percent = Math.round(Math.abs(1 - effect.value) * 100);
				if (refreshed) {
					return `${targetName}'s ${percent}% ${typedSubject} ${effect.value < 1 ? "reduction" : "increase"} is refreshed for ${duration}.`;
				}
				return `${targetName}'s ${typedSubject} is ${effect.value < 1 ? "reduced" : "increased"} by ${percent}% for ${duration}.`;
			}
			if (refreshed) {
				return `${targetName}'s ${typedSubject} ${effect.value < 0 ? "reduction" : "increase"} of ${Math.abs(effect.value)} is refreshed for ${duration}.`;
			}
			return `${targetName}'s ${typedSubject} is ${effect.value < 0 ? "reduced" : "increased"} by ${Math.abs(effect.value)} for ${duration}.`;
		}

		case "modifyDamageAffinity":
			if (refreshed) {
				return `${targetName}'s ${effect.affinity} to ${effect.damageType} damage is refreshed for ${duration}.`;
			}
			return effect.operation === "add"
				? `${targetName} gains ${effect.affinity} to ${effect.damageType} damage for ${duration}.`
				: `${targetName} loses ${effect.affinity} to ${effect.damageType} damage for ${duration}.`;

		case "modifyRoll": {
			const subject =
				effect.roll === "attack"
					? "attack rolls"
					: effect.attribute
						? `${statLabels[effect.attribute]} saving throws`
						: "saving throws";
			const mode = formatRollModifierMode(effect.roll, effect.mode);
			const chargedSubject =
				effect.roll === "attack"
					? "attack"
					: effect.attribute
						? `${statLabels[effect.attribute]} saving throw`
						: "saving throw";
			const limit = effect.charges
				? ` on the next ${effect.charges} ${chargedSubject}${effect.charges === 1 ? "" : "s"}`
				: ` on ${subject}`;
			return refreshed
				? `${targetName}'s ${mode}${limit} is refreshed for ${duration}.`
				: `${targetName} gains ${mode}${limit} for ${duration}.`;
		}
	}
}

function formatRollModifierMode(roll: "attack" | "savingThrow", mode: RollModifierMode): string {
	switch (mode) {
		case "advantage":
		case "disadvantage":
			return mode;
		case "automaticSuccess":
			return roll === "attack"
				? "automatic success on attack rolls"
				: "automatic success on saving throws";
		case "automaticFailure":
			return roll === "attack"
				? "automatic failure on attack rolls"
				: "automatic failure on saving throws";
		case "automaticCritical":
			return "automatic critical hits";
	}
}

function formatRecurringOutcome(outcome: Extract<ActionOutcome, { type: "recurring" }>): string {
	const { effect, targetName, refreshed } = outcome;
	const duration = formatEffectDuration(effect.duration);

	if (refreshed) {
		switch (effect.type) {
			case "shield":
				return `${targetName}'s ${effect.amount}-point shield is refreshed for ${duration}.`;
			case "damageOverTime":
				return `${effect.dice} ${effect.damageType} damage each turn on ${targetName} is refreshed for ${duration}.`;
			case "healOverTime":
				return `${effect.dice} health each turn on ${targetName} is refreshed for ${duration}.`;
		}
	}

	switch (effect.type) {
		case "shield":
			return `${targetName} gains a ${effect.amount}-point shield for ${duration}.`;
		case "damageOverTime":
			return `${targetName} will take ${effect.dice} ${effect.damageType} damage each turn for ${duration}.`;
		case "healOverTime":
			return `${targetName} will restore ${effect.dice} health each turn for ${duration}.`;
	}
}

export function formatTurns(turns: number): string {
	return `${turns} ${turns === 1 ? "turn" : "turns"}`;
}

function formatEffectDuration(duration: EffectDuration): string {
	return `${duration.value} ${duration.value === 1 ? duration.unit.slice(0, -1) : duration.unit}`;
}

function capitalize(value: string): string {
	return value.charAt(0).toUpperCase() + value.slice(1);
}
