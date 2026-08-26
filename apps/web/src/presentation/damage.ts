import type { AttackRange, DamageClass, DamageType } from "@app/content";
import { attackRangeLabels, damageClassLabels, damageTypeLabels } from "./labels";

const damageTypeClasses = {
	acid: { border: "border-damage-acid", text: "text-damage-acid" },
	cold: { border: "border-damage-cold", text: "text-damage-cold" },
	crushing: { border: "border-damage-crushing", text: "text-damage-crushing" },
	fire: { border: "border-damage-fire", text: "text-damage-fire" },
	lightning: { border: "border-damage-lightning", text: "text-damage-lightning" },
	necrotic: { border: "border-damage-necrotic", text: "text-damage-necrotic" },
	piercing: { border: "border-damage-piercing", text: "text-damage-piercing" },
	poison: { border: "border-damage-poison", text: "text-damage-poison" },
	radiant: { border: "border-damage-radiant", text: "text-damage-radiant" },
	slashing: { border: "border-damage-slashing", text: "text-damage-slashing" },
} satisfies Record<DamageType, { border: string; text: string }>;

export type DamageSelector = {
	damageType?: DamageType;
	damageClass?: DamageClass;
	attackRange?: AttackRange;
};

export function formatDamageSelector(selector: DamageSelector, fallback = "All") {
	const labels = [
		selector.damageClass ? damageClassLabels[selector.damageClass] : undefined,
		selector.attackRange ? attackRangeLabels[selector.attackRange] : undefined,
		selector.damageType ? damageTypeLabels[selector.damageType] : undefined,
	].filter((label): label is string => label !== undefined);

	return labels.join(" ") || fallback;
}

export function formatDamageSubject(selector: DamageSelector, fallback = "All damage") {
	const label = formatDamageSelector(selector, "");
	return label ? `${label} damage` : fallback;
}

export function getDamageTypeBorderClass(damageType: DamageType) {
	return damageTypeClasses[damageType].border;
}

export function getDamageTypeTextClass(damageType: DamageType) {
	return damageTypeClasses[damageType].text;
}
