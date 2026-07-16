import type {
	Attribute,
	Effect,
	ItemModifier,
	ModifierOperation,
	PassiveModifier,
	RiderEffect,
	SavingThrow,
} from "@app/content";
import type { ActiveCombatEffect } from "@app/engine";
import {
	attributeShortLabels,
	damageTypeLabels,
	modifiableStatFullLabels,
	modifiableStatLabels,
} from "./displayLabels";

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
		return formatSignedValue(getPercentageChange(value), "%");
	}

	if (operation === "set") {
		return `= ${value}`;
	}

	return formatSignedValue(value);
}

export function formatModifier(modifier: ItemModifier | PassiveModifier) {
	switch (modifier.type) {
		case "modifyStat":
			return modifier.operation === "set"
				? `${modifiableStatFullLabels[modifier.stat]} = ${modifier.value}`
				: `${formatModifierValue(modifier.operation, modifier.value)} ${modifiableStatFullLabels[modifier.stat]}`;
		case "modifyDamage":
			return `${formatModifierValue(modifier.operation, modifier.value)} ${formatDamageSubject(modifier.damageType)}`;
		case "modifyDamageAffinity":
			return `${modifier.operation === "add" ? "Gain" : "Lose"} ${damageTypeLabels[modifier.damageType]} ${damageAffinityLabels[modifier.affinity]}`;
		default:
			return assertNever(modifier);
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
	if (tone === "positive") return "text-success";
	if (tone === "negative") return "text-error";
	return modifier.operation === "set" ? "text-primary" : "text-text-bright";
}

export function getToneTextClassName(tone: ModifierTone, neutralClassName = "text-text-bright") {
	if (tone === "positive") return "text-success";
	if (tone === "negative") return "text-error";
	return neutralClassName;
}

export function formatSkillEffect(effect: Effect): string {
	switch (effect.type) {
		case "damage":
			return formatDamageEffect(effect);
		case "attackDamage":
			return `Deal ${effect.multiplier}x weapon damage${effect.damageTypeOverride ? ` as ${damageTypeLabels[effect.damageTypeOverride]} damage` : ""}${effect.extraDice ? ` plus ${effect.extraDice}${effect.extraDamageType ? ` ${damageTypeLabels[effect.extraDamageType]}` : ""} damage` : ""} to the enemy.`;
		case "heal":
			return `Heal yourself for ${formatDiceFormula(effect.dice, effect.attribute)}.`;
		case "applyStatus":
			return `Apply ${formatTitle(effect.statusId)} to ${formatTargetObject(effect.target)} for ${formatTurns(effect.durationTurns)}${formatOptionalSave(effect.save)}.`;
		case "removeStatus":
			return `Remove ${formatRemovedStatuses(effect)} from ${formatTargetObject(effect.target)}.`;
		case "modifyStat":
			return formatTemporaryModifier(
				effect.target,
				modifiableStatFullLabels[effect.stat],
				effect.operation,
				effect.value,
				effect.durationTurns,
			);
		case "modifyDamage":
			return formatTemporaryModifier(
				effect.target,
				formatDamageSubject(effect.damageType, false),
				effect.operation,
				effect.value,
				effect.durationTurns,
			);
		case "modifyDamageTaken":
			return formatTemporaryModifier(
				effect.target,
				formatDamageTakenSubject(effect.damageType),
				effect.operation,
				effect.value,
				effect.durationTurns,
			);
		case "modifyDamageAffinity":
			return `${formatTargetSubject(effect.target)} ${effect.operation === "add" ? "gain" : "lose"}${effect.target === "enemy" ? "s" : ""} ${damageTypeLabels[effect.damageType]} ${damageAffinityLabels[effect.affinity]} for ${formatTurns(effect.durationTurns)}.`;
		case "damageOverTime":
			return `${formatTargetSubject(effect.target)} ${effect.target === "self" ? "take" : "takes"} ${effect.dice} ${damageTypeLabels[effect.damageType]} damage per turn for ${formatTurns(effect.durationTurns)}${formatOptionalSave(effect.save)}.`;
		case "healOverTime":
			return `Heal yourself for ${effect.dice} per turn for ${formatTurns(effect.durationTurns)}.`;
		case "shield":
			return `Grant yourself a ${effect.amount}-point shield for ${formatTurns(effect.durationTurns)}.`;
		default:
			return assertNever(effect);
	}
}

export function formatRiderEffect(effect: RiderEffect): string {
	switch (effect.type) {
		case "damage":
			return formatDamageEffect(effect);
		case "heal":
			return `Heal yourself for ${formatDiceFormula(effect.dice, effect.attribute)}.`;
		case "applyStatus":
			return `Apply ${formatTitle(effect.statusId)} to ${formatTargetObject(effect.target)} for ${formatTurns(effect.durationTurns)}${formatOptionalSave(effect.save)}.`;
		case "removeStatus":
			return `Remove ${formatRemovedStatuses(effect)} from ${formatTargetObject(effect.target)}.`;
		case "modifyStat":
			return formatTemporaryModifier(
				effect.target,
				modifiableStatFullLabels[effect.stat],
				effect.operation,
				effect.value,
				effect.durationTurns,
			);
		case "modifyDamage":
			return formatTemporaryModifier(
				effect.target,
				formatDamageSubject(effect.damageType, false),
				effect.operation,
				effect.value,
				effect.durationTurns,
			);
		case "modifyDamageTaken":
			return formatTemporaryModifier(
				effect.target,
				formatDamageTakenSubject(effect.damageType),
				effect.operation,
				effect.value,
				effect.durationTurns,
			);
		case "damageOverTime":
			return `${formatTargetSubject(effect.target)} ${effect.target === "self" ? "take" : "takes"} ${effect.dice} ${damageTypeLabels[effect.damageType]} damage per turn${formatOptionalDuration(effect.durationTurns)}${formatOptionalSave(effect.save)}.`;
		case "healOverTime":
			return `Heal yourself for ${effect.dice} per turn${formatOptionalDuration(effect.durationTurns)}.`;
		case "shield":
			return `Grant yourself a ${effect.amount}-point shield${formatOptionalDuration(effect.durationTurns)}.`;
		default:
			return assertNever(effect);
	}
}

export function formatActiveEffectDetail(effect: ActiveCombatEffect): string {
	switch (effect.type) {
		case "status":
			return formatTitle(effect.statusId);
		case "modifyStat":
			return effect.operation === "set"
				? `${modifiableStatLabels[effect.stat]} = ${effect.value}`
				: `${formatModifierValue(effect.operation, effect.value)} ${modifiableStatLabels[effect.stat]}`;
		case "modifyDamage":
			return `${formatModifierValue(effect.operation, effect.value)} ${formatDamageSubject(effect.damageType)}`;
		case "modifyDamageTaken":
			return `${formatModifierValue(effect.operation, effect.value)} ${formatDamageTakenSubject(effect.damageType, true)}`;
		case "modifyDamageAffinity":
			return `${effect.operation === "add" ? "Gain" : "Lose"} ${damageTypeLabels[effect.damageType]} ${damageAffinityLabels[effect.affinity]}`;
		case "damageOverTime":
			return `${effect.dice} ${damageTypeLabels[effect.damageType]} damage per turn`;
		case "healOverTime":
			return `${effect.dice} healing per turn`;
		case "shield":
			return `${effect.remainingAmount}-point shield`;
		default:
			return assertNever(effect);
	}
}

export function getActiveEffectTone(effect: ActiveCombatEffect): ModifierTone {
	switch (effect.type) {
		case "status":
		case "damageOverTime":
			return "negative";
		case "modifyStat":
		case "modifyDamage":
			return getNumericModifierTone(effect.operation, effect.value);
		case "modifyDamageTaken":
			return getDamageTakenModifierTone(effect.operation, effect.value);
		case "modifyDamageAffinity":
			return getDamageAffinityTone(effect.operation, effect.affinity);
		case "healOverTime":
		case "shield":
			return "positive";
		default:
			return assertNever(effect);
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

	return `${attributeShortLabels[save.attribute]} save vs DC ${dcParts.join(" + ")}${bonus}; ${saveOutcomeLabels[save.onSuccess]} on success`;
}

export function formatTurns(turns: number) {
	return `${turns} ${turns === 1 ? "turn" : "turns"}`;
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

export function getDamageTakenModifierTone(
	operation: "add" | "multiply",
	value: number,
): ModifierTone {
	const tone = getNumericModifierTone(operation, value);
	if (tone === "positive") return "negative";
	if (tone === "negative") return "positive";
	return "neutral";
}

export function getNumberTone(value: number): ModifierTone {
	if (value > 0) return "positive";
	if (value < 0) return "negative";
	return "neutral";
}

function formatDamageEffect(effect: Extract<Effect | RiderEffect, { type: "damage" }>) {
	return `${formatTargetSubject(effect.target)} ${effect.target === "self" ? "take" : "takes"} ${formatDiceFormula(effect.dice, effect.attribute)} ${damageTypeLabels[effect.damageType]} damage${effect.requiresAttackRoll ? " with an attack roll" : ""}${formatOptionalSave(effect.save)}.`;
}

function formatTemporaryModifier(
	target: "self" | "enemy",
	subject: string,
	operation: ModifierOperation,
	value: number,
	durationTurns: number | undefined,
) {
	const duration = formatOptionalDuration(durationTurns);
	const possessiveTarget = target === "self" ? "your" : "the enemy's";

	if (operation === "set") {
		return `Set ${possessiveTarget} ${subject} to ${value}${duration}.`;
	}

	const change = operation === "multiply" ? getPercentageChange(value) : value;
	if (change === 0) {
		return `${target === "self" ? "Your" : "The enemy's"} ${subject} is unchanged${duration}.`;
	}

	return `${change > 0 ? "Increase" : "Reduce"} ${possessiveTarget} ${subject} by ${Math.abs(change)}${operation === "multiply" ? "%" : ""}${duration}.`;
}

function formatDiceFormula(dice: string, attribute: Attribute | undefined) {
	return attribute ? `${dice} + ${attributeShortLabels[attribute]}` : dice;
}

function formatOptionalDuration(durationTurns: number | undefined) {
	return durationTurns === undefined ? "" : ` for ${formatTurns(durationTurns)}`;
}

function formatOptionalSave(save: SavingThrow | undefined) {
	return save ? ` (${formatSavingThrow(save)})` : "";
}

function formatTargetSubject(target: "self" | "enemy") {
	return target === "self" ? "You" : "The enemy";
}

function formatTargetObject(target: "self" | "enemy") {
	return target === "self" ? "yourself" : "the enemy";
}

function formatDamageSubject(
	damageType: keyof typeof damageTypeLabels | undefined,
	capitalizeAll = true,
) {
	const typeLabel = damageType ? damageTypeLabels[damageType] : capitalizeAll ? "All" : "";
	return typeLabel ? `${typeLabel} damage` : "damage";
}

function formatDamageTakenSubject(
	damageType: keyof typeof damageTypeLabels | undefined,
	capitalizeAll = false,
) {
	if (damageType) {
		return `${damageTypeLabels[damageType]} damage taken`;
	}

	return capitalizeAll ? "All damage taken" : "damage taken";
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

function getPercentageChange(multiplier: number) {
	return Math.round((multiplier - 1) * 100);
}

function formatSignedValue(value: number, suffix = "") {
	return `${value > 0 ? "+" : ""}${value}${suffix}`;
}

function assertNever(value: never): never {
	throw new Error(`Unhandled effect display variant: ${JSON.stringify(value)}`);
}
