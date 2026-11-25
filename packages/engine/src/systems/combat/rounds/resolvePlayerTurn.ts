import type { CombatState, EngineEvent, RunState } from "../../../schemas";
import { resolveBasicAttack } from "../attacks/resolveBasicAttack";
import { hasActiveStatus } from "../effects/statuses/hasActiveStatus";
import { appendCombatLog } from "../logs/appendCombatLog";
import { consumeCombatantSkillCharge } from "../skills/consumeCombatantSkillCharge";
import { resolveSkillEffects } from "../skills/resolveSkillEffects";
import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";
import { useConsumable } from "../../consumables/useConsumable";
import type { PlayerRoundAction } from "./validatePlayerAction";
import { removeInvisibility } from "../effects/lifecycle/removeInvisibility";
import { validateConsumableUse } from "../../consumables/validateConsumableUse";
import { canTargetCombatant } from "../combatants/canTargetCombatant";

export type PlayerActionContext = {
	type: "basic_attack" | "skill";
	targetStartedAtFullHp: boolean;
};

type CombatRunState = RunState & { combat: CombatState };
type PlayerTurnResult = {
	state: CombatRunState;
	events: EngineEvent[];
	actionContext: PlayerActionContext | null;
};

export function resolvePlayerTurn(
	state: CombatRunState,
	action: PlayerRoundAction,
): PlayerTurnResult {
	const { combat, rngState } = state;

	if (hasActiveStatus(combat.player, "stunned") || action.type === "PLAYER_SKIP_TURN") {
		const message = hasActiveStatus(combat.player, "stunned")
			? `${combat.player.name} is stunned and cannot act.`
			: `${combat.player.name} skips their turn.`;

		return skipPlayerTurn(state, message);
	}

	const unavailableTargetMessage = `${combat.enemy.name} is invisible and cannot be targeted by ${combat.player.name}.`;

	if (action.type === "PLAYER_USE_CONSUMABLE") {
		const validation = validateConsumableUse(state.hero, action.consumableType, combat);
		if (!validation.ok) {
			if (validation.error === "TARGET_NOT_AVAILABLE") {
				return skipPlayerTurn(state, unavailableTargetMessage);
			}
			throw new Error("Validated player consumable became unavailable during the round");
		}
		return {
			...useConsumable(
				{ ...state, combat: removeInvisibility(combat, "player") },
				action.consumableType,
			),
			actionContext: null,
		};
	}

	const targetStartedAtFullHp = combat.enemy.currentHp === combat.enemy.maxHp;

	if (action.type === "PLAYER_USE_SKILL" && !hasActiveStatus(combat.player, "silenced")) {
		const validation = validateCombatantSkillUse(combat.player, action.skillId, combat.enemy);

		if (!validation.ok) {
			if (validation.error === "TARGET_NOT_AVAILABLE") {
				return skipPlayerTurn(state, unavailableTargetMessage);
			}
			throw new Error("Validated player skill became unavailable during the round");
		}

		const result = resolveSkillEffects({
			combat: consumeCombatantSkillCharge(
				removeInvisibility(combat, "player"),
				"player",
				action.skillId,
			),
			actorSide: "player",
			effects: validation.value.effects,
			skillId: action.skillId,
			skillName: validation.value.skill.name,
			rngState,
		});

		return {
			state: { ...state, combat: result.value, rngState: result.rngState },
			events: [
				{
					type: "SKILL_USED",
					skillId: action.skillId,
					combatId: combat.id,
					battleNumber: state.battleNumber,
					encounterType: combat.encounterType,
					enemySourceId: combat.enemy.sourceId,
					turnNumber: combat.turnNumber,
				},
			],
			actionContext: { type: "skill", targetStartedAtFullHp },
		};
	}

	if (!canTargetCombatant(combat.player, combat.enemy)) {
		return skipPlayerTurn(state, unavailableTargetMessage);
	}
	const attack = resolveBasicAttack({
		combat: removeInvisibility(combat, "player"),
		attackerSide: "player",
		rngState,
	});

	return {
		state: { ...state, combat: attack.value, rngState: attack.rngState },
		events: [],
		actionContext: { type: "basic_attack", targetStartedAtFullHp },
	};
}

function skipPlayerTurn(state: CombatRunState, message: string): PlayerTurnResult {
	return {
		state: {
			...state,
			combat: appendCombatLog(state.combat, {
				turnNumber: state.combat.turnNumber,
				actor: "player",
				message,
				eventType: "turn_skipped",
			}),
		},
		events: [],
		actionContext: null,
	};
}
