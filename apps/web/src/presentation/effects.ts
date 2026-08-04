import type {
	Attribute,
	Effect,
	ItemModifier,
	DamageModifierOperation,
	PassiveModifier,
	RiderEffect,
	RollModifierMode,
	SavingThrow,
} from "@app/content";
import type { ActiveCombatEffect } from "@app/engine";
import {
	attributeShortLabels,
	damageTypeLabels,
	modifiableStatFullLabels,
	modifiableStatLabels,
} from "./labels";

export type ModifierTone = "positive" | "negative" | "neutral";

const damageAffinityLabels = {
	resistance: "Resistance",
	immunity: "Immunity",
	vulnerability: "Vulnerability",
} as const;

export function formatTitle(value: string) {
	return value
		.split("_")
		.join(" ")
		.replace(/\b\w/g, (character) => character.toUpperCase());
}

export function formatModifierValue(operation: DamageModifierOperation, value: number) {
	if (operation === "multiply") {
		return formatSignedValue(getPercentageChange(value), "%");
	}

	return formatSignedValue(value);
}

export function formatModifier(modifier: ItemModifier | PassiveModifier) {
	switch (modifier.type) {
		case "modifyStat":
			return `${formatModifierValue("add", modifier.value)} ${modifiableStatFullLabels[modifier.stat]}`;
		case "modifyHealing":
			return `${formatModifierValue("multiply", modifier.multiplier)} healing`;
		case "modifyDamage":
			return `${formatModifierValue(modifier.operation, modifier.value)} to ${formatDamageSubject(modifier.damageType).toLowerCase()} dealt`;
		case "modifyDamageTaken":
			return `${formatModifierValue(modifier.operation, modifier.value)} ${formatDamageTakenSubject(modifier.damageType)}`;
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
	if (modifier.type === "modifyDamageTaken") {
		return getToneTextClassName(getDamageTakenModifierTone(modifier.operation, modifier.value));
	}
	if (modifier.type === "modifyHealing") {
		return getToneTextClassName(getNumericModifierTone("multiply", modifier.multiplier));
	}

	const tone =
		modifier.type === "modifyStat"
			? getNumericModifierTone("add", modifier.value)
			: getNumericModifierTone(modifier.operation, modifier.value);
	if (tone === "positive") {
		return "text-success";
	}
	if (tone === "negative") {
		return "text-error";
	}
	return "text-text-bright";
}

export function getToneTextClassName(tone: ModifierTone, neutralClassName = "text-text-bright") {
	if (tone === "positive") {
		return "text-success";
	}
	if (tone === "negative") {
		return "text-error";
	}
	return neutralClassName;
}

export function formatSkillEffect(effect: Effect): string {
	switch (effect.type) {
		case "damage":
			return formatDamageEffect(effect);
		case "attackDamage":
			return `Deal ${effect.multiplier}x weapon damage${effect.damageTypeOverride ? ` as ${damageTypeLabels[effect.damageTypeOverride]} damage` : ""}${effect.extraDice ? ` plus ${effect.extraDice}${effect.extraDamageType ? ` ${damageTypeLabels[effect.extraDamageType]}` : ""} damage` : ""} to the enemy${effect.rollMode ? ` with ${effect.rollMode}` : ""}.`;
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
				"add",
				effect.value,
				effect.durationTurns,
				effect.save,
			);
		case "modifyHealing":
			return formatTemporaryModifier(
				effect.target,
				"healing",
				"multiply",
				effect.multiplier,
				effect.durationTurns,
				effect.save,
			);
		case "modifyDamage":
			return formatTemporaryModifier(
				effect.target,
				formatDamageSubject(effect.damageType, false),
				effect.operation,
				effect.value,
				effect.durationTurns,
				effect.save,
			);
		case "modifyDamageTaken":
			return formatTemporaryModifier(
				effect.target,
				formatDamageTakenSubject(effect.damageType),
				effect.operation,
				effect.value,
				effect.durationTurns,
				effect.save,
			);
		case "modifyDamageAffinity":
			return formatDamageAffinityEffect(effect);
		case "modifyRoll":
			return formatRollEffect(effect);
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
		case "modifyStat":
			return formatTemporaryModifier(
				effect.target,
				modifiableStatFullLabels[effect.stat],
				"add",
				effect.value,
				effect.durationTurns,
				effect.save,
			);
		case "modifyHealing":
			return formatTemporaryModifier(
				effect.target,
				"healing",
				"multiply",
				effect.multiplier,
				effect.durationTurns,
				effect.save,
			);
		case "modifyDamage":
			return formatTemporaryModifier(
				effect.target,
				formatDamageSubject(effect.damageType, false),
				effect.operation,
				effect.value,
				effect.durationTurns,
				effect.save,
			);
		case "modifyDamageTaken":
			return formatTemporaryModifier(
				effect.target,
				formatDamageTakenSubject(effect.damageType),
				effect.operation,
				effect.value,
				effect.durationTurns,
				effect.save,
			);
		case "modifyDamageAffinity":
			return formatDamageAffinityEffect(effect);
		case "modifyRoll":
			return formatRollEffect(effect);
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
			return `${formatModifierValue("add", effect.value)} ${modifiableStatLabels[effect.stat]}`;
		case "modifyHealing":
			return `${formatModifierValue("multiply", effect.multiplier)} healing`;
		case "modifyDamage":
			return `${formatModifierValue(effect.operation, effect.value)} ${formatDamageSubject(effect.damageType)}`;
		case "modifyDamageTaken":
			return `${formatModifierValue(effect.operation, effect.value)} ${formatDamageTakenSubject(effect.damageType, true)}`;
		case "modifyDamageAffinity":
			return `${effect.operation === "add" ? "Gain" : "Lose"} ${damageTypeLabels[effect.damageType]} ${damageAffinityLabels[effect.affinity]}`;
		case "modifyRoll":
			return `${formatRollModifierMode(effect.mode, effect.roll)} on ${formatRollSubject(effect.roll, effect.attribute)}`;
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
			return getNumericModifierTone("add", effect.value);
		case "modifyHealing":
			return getNumericModifierTone("multiply", effect.multiplier);
		case "modifyDamage":
			return getNumericModifierTone(effect.operation, effect.value);
		case "modifyDamageTaken":
			return getDamageTakenModifierTone(effect.operation, effect.value);
		case "modifyDamageAffinity":
			return getDamageAffinityTone(effect.operation, effect.affinity);
		case "modifyRoll":
			return effect.mode === "advantage" ||
				effect.mode === "automaticSuccess" ||
				effect.mode === "automaticCritical"
				? "positive"
				: "negative";
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
		`your ${attributeShortLabels[save.dc.attribute]} modifier`,
		save.dc.includeProficiency ? "your proficiency bonus" : null,
	].filter(Boolean);
	const bonus =
		save.dc.bonus > 0
			? ` + ${save.dc.bonus}`
			: save.dc.bonus < 0
				? ` - ${Math.abs(save.dc.bonus)}`
				: "";

	return `${attributeShortLabels[save.attribute]} save vs DC ${dcParts.join(" + ")}${bonus}`;
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

export function getNumericModifierTone(
	operation: DamageModifierOperation,
	value: number,
): ModifierTone {
	if (operation === "multiply") {
		if (value === 1) {
			return "neutral";
		}
		return value > 1 ? "positive" : "negative";
	}
	if (value === 0) {
		return "neutral";
	}
	return value > 0 ? "positive" : "negative";
}

export function getDamageTakenModifierTone(
	operation: "add" | "multiply",
	value: number,
): ModifierTone {
	const tone = getNumericModifierTone(operation, value);
	if (tone === "positive") {
		return "negative";
	}
	if (tone === "negative") {
		return "positive";
	}
	return "neutral";
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

function formatDamageEffect(effect: Extract<Effect | RiderEffect, { type: "damage" }>) {
	return `${formatTargetSubject(effect.target)} ${effect.target === "self" ? "take" : "takes"} ${formatDiceFormula(effect.dice, effect.attribute)} ${damageTypeLabels[effect.damageType]} damage${effect.requiresAttackRoll ? " with an attack roll" : ""}${formatOptionalSave(effect.save)}.`;
}

function formatDamageAffinityEffect(
	effect: Extract<Effect | RiderEffect, { type: "modifyDamageAffinity" }>,
) {
	return `${formatTargetSubject(effect.target)} ${effect.operation === "add" ? "gain" : "lose"}${effect.target === "enemy" ? "s" : ""} ${damageTypeLabels[effect.damageType]} ${damageAffinityLabels[effect.affinity]} for ${formatTurns(effect.durationTurns)}${formatOptionalSave(effect.save)}.`;
}

function formatRollEffect(effect: Extract<Effect | RiderEffect, { type: "modifyRoll" }>) {
	const target = effect.target === "self" ? "your" : "the enemy's";
	const rolls = formatRollSubject(effect.roll, effect.attribute);
	const limitedRolls = effect.charges
		? `${target} next ${effect.charges === 1 ? singularizeRollSubject(rolls) : `${effect.charges} ${rolls}`}`
		: `${target} ${rolls}`;
	const duration = formatTurns(effect.durationTurns);
	const save = formatOptionalSave(effect.save);

	if (effect.mode === "advantage" || effect.mode === "disadvantage") {
		return `Grant ${effect.mode} on ${limitedRolls} for ${duration}${save}.`;
	}

	const outcome =
		effect.mode === "automaticCritical"
			? `automatically result in ${effect.charges === 1 ? "a critical hit" : "critical hits"}`
			: effect.mode === "automaticSuccess"
				? effect.roll === "attack"
					? "automatically hit"
					: "automatically succeed"
				: effect.roll === "attack"
					? "automatically miss"
					: "automatically fail";

	return `Make ${limitedRolls} ${outcome}${save}. Expires after ${duration}.`;
}

function formatRollModifierMode(mode: RollModifierMode, roll: "attack" | "savingThrow") {
	switch (mode) {
		case "advantage":
		case "disadvantage":
			return formatTitle(mode);
		case "automaticSuccess":
			return roll === "attack" ? "Automatic hits" : "Automatic successes";
		case "automaticFailure":
			return roll === "attack" ? "Automatic misses" : "Automatic failures";
		case "automaticCritical":
			return "Automatic critical hits";
	}
}

function singularizeRollSubject(subject: string) {
	return subject.endsWith("s") ? subject.slice(0, -1) : subject;
}

function formatRollSubject(roll: "attack" | "savingThrow", attribute: Attribute | undefined) {
	if (roll === "attack") {
		return "attack rolls";
	}

	return attribute ? `${attributeShortLabels[attribute]} saving throws` : "saving throws";
}

function formatTemporaryModifier(
	target: "self" | "enemy",
	subject: string,
	operation: DamageModifierOperation,
	value: number,
	durationTurns: number | undefined,
	save: SavingThrow | undefined,
) {
	const duration = formatOptionalDuration(durationTurns);
	const savingThrow = formatOptionalSave(save);
	const possessiveTarget = target === "self" ? "your" : "the enemy's";

	const change = operation === "multiply" ? getPercentageChange(value) : value;
	if (change === 0) {
		return `${target === "self" ? "Your" : "The enemy's"} ${subject} is unchanged${duration}${savingThrow}.`;
	}

	return `${change > 0 ? "Increase" : "Reduce"} ${possessiveTarget} ${subject} by ${Math.abs(change)}${operation === "multiply" ? "%" : ""}${duration}${savingThrow}.`;
}

function formatDiceFormula(dice: string, attribute: Attribute | undefined) {
	return attribute ? `${dice} + ${attributeShortLabels[attribute]}` : dice;
}

function formatOptionalDuration(durationTurns: number | undefined) {
	return durationTurns === undefined ? "" : ` for ${formatTurns(durationTurns)}`;
}

function formatOptionalSave(save: SavingThrow | undefined) {
	if (!save) {
		return "";
	}

	if (save.onSuccess === "noEffect") {
		return ` (on a failed ${formatSavingThrow(save)})`;
	}

	return ` (${formatSavingThrow(save)}; half damage on success)`;
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
