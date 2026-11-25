import type { CombatantState } from "../../../schemas";
import { hasActiveStatus } from "../effects/statuses/hasActiveStatus";

export function canTargetCombatant(actor: CombatantState, target: CombatantState): boolean {
	return actor.side === target.side || !hasActiveStatus(target, "invisible");
}
