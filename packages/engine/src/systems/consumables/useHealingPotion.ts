import type { EngineResult, RunState } from "../../schemas";

import { failureResult } from "../../core/result";
import { getActiveEffectIds } from "../combat/effects/advanceActiveEffects";
import { applyHealing } from "../combat/healing/applyHealing";
import { replaceCombatant } from "../combat/combatants/combatantSelectors";
import { appendCombatLog } from "../combat/logs/appendCombatLog";

import { HEALING_POTION_HEAL_PERCENT } from "./healingPotionConstants";
import { getEffectiveCombatStatValue } from "../combat/effects/getEffectiveCombatStatValue";
import { finishPlayerActionRound } from "../combat/rounds/finishPlayerActionRound";

export function useHealingPotion(state: RunState): EngineResult {
	if (!state.combat) {
		throw new Error("useHealingPotion requires active combat");
	}

	if (state.phase !== "combat" || state.combat.status !== "active") {
		return failureResult(state, "COMBAT_NOT_ACTIVE");
	}

	if (state.combat.activeActor !== "player") {
		return failureResult(state, "PLAYER_CANNOT_ACT");
	}

	if (state.hero.healingPotions <= 0) {
		return failureResult(state, "NO_HEALING_POTIONS_AVAILABLE");
	}

	const playerEffectIds = getActiveEffectIds(state.combat.player);

	const healingAmount = calculateHealingPotionAmount(state);

	const healing = applyHealing(state.combat.player, healingAmount);

	const remainingPotions = state.hero.healingPotions - 1;

	const combatAfterPotion = appendCombatLog(replaceCombatant(state.combat, healing.combatant), {
		turnNumber: state.combat.turnNumber,
		actor: "player",
		message: `${state.combat.player.name} uses a healing potion and restores ${healing.actualHealing} HP.`,
		eventType: "healing_potion_used",
	});

	return finishPlayerActionRound({
		state: {
			...state,
			hero: {
				...state.hero,
				healingPotions: remainingPotions,
			},
		},
		combatAfterPlayerAction: combatAfterPotion,
		rngState: state.rngState,
		playerEffectIds,
		events: [
			{
				type: "HEALING_POTION_USED",
				amount: healing.actualHealing,
				remainingPotions,
			},
		],
	});
}

function calculateHealingPotionAmount(state: RunState): number {
	const baseHealing = Math.round(state.combat!.player.maxHp * HEALING_POTION_HEAL_PERCENT);

	const healingMultiplier = getEffectiveCombatStatValue(
		state.combat!.player,
		"healingMultiplier",
	);

	return Math.max(0, Math.floor(baseHealing * healingMultiplier));
}
