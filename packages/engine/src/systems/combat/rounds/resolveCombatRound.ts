import type { CombatState, EngineEvent, EngineResult, RunState } from "../../../schemas";
import type { RngState } from "../../../core/rng";
import { failureResult, successResult } from "../../../core/result";
import { advanceCombatantEffects } from "../effects/advanceCombatantEffects";
import { getActiveEffectIds } from "../effects/advanceActiveEffects";
import { getCombatTurnOrder } from "./getCombatTurnOrder";
import { resolveCombatStatus } from "../death/resolveCombatStatus";
import { applyVictoryReward } from "../../progression/rewards/applyVictoryReward";
import { planEnemyTurn } from "../enemy/planEnemyTurn";
import { resolveEnemyTurn } from "../enemy/resolveEnemyTurn";
import { advanceTurn } from "./advanceTurn";
import { syncHeroFromPlayerCombatant } from "../combatants/syncHeroFromCombatant";
import { isEndlessCycleVictory, isFinalBossVictory } from "../../endless/endlessProgression";
import { resolvePlayerTurn, type PlayerActionContext } from "./resolvePlayerTurn";
import { validatePlayerAction, type PlayerRoundAction } from "./validatePlayerAction";

export function resolveCombatRound(state: RunState, action: PlayerRoundAction): EngineResult {
	const validation = validatePlayerAction(state, action);

	if (!validation.ok) {
		return failureResult(state, validation.error);
	}

	if (!state.combat) {
		throw new Error("resolveCombatRound requires active combat");
	}

	let combat = state.combat;
	let currentState = state;

	const enemyPlan = planEnemyTurn(combat, state.rngState);
	let rngState = enemyPlan.rngState;

	const events: EngineEvent[] = [];

	const order = getCombatTurnOrder(combat);

	for (const side of order) {
		combat = { ...combat, activeActor: side };
		const effectIds = getActiveEffectIds(side === "player" ? combat.player : combat.enemy);
		let playerActionContext: PlayerActionContext | null = null;

		if (side === "player") {
			const turn = resolvePlayerTurn({ ...currentState, combat, rngState }, action);

			currentState = turn.state;
			combat = turn.state.combat;
			rngState = turn.state.rngState;
			events.push(...turn.events);
			playerActionContext = turn.actionContext;
		} else {
			const turn = resolveEnemyTurn({ combat, rngState, plannedAction: enemyPlan.value });

			combat = turn.value;
			rngState = turn.rngState;
		}

		const effects = advanceCombatantEffects({
			combat,
			combatantSide: side,
			effectIds,
			rngState,
		});

		combat = resolveCombatStatus(effects.value);
		rngState = effects.rngState;

		if (combat.status === "player_won") {
			return finishVictory({
				state: currentState,
				combat,
				rngState,
				events,
				finishingPlayerAction: playerActionContext,
			});
		}

		if (combat.status === "enemy_won") {
			return finishDefeat(currentState, combat, rngState, events);
		}
	}

	return successResult(
		{
			...currentState,
			rngState,
			hero: syncHeroFromPlayerCombatant(currentState.hero, combat.player),
			combat: advanceTurn(combat),
		},
		[...events, { type: "COMBAT_TURN_RESOLVED" }],
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
			combatId: combat.id,
			battleNumber: state.battleNumber,
			encounterType: combat.encounterType,
			enemySourceId: combat.enemy.sourceId,
			turnNumber: combat.turnNumber,
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
				combatId: combat.id,
				battleNumber: state.battleNumber,
				encounterType: combat.encounterType,
				enemySourceId: combat.enemy.sourceId,
				turnNumber: combat.turnNumber,
			},
		],
	);
}
