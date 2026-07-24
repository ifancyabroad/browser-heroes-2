import type { CombatStat } from "@app/content";

import type { ActiveStatModifier, CombatantState } from "../../../schemas";

export function getEffectiveCombatStatValue(combatant: CombatantState, stat: CombatStat): number {
	const modifiers = combatant.activeEffects.filter(
		(effect): effect is ActiveStatModifier =>
			effect.type === "modifyStat" && effect.stat === stat,
	);

	return modifiers.reduce(
		(value, modifier) => value + modifier.value,
		combatant.combatStats[stat],
	);
}
