import type { CombatantSide, CombatState } from "../../../../schemas";
import { getCombatant, replaceCombatant } from "../../combatants/combatantSelectors";
import { appendCombatLog } from "../../logs/appendCombatLog";
import { hasActiveStatus } from "../statuses/hasActiveStatus";

export function removeInvisibility(combat: CombatState, side: CombatantSide): CombatState {
	const combatant = getCombatant(combat, side);
	if (!hasActiveStatus(combatant, "invisible")) {
		return combat;
	}

	return appendCombatLog(
		replaceCombatant(combat, {
			...combatant,
			activeEffects: combatant.activeEffects.filter(
				(effect) => effect.type !== "status" || effect.statusId !== "invisible",
			),
		}),
		{
			turnNumber: combat.turnNumber,
			actor: side,
			message: `Invisibility ends on ${combatant.name}.`,
			eventType: "effect_expired",
		},
	);
}
