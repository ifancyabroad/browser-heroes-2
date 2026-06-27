import type { DiceFormula } from "@app/content";

import { calculateAttributeModifier } from "../../../core/attributes";
import { calculateHitDieAverage } from "./calculateHitDieAverage";

export function calculateLevelUpHpGain(hitDie: DiceFormula, constitution: number): number {
	const hitDieAverage = calculateHitDieAverage(hitDie);

	const constitutionModifier = calculateAttributeModifier(constitution);

	return Math.max(1, hitDieAverage + constitutionModifier);
}
