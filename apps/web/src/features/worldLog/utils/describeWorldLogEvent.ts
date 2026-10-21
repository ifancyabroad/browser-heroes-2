import type { WorldLogEntry } from "@app/shared";

export function describeWorldLogEvent(entry: WorldLogEntry): {
	text: string;
	colour: string;
	trophy?: boolean;
} {
	const event = entry.event;
	const enemyArticle =
		event.type === "hero_died" && event.encounterType === "standard"
			? /^[aeiou]/i.test(event.enemyName)
				? "an "
				: "a "
			: "";

	switch (event.type) {
		case "hero_created":
			return { text: "began a new adventure.", colour: "text-text" };

		case "hero_died":
			return {
				text: `was slain by ${enemyArticle}${event.enemyName} (${event.battleNumber}).`,
				colour: "text-error",
			};

		case "boss_defeated":
			return event.finalBoss
				? {
						text: `defeated ${event.enemyName} and conquered battle 100!`,
						colour: "text-primary",
						trophy: true,
					}
				: {
						text: `defeated ${event.enemyName} (${event.battleNumber}).`,
						colour: "text-text",
					};

		case "ghost_banished":
			return { text: `banished ${event.enemyName}.`, colour: "text-text" };

		case "legendary_acquired":
			return { text: `acquired ${event.itemName}.`, colour: "text-legendary" };

		case "hero_rested":
			return {
				text: `rested in town to begin day ${event.day}.`,
				colour: "text-text",
			};

		case "hero_retired":
			return { text: "retired victorious.", colour: "text-primary", trophy: true };
	}
}
