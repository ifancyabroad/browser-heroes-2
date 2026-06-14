import type { DiceFormula } from "@app/content";
import { calculateAttributeModifier } from "../../core/attributes";
import { getMaximumDiceValue } from "../../core/dice";

export function calculateStartingHp(hitDie: DiceFormula, constitution: number): number {
	const hitDieMaximum = getMaximumDiceValue(hitDie);
	const constitutionModifier = calculateAttributeModifier(constitution);

	return Math.max(1, hitDieMaximum + constitutionModifier);
}
