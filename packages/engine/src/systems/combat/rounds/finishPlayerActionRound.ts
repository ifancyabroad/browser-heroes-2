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
import { isEndlessCycleVictory, isFinalBossVictory } from "../../endless/endlessProgression";

export type PlayerActionContext = {
	type: "basic_attack" | "skill";
	targetStartedAtFullHp: boolean;
};

type FinishPlayerActionRoundInput = {
	state: RunState;
	combatAfterPlayerAction: CombatState;
	rngState: RngState;
	playerEffectIds: ReadonlySet<string>;
	events?: EngineEvent[];
	playerActionContext: PlayerActionContext | null;
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
		return finishVictory({
			state: input.state,
			combat: afterPlayerDeathCheck,
			rngState: playerEffects.rngState,
			events: input.events,
			finishingPlayerAction: input.playerActionContext,
		});
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
		return finishVictory({
			state: input.state,
			combat: afterEnemyDeathCheck,
			rngState: enemyEffects.rngState,
			events: input.events,
			finishingPlayerAction: null,
		});
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

type FinishVictoryInput = {
	state: RunState;
	combat: CombatState;
	rngState: RngState;
	events?: EngineEvent[];
	finishingPlayerAction: PlayerActionContext | null;
};

function finishVictory(input: FinishVictoryInput): EngineResult {
	const { state, combat, rngState, events, finishingPlayerAction } = input;
	const hasDefeatedFinalBoss =
		state.hasDefeatedFinalBoss || isFinalBossVictory(state.battleNumber);

	const completedState: RunState = {
		...state,
		rngState,
		hero: syncHeroFromPlayerCombatant(state.hero, combat.player),
		combat,
		kills: state.kills + 1,
		hasDefeatedFinalBoss,
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
			battleNumber: state.battleNumber,
			encounterType: combat.encounterType,
			defeatedFinalBoss: isFinalBossVictory(state.battleNumber),
			completedEndlessCycle: isEndlessCycleVictory(state.battleNumber),
			finishingPlayerAction,
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
				battleNumber: state.battleNumber,
				encounterType: combat.encounterType,
			},
		],
	);
}
