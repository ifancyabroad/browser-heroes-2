import type { Enemy } from "@app/content";

import { selectWeightedItem, type RngResult, type RngState } from "../../../core/rng";

export function selectWeightedEnemy(
	rngState: RngState,
	candidates: readonly Enemy[],
): RngResult<Enemy> | null {
	return selectWeightedItem(
		candidates.map((enemy) => ({
			value: enemy,
			weight: enemy.encounter.weight,
		})),
		rngState,
	);
}
