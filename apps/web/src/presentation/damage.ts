import type { AttackRange, DamageClass, DamageType } from "@app/content";
import { attackRangeLabels, damageClassLabels, damageTypeLabels } from "./labels";

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
