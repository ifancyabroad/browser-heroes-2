import type { CombatState } from "../../../schemas";
import type { RngResult, RngState } from "../../../core/rng";
import { resolveBasicAttack } from "../attacks/resolveBasicAttack";
import { canTargetCombatant } from "../combatants/canTargetCombatant";
import { hasActiveStatus } from "../effects/statuses/hasActiveStatus";
import { removeInvisibility } from "../effects/lifecycle/removeInvisibility";
import { appendCombatLog } from "../logs/appendCombatLog";
import { consumeCombatantSkillCharge } from "../skills/consumeCombatantSkillCharge";
import { resolveSkillEffects } from "../skills/resolveSkillEffects";
import { validateCombatantSkillUse } from "../skills/validateCombatantSkillUse";
import type { EnemyAction } from "./selection/selectEnemyAction";

type ResolveEnemyTurnInput = {
	combat: CombatState;
	rngState: RngState;
	plannedAction: EnemyAction;
};

export function resolveEnemyTurn(input: ResolveEnemyTurnInput): RngResult<CombatState> {
	const { combat, rngState } = input;
	if (hasActiveStatus(combat.enemy, "stunned")) {
		return skipEnemyTurn(input, `${combat.enemy.name} is stunned and cannot act.`);
	}
	if (input.plannedAction.type === "skip") {
		return skipEnemyTurn(input, `${combat.enemy.name} skips their turn.`);
	}
	if (input.plannedAction.type === "skill" && !hasActiveStatus(combat.enemy, "silenced")) {
		const validation = validateCombatantSkillUse(
			combat.enemy,
			input.plannedAction.skillId,
			combat.player,
		);
		if (validation.ok) {
			const revealed = removeInvisibility(combat, "enemy");
			return resolveSkillEffects({
				combat: consumeCombatantSkillCharge(revealed, "enemy", input.plannedAction.skillId),
				actorSide: "enemy",
				effects: validation.value.effects,
				skillId: validation.value.skill.id,
				skillName: validation.value.skill.name,
				rngState,
			});
		}
		if (validation.error === "TARGET_NOT_AVAILABLE") {
			return skipEnemyTurn(
				input,
				`${combat.player.name} is invisible and cannot be targeted by ${combat.enemy.name}.`,
			);
		}
	}
	if (!canTargetCombatant(combat.enemy, combat.player)) {
		return skipEnemyTurn(
			input,
			`${combat.player.name} is invisible and cannot be targeted by ${combat.enemy.name}.`,
		);
	}
	return resolveBasicAttack({
		combat: removeInvisibility(combat, "enemy"),
		attackerSide: "enemy",
		rngState,
	});
}

function skipEnemyTurn(input: ResolveEnemyTurnInput, message: string): RngResult<CombatState> {
	return {
		value: appendCombatLog(input.combat, {
			turnNumber: input.combat.turnNumber,
			actor: "enemy",
			message,
			eventType: "turn_skipped",
		}),
		rngState: input.rngState,
	};
}
