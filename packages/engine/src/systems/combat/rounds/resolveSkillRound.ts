import type { EngineEvent, EngineResult, PlayerUseSkillAction, RunState } from "../../../schemas";

import { failureResult } from "../../../core/result";
import { consumeCombatantSkillCharge } from "../skills/consumeCombatantSkillCharge";
import { resolveSkillEffects } from "../skills/resolveSkillEffects";
import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";
import { getActiveEffectIds } from "../effects/advanceActiveEffects";
import { finishPlayerActionRound } from "./finishPlayerActionRound";
import { hasActiveStatus } from "../effects/hasActiveStatus";
import { validatePlayerAction } from "./validatePlayerAction";

export function resolveSkillRound(state: RunState, action: PlayerUseSkillAction): EngineResult {
	if (!state.combat) {
		throw new Error("resolveSkillRound requires active combat");
	}

	const playerActionValidation = validatePlayerAction(state.combat);

	if (!playerActionValidation.ok) {
		return failureResult(state, playerActionValidation.error);
	}

	if (hasActiveStatus(state.combat.player, "stunned")) {
		return failureResult(state, "PLAYER_CANNOT_ACT");
	}

	if (hasActiveStatus(state.combat.player, "silenced")) {
		return failureResult(state, "PLAYER_IS_SILENCED");
	}

	const playerEffectIds = getActiveEffectIds(state.combat.player);

	const skillValidation = validateCombatantSkillUse(state.combat.player, action.skillId);

	if (!skillValidation.ok) {
		return failureResult(state, skillValidation.error);
	}

	const combatAfterCharge = consumeCombatantSkillCharge(state.combat, "player", action.skillId);

	const playerSkill = resolveSkillEffects({
		combat: combatAfterCharge,
		actorSide: "player",
		effects: skillValidation.value.effects,
		skillId: skillValidation.value.skill.id,
		skillName: skillValidation.value.skill.name,
		rngState: state.rngState,
	});
	const skillUsedEvent: EngineEvent = {
		type: "SKILL_USED",
		skillId: action.skillId,
		combatId: state.combat.id,
		battleNumber: state.battleNumber,
		encounterType: state.combat.encounterType,
		enemySourceId: state.combat.enemy.sourceId,
		turnNumber: state.combat.turnNumber,
	};

	return finishPlayerActionRound({
		state,
		combatAfterPlayerAction: playerSkill.value,
		rngState: playerSkill.rngState,
		playerEffectIds,
		events: [skillUsedEvent],
		playerActionContext: {
			type: "skill",
			targetStartedAtFullHp: state.combat.enemy.currentHp === state.combat.enemy.maxHp,
		},
	});
}
