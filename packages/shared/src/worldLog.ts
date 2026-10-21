import type { ClassId } from "@app/content";
import type { RunMode } from "./runs";

export const WORLD_LOG_LIMIT = 50;

export type WorldLogEvent =
	| { type: "hero_created" }
	| {
			type: "hero_died";
			battleNumber: number;
			enemyName: string;
			encounterType: "standard" | "boss" | "ghost";
	  }
	| { type: "boss_defeated"; battleNumber: number; enemyName: string; finalBoss: boolean }
	| { type: "ghost_banished"; enemyName: string }
	| { type: "legendary_acquired"; itemName: string }
	| { type: "hero_rested"; day: number }
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
