import type { ModifiableStat, PassiveStatModifier } from "@app/content";

import { applyModifierOperation } from "./modifierOperations";
import type { DerivedValue, ResolvedModifier } from "./modifier.types";

export function resolveModifiedStat(
	stat: ModifiableStat,
	baseValue: number,
	modifiers: readonly ResolvedModifier[],
): DerivedValue {
	return modifiers.reduce<DerivedValue>(
		(result, resolvedModifier) => {
			const { modifier, source } = resolvedModifier;

			if (modifier.type !== "modifyStat" || modifier.stat !== stat) {
				return result;
			}

			const previousValue = result.value;
			const resultingValue = applyModifierOperation(
				previousValue,
				modifier.operation,
				modifier.value,
			);

			return {
				...result,
				value: resultingValue,
				contributions: [
					...result.contributions,
					createContribution(modifier, source, previousValue, resultingValue),
				],
			};
		},
		{
			baseValue,
			value: baseValue,
			contributions: [],
		},
	);
}

function createContribution(
	modifier: PassiveStatModifier,
	source: ResolvedModifier["source"],
	previousValue: number,
	resultingValue: number,
): DerivedValue["contributions"][number] {
	return {
		source,
		operation: modifier.operation,
		modifierValue: modifier.value,
		previousValue,
		resultingValue,
	};
}
