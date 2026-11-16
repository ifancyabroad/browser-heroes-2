import { FEATS_BY_ID, SKILLS_BY_ID } from "@app/content";
import type { EngineEvent, RunState } from "@app/engine";
import type { AdminActivityEvent } from "@app/shared";

export function toAdminActivityEvent(
	event: EngineEvent,
	state: RunState,
): AdminActivityEvent | null {
	switch (event.type) {
		case "RUN_STARTED":
			return { type: "hero_created" };
		case "COMBAT_ENDED":
			return {
				type: "battle_result",
				outcome: event.outcome,
				enemyName: state.combat!.enemy.name,
				battleNumber: event.battleNumber,
				encounterType: event.encounterType,
				finalBoss: event.outcome === "victory" && event.defeatedFinalBoss,
			};
		case "ITEM_BOUGHT":
			return {
				type: "item_purchased",
				itemName: event.item.itemName,
				rarity: event.item.rarity,
				price: event.price,
			};
		case "HEALING_POTION_BOUGHT":
			return { type: "potions_purchased", quantity: event.quantity, cost: event.cost };
		case "LEVEL_UP_COMPLETED":
			return {
				type: "level_up",
				level: event.level,
				selection: event.selection
					? {
							type: event.selection.type,
							name:
								event.selection.type === "skill"
									? SKILLS_BY_ID[event.selection.skillId].name
									: FEATS_BY_ID[event.selection.featId].name,
						}
					: null,
			};
		case "REWARD_SELECTED":
			return event.rewardType === "item" && event.item.rarity === "legendary"
				? { type: "legendary_reward", itemName: event.item.itemName }
				: null;
		case "RESTED_AT_TOWN":
			return { type: "hero_rested", day: state.day };
		case "RUN_RETIRED":
			return { type: "hero_retired" };
		default:
			return null;
	}
}
