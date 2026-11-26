import { CONSUMABLES_BY_ID, type ConsumableId } from "@app/content";
import type { CombatState, EngineEvent, RunState } from "../../schemas";
import { resolveConsumableEffects } from "./resolveConsumableEffects";
import { appendActionLog } from "../combat/logs/appendActionLog";

export function useConsumable(
	state: RunState & { combat: CombatState },
	consumableType: ConsumableId,
): { state: RunState & { combat: CombatState }; events: EngineEvent[] } {
	const definition = CONSUMABLES_BY_ID[consumableType];
	const result = resolveConsumableEffects(state.combat, definition, state.rngState);
	const remainingQuantity = state.hero.consumables[consumableType] - 1;

	return {
		state: {
			...state,
			rngState: result.rngState,
			combat: appendActionLog({
				combat: result.value.combat,
				actor: "player",
				heading: `${state.combat.player.name} uses ${definition.name}.`,
				eventType: "consumable_used",
				outcomes: result.value.outcomes,
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
