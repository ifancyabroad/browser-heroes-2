import type { EngineResult, PlayerUseSkillAction, RunState } from "../../../schemas";

import { failureResult } from "../../../core/result";
import { consumeCombatantSkillCharge } from "../skills/consumeCombatantSkillCharge";
import { resolveSkillEffects } from "../skills/resolveSkillEffects";
import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";
import { getActiveEffectIds } from "../effects/advanceActiveEffects";
import { finishPlayerActionRound } from "./finishPlayerActionRound";

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

	return finishPlayerActionRound({
		state,
		combatAfterPlayerAction: playerSkill.value,
		rngState: playerSkill.rngState,
		playerEffectIds,
	});
}
