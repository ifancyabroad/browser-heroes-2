import type { AttackRider, HealEffect, PassiveModifier, RiderEffect } from "@app/content";

import { formatDuration } from "./presentation";

type StatModifier = Extract<PassiveModifier, { type: "modifyStat" }>;

const statLabels: Record<StatModifier["stat"], string> = {
	armourClass: "AC",
	initiative: "Initiative",
	attackRollBonus: "attack",
	savingThrowBonus: "resolve",
	saveDcBonus: "focus",
	criticalRangeBonus: "crit range",
	criticalDiceMultiplierBonus: "crit dice",
	maxHpBonus: "max HP",
	strength: "STR",
	dexterity: "DEX",
	constitution: "CON",
	intelligence: "INT",
	wisdom: "WIS",
	charisma: "CHA",
};

const timingLabels = { onHit: "Hit", onCrit: "Crit" } as const;

const signed = (value: number) => `${value >= 0 ? "+" : ""}${value}`;
const percentChange = (multiplier: number) => signed(Math.round((multiplier - 1) * 100)) + "%";
const damageLabel = (damageType?: string, damageClass?: string, attackRange?: string) => {
	const selectors = [damageClass, attackRange, damageType].filter(Boolean);
	return selectors.length > 0 ? `${selectors.join(" ")} damage` : "damage";
};

export function modifierSummary(modifiers: readonly PassiveModifier[]) {
	return modifiers.map(formatModifier).join(" · ");
}

export function riderSummary(riders: readonly AttackRider[]) {
	return riders.map(formatRider).join(" · ");
}

function formatModifier(modifier: PassiveModifier): string {
	switch (modifier.type) {
		case "modifyStat":
			return `${signed(modifier.value)} ${statLabels[modifier.stat]}`;
		case "modifyHealing":
			return `${percentChange(modifier.multiplier)} healing`;
		case "modifyDamage":
			return `${formatOperation(modifier.operation, modifier.value)} ${damageLabel(modifier.damageType, modifier.damageClass, modifier.attackRange)}`;
		case "modifyDamageTaken":
			return `${formatOperation(modifier.operation, modifier.value)} ${damageLabel(modifier.damageType, modifier.damageClass, modifier.attackRange)} taken`;
		case "modifyDamageAffinity":
			return `${modifier.operation === "add" ? "" : "Lose "}${modifier.damageType} ${modifier.affinity}`;
	}
}

function formatRider(rider: AttackRider) {
	const effects = rider.effects.map(formatRiderEffect).join(" + ");
	const save = rider.save ? ` · ${rider.save.attribute.toUpperCase()} save` : "";
	return `${timingLabels[rider.timing]}: ${effects}${save}`;
}

function formatRiderEffect(effect: RiderEffect): string {
	switch (effect.type) {
		case "damage":
			return `${effect.dice} ${effect.damageType}`;
		case "heal":
			return formatHealEffect(effect);
		case "applyStatus":
			return `${effect.statusId} · ${formatDuration(effect.duration)}`;
		case "modifyStat":
			return `${signed(effect.value)} ${statLabels[effect.stat]} · ${formatDuration(effect.duration)}`;
		case "modifyHealing":
			return `${percentChange(effect.multiplier)} healing · ${formatDuration(effect.duration)}`;
		case "modifyDamage":
			return `${formatOperation(effect.operation, effect.value)} ${damageLabel(effect.damageType, effect.damageClass, effect.attackRange)} · ${formatDuration(effect.duration)}`;
		case "modifyDamageTaken":
			return `${formatOperation(effect.operation, effect.value)} ${damageLabel(effect.damageType, effect.damageClass, effect.attackRange)} taken · ${formatDuration(effect.duration)}`;
		case "modifyDamageAffinity":
			return `${effect.operation === "add" ? "" : "lose "}${effect.damageType} ${effect.affinity} · ${formatDuration(effect.duration)}`;
		case "modifyRoll":
			return `${titleCase(effect.mode)} ${effect.roll === "savingThrow" ? "save" : "attack"}${effect.charges ? ` ×${effect.charges}` : ""} · ${formatDuration(effect.duration)}`;
		case "damageOverTime":
			return `${effect.dice} ${effect.damageType}/turn · ${formatDuration(effect.duration)}`;
		case "healOverTime":
			return `heal ${effect.dice}/turn · ${formatDuration(effect.duration)}`;
		case "shield":
			return `${effect.amount} shield · ${formatDuration(effect.duration)}`;
	}
}

function formatHealEffect(effect: HealEffect): string {
	if (effect.percent !== undefined) {
		return `heal ${effect.percent * 100}% max HP`;
	}
	const attribute = effect.attribute ? ` + ${effect.attribute.slice(0, 3).toUpperCase()}` : "";
	return `heal ${effect.dice}${attribute}`;
}

function formatOperation(operation: "add" | "multiply", value: number) {
	return operation === "multiply" ? percentChange(value) : signed(value);
}

function titleCase(value: string) {
	return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
