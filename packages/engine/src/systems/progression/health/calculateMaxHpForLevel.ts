import type { HitDie } from "@app/content";

import { calculateAttributeModifier } from "../../../core/attributes";
import { getMaximumDiceValue } from "../../../core/dice";
import { calculateHitDieAverage } from "./calculateHitDieAverage";

export function calculateMaxHpForLevel(
	hitDie: HitDie,
	constitution: number,
	level: number,
): number {
	const normalisedLevel = Math.max(1, Math.floor(level));

	const constitutionModifier = calculateAttributeModifier(constitution);

	const startingHp = Math.max(1, getMaximumDiceValue(hitDie) + constitutionModifier);

	const hpPerAdditionalLevel = Math.max(1, calculateHitDieAverage(hitDie) + constitutionModifier);

	return startingHp + hpPerAdditionalLevel * (normalisedLevel - 1);
}
