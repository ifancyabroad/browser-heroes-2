import type { DamageType } from "@app/content";
import type { CombatantState } from "../../../schemas";
import { getEffectiveDamageAffinities } from "../effects/getEffectiveDamageAffinities";

export type DamageAffinity = "normal" | "resistant" | "immune" | "vulnerable";

export function getDamageAffinity(
	defender: CombatantState,
	damageType: DamageType,
): DamageAffinity {
	const affinities = getEffectiveDamageAffinities(defender);

	if (affinities.immunities.includes(damageType)) {
		return "immune";
	}

	if (affinities.vulnerabilities.includes(damageType)) {
		return "vulnerable";
	}

	if (affinities.resistances.includes(damageType)) {
		return "resistant";
	}

	return "normal";
}

export function applyDamageAffinity(baseAmount: number, affinity: DamageAffinity): number {
	const amount = Math.max(0, Math.floor(baseAmount));

	switch (affinity) {
		case "immune":
			return 0;

		case "resistant":
			return Math.floor(amount / 2);

		case "vulnerable":
			return amount * 2;

		case "normal":
			return amount;
	}
}
