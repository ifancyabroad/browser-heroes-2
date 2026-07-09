import type {
	Attribute,
	Effect,
	ItemModifier,
	ModifierOperation,
	PassiveModifier,
	RiderEffect,
	SavingThrow,
} from "@app/content";
import { attributeShortLabels, damageTypeLabels, modifiableStatLabels } from "./displayLabels";

export type ModifierTone = "positive" | "negative" | "neutral";

const damageAffinityLabels = {
	resistance: "Resistance",
	immunity: "Immunity",
	vulnerability: "Vulnerability",
} as const;

const saveOutcomeLabels = {
	noEffect: "no effect",
	halfDamage: "half damage",
} as const;

export function formatTitle(value: string) {
	return value
		.split("_")
		.join(" ")
		.replace(/\b\w/g, (character) => character.toUpperCase());
}

export function formatModifierValue(operation: ModifierOperation, value: number) {
	if (operation === "multiply") {
		return `x${value}`;
	}

	if (operation === "set") {
		return `= ${value}`;
	}

	return value > 0 ? `+${value}` : String(value);
}

export function formatModifier(modifier: ItemModifier | PassiveModifier) {
	switch (modifier.type) {
		case "modifyStat":
			if (modifier.operation === "set") {
				return `Set ${modifiableStatLabels[modifier.stat]} to ${modifier.value}`;
			}

			return `${formatModifierValue(modifier.operation, modifier.value)} ${modifiableStatLabels[modifier.stat]}`;

		case "modifyDamage":
			return `${modifier.damageType ? damageTypeLabels[modifier.damageType] : "All"} damage ${formatModifierValue(modifier.operation, modifier.value)}`;

		case "modifyDamageAffinity":
			return `${modifier.operation === "add" ? "Add" : "Remove"} ${damageTypeLabels[modifier.damageType]} ${damageAffinityLabels[modifier.affinity]}`;
	}
}

export function formatItemModifier(modifier: ItemModifier) {
	return formatModifier(modifier);
}

export function getModifierTextClassName(modifier: ItemModifier | PassiveModifier) {
	if (modifier.type === "modifyDamageAffinity") {
		return getToneTextClassName(getDamageAffinityTone(modifier.operation, modifier.affinity));
	}

	const tone = getNumericModifierTone(modifier.operation, modifier.value);

	switch (tone) {
		case "positive":
			return "text-success";
		case "negative":
			return "text-error";
		case "neutral":
			return modifier.operation === "set" ? "text-primary" : "text-text-bright";
	}
}

export function getToneTextClassName(tone: ModifierTone, neutralClassName = "text-text-bright") {
	switch (tone) {
		case "positive":
			return "text-success";
		case "negative":
			return "text-error";
		case "neutral":
			return neutralClassName;
	}
}

export function formatSkillEffect(effect: Effect) {
	switch (effect.type) {
		case "damage":
			return `${formatTarget(effect.target)} takes ${effect.dice} ${damageTypeLabels[effect.damageType]}${formatOptionalAttribute(effect.attribute)}${effect.requiresAttackRoll ? " with attack roll" : ""}${effect.save ? "; saving throw" : ""}`;

		case "attackDamage":
			return `Weapon attack x${effect.multiplier}${effect.damageTypeOverride ? ` as ${damageTypeLabels[effect.damageTypeOverride]}` : ""}${effect.extraDice ? ` + ${effect.extraDice}${effect.extraDamageType ? ` ${damageTypeLabels[effect.extraDamageType]}` : ""}` : ""}`;

		case "heal":
			return `Heal ${formatTarget(effect.target)} for ${effect.dice}${formatOptionalAttribute(effect.attribute)}`;

		case "applyStatus":
			return `Apply ${formatTitle(effect.statusId)} to ${formatTarget(effect.target)} for ${effect.durationTurns} turns`;

		case "removeStatus":
			return `Remove ${formatRemovedStatuses(effect)} from ${formatTarget(effect.target)}`;

		case "modifyStat":
			return `Modify ${formatTarget(effect.target)} ${modifiableStatLabels[effect.stat]} ${formatModifierValue(effect.operation, effect.value)} for ${effect.durationTurns} turns`;

		case "modifyDamage":
			return `Modify ${formatTarget(effect.target)} ${effect.damageType ? damageTypeLabels[effect.damageType] : "all"} damage ${formatModifierValue(effect.operation, effect.value)} for ${effect.durationTurns} turns`;

		case "modifyDamageAffinity":
			return `${effect.operation === "add" ? "Add" : "Remove"} ${damageTypeLabels[effect.damageType]} ${formatTitle(effect.affinity)} on ${formatTarget(effect.target)} for ${effect.durationTurns} turns`;

		case "damageOverTime":
			return `${formatTarget(effect.target)} takes ${effect.dice} ${damageTypeLabels[effect.damageType]} for ${effect.durationTurns} turns${effect.save ? "; saving throw" : ""}`;

		case "healOverTime":
			return `Heal ${formatTarget(effect.target)} for ${effect.dice} for ${effect.durationTurns} turns`;

		case "shield":
			return `Shield ${formatTarget(effect.target)} for ${effect.amount} for ${effect.durationTurns} turns`;
	}
}

