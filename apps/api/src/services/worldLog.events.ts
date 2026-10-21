import type { EngineEvent, RunState } from "@app/engine";
import type { WorldLogEvent } from "@app/shared";

export function mapWorldLogEvents(
	events: readonly EngineEvent[],
	state: RunState,
): { index: number; event: WorldLogEvent }[] {
	return events.flatMap((event, index) => {
		const mapped = toWorldLogEvent(event, state);

		return mapped ? [{ index, event: mapped }] : [];
	});
}

export function toWorldLogEvent(event: EngineEvent, state: RunState): WorldLogEvent | null {
	switch (event.type) {
		case "RUN_STARTED":
			return { type: "hero_created" };

		case "COMBAT_ENDED":
			if (event.outcome === "defeat") {
				return {
					type: "hero_died",
					battleNumber: event.battleNumber,
					enemyName: state.combat!.enemy.name,
					encounterType: event.encounterType,
				};
			}

			if (event.encounterType === "ghost") {
				return { type: "ghost_banished", enemyName: state.combat!.enemy.name };
			}

			return event.encounterType === "boss"
				? {
						type: "boss_defeated",
						battleNumber: event.battleNumber,
						enemyName: state.combat!.enemy.name,
						finalBoss: event.defeatedFinalBoss,
					}
				: null;

		case "ITEM_BOUGHT":
		case "REWARD_SELECTED":
			return "item" in event && event.item.rarity === "legendary"
				? { type: "legendary_acquired", itemName: event.item.itemName }
				: null;

		case "RESTED_AT_TOWN":
			return { type: "hero_rested", day: state.day };

		case "RUN_RETIRED":
			return { type: "hero_retired" };

		default:
			return null;
	}
}
