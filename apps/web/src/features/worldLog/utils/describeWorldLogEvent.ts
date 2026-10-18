import type { WorldLogEntry } from "@app/shared";

export function describeWorldLogEvent(entry: WorldLogEntry): {
	text: string;
	colour: string;
	trophy?: boolean;
} {
	const event = entry.event;

	switch (event.type) {
		case "hero_created":
			return { text: "began a new adventure.", colour: "text-text" };

		case "hero_died":
			return {
				text: event.enemyName
					? `was slain by ${event.enemyName} in battle ${event.battleNumber}.`
					: `fell in battle ${event.battleNumber}.`,
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
						text: `defeated ${event.enemyName} in battle ${event.battleNumber}.`,
						colour: "text-success",
					};

		case "legendary_acquired":
			return { text: `acquired ${event.itemName}.`, colour: "text-legendary" };

		case "hero_rested":
			return {
				text: `rested in town and began day ${event.day}.`,
				colour: "text-text",
			};

		case "hero_retired":
			return { text: "retired victorious.", colour: "text-primary", trophy: true };
	}
}