export function formatRiderEffect(effect: RiderEffect) {
	switch (effect.type) {
		case "damage":
			return `${formatTarget(effect.target)} takes ${effect.dice} ${damageTypeLabels[effect.damageType]}${formatOptionalAttribute(effect.attribute)}${effect.requiresAttackRoll ? " with attack roll" : ""}${effect.save ? `; ${formatSavingThrow(effect.save)}` : ""}`;

		case "heal":
			return `Heal ${formatTarget(effect.target)} for ${effect.dice}${formatOptionalAttribute(effect.attribute)}`;

		case "applyStatus":
			return `Apply ${formatTitle(effect.statusId)} to ${formatTarget(effect.target)} for ${effect.durationTurns} turns`;

		case "removeStatus":
			return `Remove ${formatRemovedStatuses(effect)} from ${formatTarget(effect.target)}`;

		case "modifyStat":
			return `Modify ${formatTarget(effect.target)} ${modifiableStatLabels[effect.stat]} ${formatModifierValue(effect.operation, effect.value)}${formatOptionalDuration(effect.durationTurns)}`;

		case "modifyDamage":
			return `Modify ${formatTarget(effect.target)} ${effect.damageType ? damageTypeLabels[effect.damageType] : "all"} damage ${formatModifierValue(effect.operation, effect.value)}${formatOptionalDuration(effect.durationTurns)}`;

		case "damageOverTime":
			return `${formatTarget(effect.target)} takes ${effect.dice} ${damageTypeLabels[effect.damageType]}${formatOptionalDuration(effect.durationTurns)}${effect.save ? `; ${formatSavingThrow(effect.save)}` : ""}`;

		case "healOverTime":
			return `Heal ${formatTarget(effect.target)} for ${effect.dice}${formatOptionalDuration(effect.durationTurns)}`;

		case "shield":
			return `Shield ${formatTarget(effect.target)} for ${effect.amount}${formatOptionalDuration(effect.durationTurns)}`;
	}
}

export function formatSavingThrow(save: SavingThrow) {
	const dcParts = [
		String(save.dc.base),
		attributeShortLabels[save.dc.attribute],
		save.dc.includeProficiency ? "Prof" : null,
	].filter(Boolean);
	const bonus =
		save.dc.bonus > 0
			? ` + ${save.dc.bonus}`
			: save.dc.bonus < 0
				? ` - ${Math.abs(save.dc.bonus)}`
				: "";

	return `Save ${attributeShortLabels[save.attribute]} vs DC ${dcParts.join(" + ")}${bonus}; ${saveOutcomeLabels[save.onSuccess]}`;
}

function formatOptionalAttribute(attribute: Attribute | undefined) {
	return attribute ? ` + ${attributeShortLabels[attribute]}` : "";
}

function formatOptionalDuration(durationTurns: number | undefined) {
	return durationTurns ? ` for ${durationTurns} turns` : "";
}

function formatTarget(target: "self" | "enemy") {
	return target === "self" ? "Self" : "Enemy";
}

function formatRemovedStatuses(effect: {
	statusIds: readonly string[];
	allNegative: boolean;
	allPositive: boolean;
}) {
	const statuses = [
		...effect.statusIds.map(formatTitle),
		effect.allNegative ? "all negative statuses" : null,
		effect.allPositive ? "all positive statuses" : null,
	].filter(Boolean);

	return statuses.join(", ");
}

export function getDamageAffinityTone(
	operation: "add" | "remove",
	affinity: "resistance" | "immunity" | "vulnerability",
): ModifierTone {
	const improvesDefense =
		(operation === "add" && affinity !== "vulnerability") ||
		(operation === "remove" && affinity === "vulnerability");

	return improvesDefense ? "positive" : "negative";
}

export function getNumericModifierTone(operation: ModifierOperation, value: number): ModifierTone {
	if (operation === "set" || value === 0 || (operation === "multiply" && value === 1)) {
		return "neutral";
	}

	if (operation === "multiply") {
		return value > 1 ? "positive" : "negative";
	}

	return value > 0 ? "positive" : "negative";
}

export function getNumberTone(value: number): ModifierTone {
	if (value > 0) {
		return "positive";
	}

	if (value < 0) {
		return "negative";
	}

	return "neutral";
}
