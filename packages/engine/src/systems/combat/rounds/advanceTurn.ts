import { SKILLS_BY_ID } from "@app/content";

import type {
	ActiveCombatEffect,
	CombatantSide,
	CombatantState,
	CombatState,
} from "../../../schemas";

import { advanceActiveEffects } from "../effects/advanceActiveEffects";
import { appendCombatLog } from "../logs/appendCombatLog";

export function advanceTurn(combat: CombatState): CombatState {
	const playerResult = advanceActiveEffects(combat.player);

	const enemyResult = advanceActiveEffects(combat.enemy);

	let nextCombat: CombatState = {
		...combat,
		turnNumber: combat.turnNumber + 1,
		activeActor: "player",
		player: playerResult.combatant,
		enemy: enemyResult.combatant,
	};

	nextCombat = appendExpiredEffectLogs({
		combat: nextCombat,
		combatant: playerResult.combatant,
		actorSide: "player",
		expiredEffects: playerResult.expiredEffects,
		logTurnNumber: combat.turnNumber,
	});

	nextCombat = appendExpiredEffectLogs({
		combat: nextCombat,
		combatant: enemyResult.combatant,
		actorSide: "enemy",
		expiredEffects: enemyResult.expiredEffects,
		logTurnNumber: combat.turnNumber,
	});

	return nextCombat;
}

type AppendExpiredEffectLogsInput = {
	combat: CombatState;
	combatant: CombatantState;
	actorSide: CombatantSide;
	expiredEffects: ActiveCombatEffect[];
	logTurnNumber: number;
};

function appendExpiredEffectLogs(input: AppendExpiredEffectLogsInput): CombatState {
	let combat = input.combat;

	for (const expiredEffect of getUniqueExpiredSkillEffects(input.expiredEffects)) {
		const stillActive = input.combatant.activeEffects.some(
			(activeEffect) =>
				activeEffect.sourceCombatantId === expiredEffect.sourceCombatantId &&
				activeEffect.sourceSkillId === expiredEffect.sourceSkillId,
		);

		if (stillActive) {
			continue;
		}

		const skill = SKILLS_BY_ID[expiredEffect.sourceSkillId];

		combat = appendCombatLog(combat, {
			turnNumber: input.logTurnNumber,
			actor: input.actorSide,
			message: `${skill.name} expires on ` + `${input.combatant.name}.`,
			eventType: "effect_expired",
		});
	}

	return combat;
}

function getUniqueExpiredSkillEffects(effects: ActiveCombatEffect[]): ActiveCombatEffect[] {
	return effects.filter(
		(effect, index) =>
			effects.findIndex(
				(candidate) =>
					candidate.sourceCombatantId === effect.sourceCombatantId &&
					candidate.sourceSkillId === effect.sourceSkillId,
			) === index,
	);
}
