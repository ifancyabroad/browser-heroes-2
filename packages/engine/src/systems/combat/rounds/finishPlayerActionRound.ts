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
		return finishVictory(
			input.state,
			afterPlayerDeathCheck,
			playerEffects.rngState,
			input.events,
		);
	}

	if (afterPlayerDeathCheck.status === "enemy_won") {
		return finishDefeat(
			input.state,
			afterPlayerDeathCheck,
			playerEffects.rngState,
			input.events,
		);
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

	if (afterEnemyDeathCheck.status === "player_won") {
		return finishVictory(
			input.state,
			afterEnemyDeathCheck,
			enemyEffects.rngState,
			input.events,
		);
	}

	if (afterEnemyDeathCheck.status === "enemy_won") {
		return finishDefeat(input.state, afterEnemyDeathCheck, enemyEffects.rngState, input.events);
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

function finishVictory(
	state: RunState,
	combat: CombatState,
	rngState: RngState,
	events?: EngineEvent[],
): EngineResult {
	const completedState: RunState = {
		...state,
		rngState,
		combat,
		kills: state.kills + 1,
	};

	const victoryResult = applyVictoryReward(completedState);

	if (!victoryResult) {
		return failureResult(completedState, "ENEMY_DEFINITION_NOT_FOUND");
	}

	return successResult(victoryResult.state, [
		...(events ?? []),
		{
			type: "COMBAT_ENDED",
			outcome: "victory",
			reward: victoryResult.reward,
		},
	]);
}

function finishDefeat(
	state: RunState,
	combat: CombatState,
	rngState: RngState,
	events?: EngineEvent[],
): EngineResult {
	return successResult(
		{
			...state,
			rngState,
			phase: "dead",
			hero: syncHeroFromPlayerCombatant(state.hero, combat.player),
			combat,
		},
		[
			...(events ?? []),
			{
				type: "COMBAT_ENDED",
				outcome: "defeat",
			},
		],
	);
}
