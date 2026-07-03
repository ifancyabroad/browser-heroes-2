import type { StatusEffect } from "@app/content";

import type { CombatantState } from "../../../schemas";

export function hasActiveStatus(combatant: CombatantState, statusId: StatusEffect): boolean {
	return combatant.activeEffects.some(
		(effect) => effect.type === "status" && effect.statusId === statusId,
	);
}
