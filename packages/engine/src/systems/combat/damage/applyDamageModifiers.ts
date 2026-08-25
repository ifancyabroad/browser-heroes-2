import type { AttackRange, DamageClass, DamageType } from "@app/content";
import type { CombatantState } from "../../../schemas";
import { combineModifierValues } from "../modifiers/modifierOperations";

type ApplyDamageModifiersInput = {
	baseAmount: number;
	damageType: DamageType;
	damageClass: DamageClass;
	attackRange?: AttackRange;
	modifiers: CombatantState["combatStats"]["damageModifiers"];
};

export function applyDamageModifiers(input: ApplyDamageModifiersInput): number {
	const applicableModifiers = input.modifiers.filter(
		(modifier) =>
			(!modifier.damageType || modifier.damageType === input.damageType) &&
			(!modifier.damageClass || modifier.damageClass === input.damageClass) &&
			(!modifier.attackRange || modifier.attackRange === input.attackRange),
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
