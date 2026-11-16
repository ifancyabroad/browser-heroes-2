import type { AdminActivityEvent } from "@app/shared";

export const activityGroups = [
	"Battles",
	"Purchases",
	"Level-ups",
	"Hero lifecycle",
	"Rests",
	"Legendary rewards",
] as const;
export type ActivityGroup = (typeof activityGroups)[number];

export function activityGroup(event: AdminActivityEvent): ActivityGroup {
	switch (event.type) {
		case "battle_result":
			return "Battles";
		case "item_purchased":
		case "potions_purchased":
			return "Purchases";
		case "level_up":
			return "Level-ups";
		case "hero_created":
		case "hero_retired":
			return "Hero lifecycle";
		case "hero_rested":
			return "Rests";
		case "legendary_reward":
			return "Legendary rewards";
	}
}

export function describeActivity(event: AdminActivityEvent): { text: string; tone: string } {
	switch (event.type) {
		case "hero_created":
			return { text: "began an adventure", tone: "" };
		case "battle_result":
			return {
				text: `${event.outcome === "defeat" ? "was slain by" : event.encounterType === "ghost" ? "banished" : "defeated"} ${event.enemyName} — battle ${event.battleNumber}${event.encounterType === "boss" ? " · boss" : event.encounterType === "ghost" ? " · ghost" : ""}${event.finalBoss ? " · final boss victory" : ""}`,
				tone:
					event.outcome === "defeat"
						? "activity-danger"
						: event.encounterType !== "standard"
							? "activity-highlight"
							: "",
			};
		case "item_purchased":
			return {
				text: `bought ${event.itemName} (${event.rarity}) for ${event.price} gold`,
				tone: event.rarity === "legendary" ? "activity-highlight" : "",
			};
		case "potions_purchased":
			return {
				text: `bought ${event.quantity} healing potion${event.quantity === 1 ? "" : "s"} for ${event.cost} gold`,
				tone: "",
			};
		case "level_up":
			return {
				text: `reached level ${event.level}${event.selection ? ` · ${event.selection.type}: ${event.selection.name}` : ""}`,
				tone: "",
			};
		case "legendary_reward":
			return {
				text: `claimed legendary reward ${event.itemName}`,
				tone: "activity-highlight",
			};
		case "hero_rested":
			return { text: `rested in town to begin day ${event.day}`, tone: "" };
		case "hero_retired":
			return { text: "retired victorious", tone: "activity-success" };
	}
}
