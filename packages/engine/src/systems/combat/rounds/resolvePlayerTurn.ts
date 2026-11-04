import type { CombatState, EngineEvent, RunState } from "../../../schemas";
import { resolveBasicAttack } from "../attacks/resolveBasicAttack";
import { hasActiveStatus } from "../effects/hasActiveStatus";
import { appendCombatLog } from "../logs/appendCombatLog";
import { consumeCombatantSkillCharge } from "../skills/consumeCombatantSkillCharge";
import { resolveSkillEffects } from "../skills/resolveSkillEffects";
import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";
import { useHealingPotion } from "../../consumables/useHealingPotion";
import type { PlayerRoundAction } from "./validatePlayerAction";

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

		return {
			state: {
				...state,
				combat: appendCombatLog(combat, {
					turnNumber: combat.turnNumber,
					actor: "player",
					message,
					eventType: "turn_skipped",
				}),
			},
			events: [],
			actionContext: null,
		};
	}

	if (action.type === "PLAYER_USE_CONSUMABLE") {
		const potion = useHealingPotion(combat, state.hero.healingPotions);

		return {
			state: {
				...state,
				combat: potion.combat,
				hero: { ...state.hero, healingPotions: potion.remainingPotions },
			},
			events: [potion.event],
			actionContext: null,
		};
	}

	const targetStartedAtFullHp = combat.enemy.currentHp === combat.enemy.maxHp;

	if (action.type === "PLAYER_USE_SKILL" && !hasActiveStatus(combat.player, "silenced")) {
		const validation = validateCombatantSkillUse(combat.player, action.skillId);

		if (!validation.ok) {
			throw new Error("Validated player skill became unavailable during the round");
		}

		const result = resolveSkillEffects({
			combat: consumeCombatantSkillCharge(combat, "player", action.skillId),
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

	const attack = resolveBasicAttack({ combat, attackerSide: "player", rngState });

	return {
		state: { ...state, combat: attack.value, rngState: attack.rngState },
		events: [],
		actionContext: { type: "basic_attack", targetStartedAtFullHp },
	};
}
