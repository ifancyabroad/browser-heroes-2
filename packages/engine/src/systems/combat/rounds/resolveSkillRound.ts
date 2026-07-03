import type { EngineResult, PlayerUseSkillAction, RunState } from "../../../schemas";

import { failureResult, successResult } from "../../../core/result";
import { resolveCombatStatus } from "../death/resolveCombatStatus";
import { advanceTurn } from "./advanceTurn";
import { applyVictoryReward } from "../../progression/rewards/applyVictoryReward";
import { consumeCombatantSkillCharge } from "../skills/consumeCombatantSkillCharge";
import { resolveSkillEffects } from "../skills/resolveSkillEffects";
import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";
import { resolveEnemyTurn } from "../enemy/resolveEnemyTurn";
import { getActiveEffectIds } from "../effects/advanceActiveEffects";
import { advanceCombatantEffects } from "../effects/advanceCombatantEffects";

export function resolveSkillRound(state: RunState, action: PlayerUseSkillAction): EngineResult {
	if (!state.combat) {
		throw new Error("resolveSkillRound requires active combat");
	}

	const playerEffectIds = getActiveEffectIds(state.combat.player);

	const validation = validateCombatantSkillUse(state.combat.player, action.skillId);

	if (!validation.ok) {
		return failureResult(state, validation.error);
	}

	const combatAfterCharge = consumeCombatantSkillCharge(state.combat, "player", action.skillId);

	const playerSkill = resolveSkillEffects({
		combat: combatAfterCharge,
		actorSide: "player",
		effects: validation.value.effects,
		skillId: validation.value.skill.id,
		skillName: validation.value.skill.name,
		rngState: state.rngState,
	});

	const playerEffects = advanceCombatantEffects({
		combat: playerSkill.value,
		combatantSide: "player",
		effectIds: playerEffectIds,
		rngState: playerSkill.rngState,
	});

	const afterPlayerDeathCheck = resolveCombatStatus(playerEffects.value);

	if (afterPlayerDeathCheck.status === "player_won") {
		const completedState: RunState = {
			...state,
			rngState: playerEffects.rngState,
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

	const enemyEffectIds = getActiveEffectIds(afterPlayerDeathCheck.enemy);

	const enemyTurn = resolveEnemyTurn({
		combat: afterPlayerDeathCheck,
		rngState: playerSkill.rngState,
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
				...state,
				rngState: enemyEffects.rngState,
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
			rngState: enemyEffects.rngState,
			combat: advanceTurn(afterEnemyDeathCheck),
		},
		[
			{
				type: "COMBAT_TURN_RESOLVED",
			},
		],
	);
}
