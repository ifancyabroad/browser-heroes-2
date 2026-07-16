import type { DamageType } from "@app/content";
import type { CombatantState } from "../../../schemas";
import { combineModifierValues } from "../modifiers/modifierOperations";

type ApplyDamageModifiersInput = {
	baseAmount: number;
	damageType: DamageType;
	modifiers: CombatantState["combatStats"]["damageModifiers"];
};

export function applyDamageModifiers(input: ApplyDamageModifiersInput): number {
	const applicableModifiers = input.modifiers.filter(
		(modifier) => !modifier.damageType || modifier.damageType === input.damageType,
	);

	const afterAdditions = combineModifierValues("add", [
		input.baseAmount,
		...applicableModifiers
			.filter((modifier) => modifier.operation === "add")
			.map((modifier) => modifier.value),
	]);

	return combineModifierValues("multiply", [
		afterAdditions,
		...applicableModifiers
			.filter((modifier) => modifier.operation === "multiply")
			.map((modifier) => modifier.value),
	]);
}
