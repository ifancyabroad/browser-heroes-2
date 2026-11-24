import { CONSUMABLES_BY_ID, type ConsumableId } from "@app/content";
import type { CombatState, EngineEvent, RunState } from "../../schemas";
import { resolveConsumableEffect } from "./resolveConsumableEffect";

export function useConsumable(
	state: RunState & { combat: CombatState },
	consumableType: ConsumableId,
): { state: RunState & { combat: CombatState }; events: EngineEvent[] } {
	const result = resolveConsumableEffect(state.combat, CONSUMABLES_BY_ID[consumableType]);
	const remainingQuantity = state.hero.consumables[consumableType] - 1;

	return {
		state: {
			...state,
			combat: result.combat,
			hero: {
				...state.hero,
				consumables: { ...state.hero.consumables, [consumableType]: remainingQuantity },
			},
		},
		events: [
			{
				type: "HEALING_POTION_USED",
				amount: result.amount,
				remainingPotions: remainingQuantity,
			},
		],
	};
}
