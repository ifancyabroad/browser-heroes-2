import { ENEMIES_BY_ID, type Enemy, type EnemyId } from "@app/content";

export function getEnemyDefinition(sourceId: string): Enemy | null {
	if (Object.prototype.hasOwnProperty.call(ENEMIES_BY_ID, sourceId)) {
		return ENEMIES_BY_ID[sourceId as EnemyId];
	}

	return null;
}

export function formatTitle(value: string) {
	return value
		.split("_")
		.join(" ")
		.replace(/\b\w/g, (character) => character.toUpperCase());
}
