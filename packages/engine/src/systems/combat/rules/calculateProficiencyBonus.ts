import type { CombatModifier } from "../modifiers/applyStatModifiers";
import { applyPassiveStatModifiers } from "../modifiers/applyStatModifiers";

export function calculatePlayerProficiencyBonus(
	level: number,
	passiveModifiers: readonly CombatModifier[],
): number {
	const normalisedLevel = Math.max(1, level);
	const baseBonus = 2 + Math.floor((normalisedLevel - 1) / 4);

	return Math.max(
		0,
		Math.floor(applyPassiveStatModifiers("proficiencyBonus", baseBonus, passiveModifiers)),
	);
}
