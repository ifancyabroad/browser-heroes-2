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
