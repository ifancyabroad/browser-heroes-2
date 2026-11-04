import type {
	EngineErrorCode,
	PlayerBasicAttackAction,
	PlayerUseSkillAction,
	PlayerUseConsumableAction,
	PlayerSkipTurnAction,
	RunState,
} from "../../../schemas";
import { hasActiveStatus } from "../effects/hasActiveStatus";
import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";

export type PlayerRoundAction =
	| PlayerBasicAttackAction
	| PlayerUseSkillAction
	| PlayerUseConsumableAction
	| PlayerSkipTurnAction;

export type PlayerActionValidationResult = { ok: true } | { ok: false; error: EngineErrorCode };

export function validatePlayerAction(
	state: RunState,
	action: PlayerRoundAction,
): PlayerActionValidationResult {
	const { combat } = state;

	if (state.phase !== "combat" || !combat || combat.status !== "active") {
		return { ok: false, error: "COMBAT_NOT_ACTIVE" };
	}

	if (
		combat.activeActor !== "player" ||
		(action.type !== "PLAYER_SKIP_TURN" && hasActiveStatus(combat.player, "stunned"))
	) {
		return { ok: false, error: "PLAYER_CANNOT_ACT" };
	}

	if (action.type === "PLAYER_USE_SKILL") {
		if (hasActiveStatus(combat.player, "silenced")) {
			return { ok: false, error: "PLAYER_IS_SILENCED" };
		}

		const validation = validateCombatantSkillUse(combat.player, action.skillId);

		if (!validation.ok) {
			return validation;
		}
	}

	if (action.type === "PLAYER_USE_CONSUMABLE" && state.hero.healingPotions <= 0) {
		return { ok: false, error: "NO_HEALING_POTIONS_AVAILABLE" };
	}

	return { ok: true };
}
