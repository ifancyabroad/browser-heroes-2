import type { Enemy } from "@app/content";

import { randomFloat, type RngResult, type RngState } from "../../../core/rng";

export function selectWeightedEnemy(
	rngState: RngState,
	candidates: readonly Enemy[],
): RngResult<Enemy> | null {
	if (candidates.length === 0) {
		return null;
	}

	const totalWeight = candidates.reduce((sum, enemy) => sum + enemy.encounter.weight, 0);

	if (totalWeight <= 0) {
		return null;
	}

	const roll = randomFloat(rngState);
	const targetWeight = roll.value * totalWeight;

	let runningWeight = 0;

	for (const enemy of candidates) {
		runningWeight += enemy.encounter.weight;

		if (targetWeight < runningWeight) {
			return {
				value: enemy,
				rngState: roll.rngState,
			};
		}
	}

	return {
		value: candidates[candidates.length - 1],
		rngState: roll.rngState,
	};
}
