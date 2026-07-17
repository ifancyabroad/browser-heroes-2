import type { CombatState, EngineEvent, EngineResult, RunState } from "../../../schemas";

import type { RngState } from "../../../core/rng";

import { failureResult, successResult } from "../../../core/result";
import { advanceCombatantEffects } from "../effects/advanceCombatantEffects";
import { getActiveEffectIds } from "../effects/advanceActiveEffects";
import { resolveCombatStatus } from "../death/resolveCombatStatus";
import { applyVictoryReward } from "../../progression/rewards/applyVictoryReward";
import { resolveEnemyTurn } from "../enemy/resolveEnemyTurn";
import { advanceTurn } from "./advanceTurn";
import { syncHeroFromPlayerCombatant } from "../combatants/syncHeroFromCombatant";

type FinishPlayerActionRoundInput = {
	state: RunState;
	combatAfterPlayerAction: CombatState;
	rngState: RngState;
	playerEffectIds: ReadonlySet<string>;
	events?: EngineEvent[];
};

export function finishPlayerActionRound(input: FinishPlayerActionRoundInput): EngineResult {
	const playerEffects = advanceCombatantEffects({
		combat: input.combatAfterPlayerAction,
		combatantSide: "player",
		effectIds: input.playerEffectIds,
		rngState: input.rngState,
	});

	const afterPlayerDeathCheck = resolveCombatStatus(playerEffects.value);

	if (afterPlayerDeathCheck.status === "player_won") {
		const completedState: RunState = {
			...input.state,
			rngState: playerEffects.rngState,
			combat: afterPlayerDeathCheck,
			kills: input.state.kills + 1,
		};

		const victoryResult = applyVictoryReward(completedState);

		if (!victoryResult) {
			return failureResult(completedState, "ENEMY_DEFINITION_NOT_FOUND");
		}

		return successResult(victoryResult.state, [
			...(input.events ?? []),
			{
				type: "COMBAT_ENDED",
				outcome: "victory",
				reward: victoryResult.reward,
			},
		]);
	}

	const enemyEffectIds = getActiveEffectIds(afterPlayerDeathCheck.enemy);

	const enemyTurn = resolveEnemyTurn({
		combat: afterPlayerDeathCheck,
		rngState: playerEffects.rngState,
	});

	const enemyEffects = advanceCombatantEffects({
		combat: enemyTurn.value,
		combatantSide: "enemy",
		effectIds: enemyEffectIds,
		rngState: enemyTurn.rngState,
	});

	const afterEnemyDeathCheck = resolveCombatStatus(enemyEffects.value);

	if (afterEnemyDeathCheck.status === "enemy_won") {
		return successResult(
			{
				...input.state,
				rngState: enemyEffects.rngState,
				phase: "dead",
				hero: syncHeroFromPlayerCombatant(input.state.hero, afterEnemyDeathCheck.player),
				combat: afterEnemyDeathCheck,
			},
			[
				...(input.events ?? []),
				{
					type: "COMBAT_ENDED",
					outcome: "defeat",
				},
			],
		);
	}

	return successResult(
		{
			...input.state,
			rngState: enemyEffects.rngState,
			hero: syncHeroFromPlayerCombatant(input.state.hero, afterEnemyDeathCheck.player),
			combat: advanceTurn(afterEnemyDeathCheck),
		},
		[
			...(input.events ?? []),
			{
				type: "COMBAT_TURN_RESOLVED",
			},
		],
	);
}
