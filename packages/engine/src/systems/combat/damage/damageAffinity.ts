import type { DamageType } from "@app/content";
import type { CombatantState } from "../../../schemas";

export type DamageAffinity = "normal" | "resistant" | "immune" | "vulnerable";

export function getDamageAffinity(
	defender: CombatantState,
	damageType: DamageType,
): DamageAffinity {
	if (defender.combatStats.damageAffinities.immunities.includes(damageType)) {
		return "immune";
	}

	if (defender.combatStats.damageAffinities.vulnerabilities.includes(damageType)) {
		return "vulnerable";
	}

	if (defender.combatStats.damageAffinities.resistances.includes(damageType)) {
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
