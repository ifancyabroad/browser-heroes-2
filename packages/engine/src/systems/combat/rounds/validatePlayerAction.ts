import type {
	EngineErrorCode,
	PlayerBasicAttackAction,
	PlayerUseSkillAction,
	PlayerUseConsumableAction,
	PlayerSkipTurnAction,
	RunState,
} from "../../../schemas";
import { hasActiveStatus } from "../effects/statuses/hasActiveStatus";
import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";
import { validateConsumableUse } from "../../consumables/validateConsumableUse";
import { canTargetCombatant } from "../combatants/canTargetCombatant";

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

		const validation = validateCombatantSkillUse(combat.player, action.skillId, combat.enemy);

		if (!validation.ok) {
			return validation;
		}
	}

	if (action.type === "PLAYER_USE_CONSUMABLE") {
		const validation = validateConsumableUse(state.hero, action.consumableType, combat);
		if (!validation.ok) {
			return validation;
		}
	}

	if (action.type === "PLAYER_BASIC_ATTACK" && !canTargetCombatant(combat.player, combat.enemy)) {
		return { ok: false, error: "TARGET_NOT_AVAILABLE" };
	}

	return { ok: true };
}
