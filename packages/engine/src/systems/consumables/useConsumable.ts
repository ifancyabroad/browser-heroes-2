import { CONSUMABLES_BY_ID, type ConsumableId } from "@app/content";
import type { CombatState, EngineEvent, RunState } from "../../schemas";
import { resolveConsumableEffect } from "./resolveConsumableEffect";
import { appendActionLog } from "../combat/logs/appendActionLog";

export function useConsumable(
	state: RunState & { combat: CombatState },
	consumableType: ConsumableId,
): { state: RunState & { combat: CombatState }; events: EngineEvent[] } {
	const definition = CONSUMABLES_BY_ID[consumableType];
	const result = resolveConsumableEffect(state.combat, definition);
	const remainingQuantity = state.hero.consumables[consumableType] - 1;

	return {
		state: {
			...state,
			combat: appendActionLog({
				combat: result.combat,
				actor: "player",
				heading: `${state.combat.player.name} uses ${definition.name}.`,
				eventType: "consumable_used",
				outcomes: result.outcomes,
			}),
			hero: {
				...state.hero,
				consumables: { ...state.hero.consumables, [consumableType]: remainingQuantity },
			},
		},
		events: [
			{
				type: "CONSUMABLE_USED",
				consumableType,
				remainingQuantity,
			},
		],
	};
}
