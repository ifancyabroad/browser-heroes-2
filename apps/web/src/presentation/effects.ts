import type {
	Attribute,
	Effect,
	ItemModifier,
	DamageModifierOperation,
	PassiveModifier,
	RiderEffect,
	RollModifierMode,
	SavingThrow,
	EffectDuration,
} from "@app/content";
import type { ActiveCombatEffect } from "@app/engine";
import {
	attributeShortLabels,
	damageTypeLabels,
	modifiableStatFullLabels,
	modifiableStatLabels,
} from "./labels";
import { formatDamageSubject } from "./damage";

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
			return `${formatModifierValue(modifier.operation, modifier.value)} to ${formatDamageSubject(modifier).toLowerCase()} dealt`;
		case "modifyDamageTaken":
			return `${formatModifierValue(modifier.operation, modifier.value)} ${formatDamageTakenSubject(modifier)}`;
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
			return `Attack${effect.rollMode ? ` with ${effect.rollMode}` : ""} for ${effect.multiplier === 1 ? "" : `${effect.multiplier}x `}weapon damage${effect.damageTypeOverride ? ` as ${damageTypeLabels[effect.damageTypeOverride]} damage` : ""}${effect.extraDice ? ` plus ${effect.extraDice}${effect.extraDamageType ? ` ${damageTypeLabels[effect.extraDamageType]}` : ""} damage` : ""}.`;
		case "heal":
			return `Heal for ${formatDiceFormula(effect.dice, effect.attribute)}.`;
		case "applyStatus":
			return formatSavedEffect(
				`${formatStatusAction(effect.statusId)} ${formatTargetObject(effect.target)} for ${formatEffectDuration(effect.duration)}`,
				effect.save,
			);
		case "removeStatus":
			return `Remove ${formatRemovedStatuses(effect)} from ${formatTargetObject(effect.target)}.`;
		case "modifyStat":
			return formatTemporaryModifier(
				effect.target,
				modifiableStatFullLabels[effect.stat],
				"add",
				effect.value,
				effect.duration,
				effect.save,
			);
		case "modifyHealing":
			return formatTemporaryModifier(
				effect.target,
				"healing",
				"multiply",
				effect.multiplier,
				effect.duration,
				effect.save,
			);
		case "modifyDamage":
			return formatTemporaryModifier(
				effect.target,
				formatDamageSubject(effect, "damage"),
				effect.operation,
				effect.value,
				effect.duration,
				effect.save,
			);
		case "modifyDamageTaken":
			return formatTemporaryModifier(
				effect.target,
				formatDamageTakenSubject(effect, "damage taken"),
				effect.operation,
				effect.value,
				effect.duration,
				effect.save,
			);
		case "modifyDamageAffinity":
			return formatDamageAffinityEffect(effect);
		case "modifyRoll":
			return formatRollEffect(effect);
		case "damageOverTime":
			return formatSavedEffect(
				`${effect.target === "self" ? "Take" : "Deal"} ${effect.dice} ${damageTypeLabels[effect.damageType]} damage per turn for ${formatEffectDuration(effect.duration)}`,
				effect.save,
			);
		case "healOverTime":
			return `Heal for ${effect.dice} per turn for ${formatEffectDuration(effect.duration)}.`;
		case "shield":
			return `Gain a ${effect.amount}-point shield for ${formatEffectDuration(effect.duration)}.`;
		default:
			return assertNever(effect);
	}
}

