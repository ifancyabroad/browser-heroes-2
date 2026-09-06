import type { CombatState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";

import { resolveBasicAttack } from "../attacks/resolveBasicAttack";
import { consumeCombatantSkillCharge } from "../skills/consumeCombatantSkillCharge";
import { resolveSkillEffects } from "../skills/resolveSkillEffects";
import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";
import { hasActiveStatus } from "../effects/hasActiveStatus";
import { appendCombatLog } from "../logs/appendCombatLog";

import type { EnemyAction } from "./selection/selectEnemyAction";

type ResolveEnemyTurnInput = {
	combat: CombatState;
	rngState: RngState;
	plannedAction: EnemyAction;
};

export function resolveEnemyTurn(input: ResolveEnemyTurnInput): RngResult<CombatState> {
	const combat: CombatState = {
		...input.combat,
		activeActor: "enemy",
	};

	if (hasActiveStatus(combat.enemy, "stunned")) {
		return {
			value: appendCombatLog(combat, {
				turnNumber: combat.turnNumber,
				actor: "enemy",
				message: `${combat.enemy.name} is stunned and cannot act.`,
				eventType: "turn_skipped",
			}),
			rngState: input.rngState,
		};
	}

	if (hasActiveStatus(combat.enemy, "silenced")) {
		return resolveBasicAttack({
			combat,
			attackerSide: "enemy",
			rngState: input.rngState,
		});
	}

	if (input.plannedAction.type === "basicAttack") {
		return resolveBasicAttack({
			combat,
			attackerSide: "enemy",
			rngState: input.rngState,
		});
	}

	const validation = validateCombatantSkillUse(combat.enemy, input.plannedAction.skillId);

	if (!validation.ok) {
		return resolveBasicAttack({
			combat,
			attackerSide: "enemy",
			rngState: input.rngState,
		});
	}

	const combatAfterCharge = consumeCombatantSkillCharge(
		combat,
		"enemy",
		input.plannedAction.skillId,
	);

	return resolveSkillEffects({
		combat: combatAfterCharge,
		actorSide: "enemy",
		effects: validation.value.effects,
		skillId: validation.value.skill.id,
		skillName: validation.value.skill.name,
		rngState: input.rngState,
	});
}
