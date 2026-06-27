import type { DiceFormula } from "@app/content";

import { parseDiceFormula } from "../../../core/dice";

export function calculateHitDieAverage(hitDie: DiceFormula): number {
	const parsed = parseDiceFormula(hitDie);

	const averagePerDie = (parsed.sides + 1) / 2;

	return Math.ceil(parsed.count * averagePerDie + parsed.modifier);
}
