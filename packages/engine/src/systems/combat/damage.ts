import type { CombatantState } from "../../schemas";

type DamageInput = {
	attacker: CombatantState;
	defender: CombatantState;
	basePower: number;
};

type DamageResult = {
	amount: number;
	wasBlocked: boolean;
};

export function calculateDamage(input: DamageInput): DamageResult {
	return {
		amount: Math.max(
			1,
			input.basePower + input.attacker.stats.strength - input.defender.stats.constitution,
		),
		wasBlocked: false,
	};
}
