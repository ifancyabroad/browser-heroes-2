import type { HitDie } from "@app/content";

import { calculateAttributeModifier } from "../../../core/attributes";
import { calculateHitDieAverage } from "./calculateHitDieAverage";

export function calculateLevelUpHpGain(hitDie: HitDie, constitution: number): number {
	return Math.max(1, calculateHitDieAverage(hitDie) + calculateAttributeModifier(constitution));
}