export function formatRiderEffect(effect: RiderEffect): string {
	switch (effect.type) {
		case "damage":
			return formatDamageEffect(effect);
		case "heal":
			return `Heal for ${formatDiceFormula(effect.dice, effect.attribute)}.`;
		case "applyStatus":
			return formatSavedEffect(
				`${formatStatusAction(effect.statusId)} ${formatTargetObject(effect.target)} for ${formatEffectDuration(effect.duration)}`,
				effect.save,
			);
		case "modifyStat":
			return formatTemporaryModifier(
				effect.target,
				modifiableStatFullLabels[effect.stat],
				"add",
				effect.value,
				effect.duration,
				effect.save,
			);
		case "modifyHealing":
			return formatTemporaryModifier(
				effect.target,
				"healing",
				"multiply",
				effect.multiplier,
				effect.duration,
				effect.save,
			);
		case "modifyDamage":
			return formatTemporaryModifier(
				effect.target,
				formatDamageSubject(effect, "damage"),
				effect.operation,
				effect.value,
				effect.duration,
				effect.save,
			);
		case "modifyDamageTaken":
			return formatTemporaryModifier(
				effect.target,
				formatDamageTakenSubject(effect, "damage taken"),
				effect.operation,
				effect.value,
				effect.duration,
				effect.save,
			);
		case "modifyDamageAffinity":
			return formatDamageAffinityEffect(effect);
		case "modifyRoll":
			return formatRollEffect(effect);
		case "damageOverTime":
			return formatSavedEffect(
				`${effect.target === "self" ? "Take" : "Deal"} ${effect.dice} ${damageTypeLabels[effect.damageType]} damage per turn${formatDurationSuffix(effect.duration)}`,
				effect.save,
			);
		case "healOverTime":
			return `Heal for ${effect.dice} per turn${formatDurationSuffix(effect.duration)}.`;
		case "shield":
			return `Gain a ${effect.amount}-point shield${formatDurationSuffix(effect.duration)}.`;
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
			return `${formatModifierValue(effect.operation, effect.value)} ${formatDamageSubject(effect)}`;
		case "modifyDamageTaken":
			return `${formatModifierValue(effect.operation, effect.value)} ${formatDamageTakenSubject(effect, "All damage taken")}`;
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
	return `${attributeShortLabels[save.attribute]} save`;
}

export function formatSavingThrowModifier(save: SavingThrow) {
	return save.dc.attribute
		? `Uses your ${attributeShortLabels[save.dc.attribute]} modifier.`
		: `Base DC ${save.dc.base}.`;
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
	return formatSavedEffect(
		`${effect.target === "self" ? "Take" : effect.requiresAttackRoll ? "Attack for" : "Deal"} ${formatDiceFormula(effect.dice, effect.attribute)} ${damageTypeLabels[effect.damageType]} damage`,
		effect.save,
	);
}

function formatDamageAffinityEffect(
	effect: Extract<Effect | RiderEffect, { type: "modifyDamageAffinity" }>,
) {
	return formatSavedEffect(
		`${effect.operation === "add" ? "Grant" : "Remove"} ${damageTypeLabels[effect.damageType]} ${damageAffinityLabels[effect.affinity]} ${effect.operation === "add" ? "to" : "from"} ${formatTargetObject(effect.target)} for ${formatEffectDuration(effect.duration)}`,
		effect.save,
	);
}

function formatRollEffect(effect: Extract<Effect | RiderEffect, { type: "modifyRoll" }>) {
	const target = effect.target === "self" ? "your" : "the enemy's";
	const rolls = formatRollSubject(effect.roll, effect.attribute);
	const duration = formatEffectDuration(effect.duration);

	if (effect.mode === "advantage" || effect.mode === "disadvantage") {
		const limitedRolls = effect.charges
			? `${target} next ${effect.charges === 1 ? singularizeRollSubject(rolls) : `${effect.charges} ${rolls}`}`
			: `${target} ${rolls}`;
		const action =
			effect.target === "enemy"
				? "The enemy receives"
				: effect.mode === "advantage"
					? "Gain"
					: "Receive";
		const affectedRolls =
			effect.target === "enemy" ? limitedRolls.replace(/^the enemy's /, "") : limitedRolls;
		return formatSavedEffect(
			`${action} ${effect.mode} on ${affectedRolls} ${effect.charges ? "for up to" : "for"} ${duration}`,
			effect.save,
		);
	}

	const subject = effect.charges
		? `${effect.target === "self" ? "Your" : "The enemy's"} next ${effect.charges === 1 ? singularizeRollSubject(rolls) : `${effect.charges} ${rolls}`}`
		: `${effect.target === "self" ? "Your" : "The enemy's"} ${rolls}`;
	const singular = effect.charges === 1;
	const outcome =
		effect.mode === "automaticCritical"
			? `automatically ${singular ? "results" : "result"} in ${singular ? "a critical hit" : "critical hits"}`
			: effect.mode === "automaticSuccess"
				? effect.roll === "attack"
					? `automatically ${singular ? "hits" : "hit"}`
					: `automatically ${singular ? "succeeds" : "succeed"}`
				: effect.roll === "attack"
					? `automatically ${singular ? "misses" : "miss"}`
					: `automatically ${singular ? "fails" : "fail"}`;

	return formatSavedEffect(
		`${subject} ${outcome} ${effect.charges ? "within" : "for"} ${duration}`,
		effect.save,
	);
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

	return attribute ? `${attributeShortLabels[attribute]} saves` : "saves";
}

function formatTemporaryModifier(
	target: "self" | "enemy",
	subject: string,
	operation: DamageModifierOperation,
	value: number,
	duration: EffectDuration,
	save: SavingThrow | undefined,
) {
	const durationText = formatDurationSuffix(duration);
	const possessiveTarget = target === "self" ? "your" : "the enemy's";

	const change = operation === "multiply" ? getPercentageChange(value) : value;
	if (change === 0) {
		return formatSavedEffect(
			`${target === "self" ? "Your" : "The enemy's"} ${subject} is unchanged${durationText}`,
			save,
		);
	}

	return formatSavedEffect(
		`${change > 0 ? "Increase" : "Reduce"} ${possessiveTarget} ${subject} by ${Math.abs(change)}${operation === "multiply" ? "%" : ""}${durationText}`,
		save,
	);
}

function formatDiceFormula(dice: string, attribute: Attribute | undefined) {
	return attribute ? `${dice} + ${attributeShortLabels[attribute]}` : dice;
}

export function formatEffectDuration(duration: EffectDuration) {
	return `${duration.value} ${duration.value === 1 ? duration.unit.slice(0, -1) : duration.unit}`;
}

function formatDurationSuffix(duration: EffectDuration) {
	return ` for ${formatEffectDuration(duration)}`;
}

function formatSavedEffect(effectText: string, save: SavingThrow | undefined) {
	if (!save) {
		return `${effectText}.`;
	}

	if (save.onSuccess === "noEffect") {
		return `Failed ${formatSavingThrow(save)}: ${lowercaseFirst(effectText)}. ${formatSavingThrowModifier(save)}`;
	}

	return `${effectText}. ${formatSavingThrow(save)}: half damage. ${formatSavingThrowModifier(save)}`;
}

function formatStatusAction(statusId: "stunned" | "silenced") {
	return statusId === "stunned" ? "Stun" : "Silence";
}

function lowercaseFirst(value: string) {
	return `${value.charAt(0).toLowerCase()}${value.slice(1)}`;
}

function formatTargetObject(target: "self" | "enemy") {
	return target === "self" ? "yourself" : "the enemy";
}

function formatDamageTakenSubject(
	selector: Parameters<typeof formatDamageSubject>[0],
	fallback = "damage taken",
) {
	const subject = formatDamageSubject(selector, "");
	return subject ? `${subject} taken` : fallback;
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
