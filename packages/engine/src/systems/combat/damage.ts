import type { CombatantState } from "../../schemas";

export type DamageInput = {
	attacker: CombatantState;
	defender: CombatantState;
	basePower?: number;
};

export type DamageResult = {
	amount: number;
	wasBlocked: boolean;
};

export function calculateDamage(input: DamageInput): DamageResult {
	const basePower = input.basePower ?? input.attacker.stats.attack;

	const rawDamage = basePower - input.defender.stats.defense;

	const amount = Math.max(1, rawDamage);

	return {
		amount,
		wasBlocked: false,
	};
}

export function applyDamage(combatant: CombatantState, damage: DamageResult): CombatantState {
	const nextHp = Math.max(0, combatant.currentHp - damage.amount);

	return {
		...combatant,
		currentHp: nextHp,
		isDead: nextHp <= 0,
	};
}
