import type { DamageType } from "@app/content";
import type { CombatantState } from "../../../schemas";

type ApplyDamageModifiersInput = {
	baseAmount: number;
	damageType: DamageType;
	modifiers: CombatantState["combatStats"]["damageModifiers"];
};

export function applyDamageModifiers(input: ApplyDamageModifiersInput): number {
	const applicableModifiers = input.modifiers.filter(
		(modifier) => !modifier.damageType || modifier.damageType === input.damageType,
	);

	const afterAdditions = applicableModifiers
		.filter((modifier) => modifier.operation === "add")
		.reduce((amount, modifier) => amount + modifier.value, input.baseAmount);

	return applicableModifiers
		.filter((modifier) => modifier.operation === "multiply")
		.reduce((amount, modifier) => amount * modifier.value, afterAdditions);
}
