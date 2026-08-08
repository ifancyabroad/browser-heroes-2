import type { AttackRider, PassiveModifier, RiderEffect } from "@app/content";

type StatModifier = Extract<PassiveModifier, { type: "modifyStat" }>;

const statLabels: Record<StatModifier["stat"], string> = {
	armourClass: "AC",
	attackRollBonus: "attack",
	savingThrowBonus: "saves",
	saveDcBonus: "save DC",
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
const damageLabel = (damageType?: string) => (damageType ? `${damageType} damage` : "damage");
const durationLabel = (duration: { unit: string; value: number }) =>
	`${duration.value} ${duration.value === 1 ? duration.unit.replace(/s$/, "") : duration.unit}`;

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
			return `${formatOperation(modifier.operation, modifier.value)} ${damageLabel(modifier.damageType)}`;
		case "modifyDamageTaken":
			return `${formatOperation(modifier.operation, modifier.value)} ${modifier.damageType ?? "all"} damage taken`;
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
			return `heal ${effect.dice}${effect.attribute ? ` + ${effect.attribute.slice(0, 3).toUpperCase()}` : ""}`;
		case "applyStatus":
			return `${effect.statusId} · ${durationLabel(effect.duration)}`;
		case "modifyStat":
			return `${signed(effect.value)} ${statLabels[effect.stat]} · ${durationLabel(effect.duration)}`;
		case "modifyHealing":
			return `${percentChange(effect.multiplier)} healing · ${durationLabel(effect.duration)}`;
		case "modifyDamage":
			return `${formatOperation(effect.operation, effect.value)} ${damageLabel(effect.damageType)} · ${durationLabel(effect.duration)}`;
		case "modifyDamageTaken":
			return `${formatOperation(effect.operation, effect.value)} ${effect.damageType ?? "all"} damage taken · ${durationLabel(effect.duration)}`;
		case "modifyDamageAffinity":
			return `${effect.operation === "add" ? "" : "lose "}${effect.damageType} ${effect.affinity} · ${durationLabel(effect.duration)}`;
		case "modifyRoll":
			return `${titleCase(effect.mode)} ${effect.roll === "savingThrow" ? "save" : "attack"}${effect.charges ? ` ×${effect.charges}` : ""} · ${durationLabel(effect.duration)}`;
		case "damageOverTime":
			return `${effect.dice} ${effect.damageType}/turn · ${durationLabel(effect.duration)}`;
		case "healOverTime":
			return `heal ${effect.dice}/turn · ${durationLabel(effect.duration)}`;
		case "shield":
			return `${effect.amount} shield · ${durationLabel(effect.duration)}`;
	}
}

function formatOperation(operation: "add" | "multiply", value: number) {
	return operation === "multiply" ? percentChange(value) : signed(value);
}

function titleCase(value: string) {
	return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
