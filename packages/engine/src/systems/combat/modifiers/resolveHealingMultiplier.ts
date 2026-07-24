import type { DerivedValue, ResolvedModifier } from "./modifier.types";

export function resolveHealingMultiplier(modifiers: readonly ResolvedModifier[]): DerivedValue {
	return modifiers.reduce<DerivedValue>(
		(result, resolvedModifier) => {
			const { modifier, source } = resolvedModifier;

			if (modifier.type !== "modifyHealing") {
				return result;
			}

			const previousValue = result.value;
			const resultingValue = previousValue * modifier.multiplier;

			return {
				...result,
				value: resultingValue,
				contributions: [
					...result.contributions,
					{
						source,
						operation: "multiply",
						modifierValue: modifier.multiplier,
						previousValue,
						resultingValue,
					},
				],
			};
		},
		{
			baseValue: 1,
			value: 1,
			contributions: [],
		},
	);
}
