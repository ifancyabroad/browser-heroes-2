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
			return { text: "is ready for adventure!", colour: "text-info" };

		case "hero_died":
			return {
				text: `was slain by ${enemyArticle}${event.enemyName} (battle ${event.battleNumber})`,
				colour: "text-error",
			};

		case "boss_defeated":
			return event.finalBoss
				? {
						text: `defeated ${event.enemyName} and completed all 100 battles!`,
						colour: "text-primary",
						trophy: true,
					}
				: {
						text: `defeated ${event.enemyName} (battle ${event.battleNumber})`,
						colour: "text-text",
					};

		case "ghost_banished":
			return { text: `banished ${event.enemyName}`, colour: "text-[#b8a9e8]" };

		case "legendary_acquired":
			return { text: `acquired ${event.itemName}`, colour: "text-legendary" };

		case "hero_rested":
			return {
				text: `rested in town to begin day ${event.day}`,
				colour: "text-text",
			};

		case "hero_retired":
			return { text: "retired victorious", colour: "text-success" };
	}
}
