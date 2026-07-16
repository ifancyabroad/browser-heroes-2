import type { ModifierOperation } from "@app/content";

export function applyModifierOperation(
	baseValue: number,
	operation: ModifierOperation,
	modifierValue: number,
): number {
	switch (operation) {
		case "add":
			return baseValue + modifierValue;

		case "multiply":
			return baseValue * modifierValue;

		case "set":
			return modifierValue;
	}
}

export function combineModifierValues(operation: "add" | "multiply", values: readonly number[]) {
	const identity = operation === "add" ? 0 : 1;

	return values.reduce(
		(total, value) => (operation === "add" ? total + value : total * value),
		identity,
	);
}
