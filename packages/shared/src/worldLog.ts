import type { ClassId } from "@app/content";
import type { RunMode } from "./runs";

export const WORLD_LOG_LIMIT = 50;

export type WorldLogEvent =
	| { type: "hero_created" }
	| { type: "hero_died"; battleNumber: number; enemyName?: string }
	| { type: "boss_defeated"; battleNumber: number; enemyName: string; finalBoss: boolean }
	| { type: "legendary_acquired"; itemName: string }
	| { type: "hero_rested" }
	| { type: "hero_retired" };

export type WorldLogEntry = {
	id: string;
	createdAt: string;
	heroName: string;
	classId: ClassId;
	displayName: string | null;
	mode: RunMode;
	event: WorldLogEvent;
};

export type GetWorldLogResponse = { entries: WorldLogEntry[] };
