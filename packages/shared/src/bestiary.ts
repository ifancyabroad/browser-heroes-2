import type { EnemyId } from "@app/content";

export interface BestiaryEntryView {
	enemyId: EnemyId;
	encounters: number;
	victories: number;
	deaths: number;
}

export interface GetBestiaryResponse {
	entries: BestiaryEntryView[];
}
