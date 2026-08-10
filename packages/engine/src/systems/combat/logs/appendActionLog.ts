import type { CombatLogEntry, CombatState } from "../../../schemas";

import type { ActionOutcome } from "./actionOutcome";
import { appendCombatLog } from "./appendCombatLog";
import { formatActionOutcome } from "./formatActionLog";

type ActionEventType = "skill_used" | "basic_attack";

export function appendActionLog(input: {
	combat: CombatState;
	actor: CombatLogEntry["actor"];
	heading: string;
	eventType: ActionEventType;
	outcomes: ActionOutcome[];
}): CombatState {
	let combat = appendCombatLog(input.combat, {
		turnNumber: input.combat.turnNumber,
		actor: input.actor,
		message: input.heading,
		eventType: input.eventType,
	});

	for (const outcome of input.outcomes) {
		combat = appendCombatLog(combat, {
			turnNumber: input.combat.turnNumber,
			actor: input.actor,
			...formatActionOutcome(outcome),
		});
	}

	return combat;
}
