import { type Tactic } from "@app/content";

import type { CombatantState } from "../../../../schemas";
import type { RngResult, RngState } from "../../../../core/rng";

import type { EnemyAction } from "../enemyTactics";
import { selectBinkusAction } from "./selectBinkusAction";
import { selectConcederAction } from "./selectConcederAction";
import { selectStandardEnemyAction } from "./selectStandardEnemyAction";

export type { EnemyAction } from "../enemyTactics";

type SelectEnemyActionInput = {
	enemy: CombatantState;
	player: CombatantState;
	tactic: Tactic;
	rngState: RngState;
};

export function selectEnemyAction(input: SelectEnemyActionInput): RngResult<EnemyAction> {
	switch (input.tactic) {
		case "binkus":
			return selectBinkusAction(input);
		case "conceder":
			return selectConcederAction(input);
		default:
			return selectStandardEnemyAction({
				enemy: input.enemy,
				player: input.player,
				tactic: input.tactic,
				rngState: input.rngState,
			});
	}
}
