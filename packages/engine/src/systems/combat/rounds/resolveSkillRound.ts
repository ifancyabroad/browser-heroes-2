import type { EngineResult, PlayerUseSkillAction, RunState } from "../../../schemas";

import { failureResult, successResult } from "../../../core/result";
import { resolveBasicAttack } from "../attacks/resolveBasicAttack";
import { resolveCombatStatus } from "../death/resolveCombatStatus";
import { advanceTurn } from "./advanceTurn";
import { applyVictoryReward } from "../../progression/rewards/applyVictoryReward";
import { consumePlayerSkillCharge } from "../skills/consumePlayerSkillCharge";
import { resolveSkillEffects } from "../skills/resolveSkillEffects";
import { validatePlayerSkillUse } from "../skills/validatePlayerSkillUse";

export function resolveSkillRound(state: RunState, action: PlayerUseSkillAction): EngineResult {
	if (!state.combat) {
		throw new Error("resolveSkillRound requires active combat");
	}

	const validation = validatePlayerSkillUse(state.combat, action);

	if (!validation.ok) {
		return failureResult(state, validation.error);
	}

	const combatAfterCharge = consumePlayerSkillCharge(state.combat, action.skillId);

	const playerSkill = resolveSkillEffects({
		combat: combatAfterCharge,
		actorSide: "player",
		effects: validation.value.effects,
		skillId: validation.value.skill.id,
		skillName: validation.value.skill.name,
		rngState: state.rngState,
	});

	const afterPlayerDeathCheck = resolveCombatStatus(playerSkill.value);

	if (afterPlayerDeathCheck.status === "player_won") {
		const completedState: RunState = {
			...state,
			rngState: playerSkill.rngState,
			combat: afterPlayerDeathCheck,
		};

		const victoryResult = applyVictoryReward(completedState);

		if (!victoryResult) {
			return failureResult(completedState, "ENEMY_DEFINITION_NOT_FOUND");
		}

		return successResult(victoryResult.state, [
			{
				type: "COMBAT_ENDED",
				outcome: "victory",
				reward: victoryResult.reward,
			},
		]);
	}

	const enemyAttack = resolveBasicAttack({
		combat: {
			...afterPlayerDeathCheck,
			activeActor: "enemy",
		},
		attackerSide: "enemy",
		rngState: playerSkill.rngState,
	});

	const afterEnemyDeathCheck = resolveCombatStatus(enemyAttack.value);

	if (afterEnemyDeathCheck.status === "enemy_won") {
		return successResult(
			{
				...state,
				rngState: enemyAttack.rngState,
				phase: "dead",
				combat: afterEnemyDeathCheck,
			},
			[
				{
					type: "COMBAT_ENDED",
					outcome: "defeat",
				},
			],
		);
	}

	return successResult(
		{
			...state,
			rngState: enemyAttack.rngState,
			combat: advanceTurn(afterEnemyDeathCheck),
		},
		[
			{
				type: "COMBAT_TURN_RESOLVED",
			},
		],
	);
}
