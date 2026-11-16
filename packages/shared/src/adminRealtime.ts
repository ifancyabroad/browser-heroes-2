import type { ClassId, Rarity, Zone } from "@app/content";
import { z } from "zod";
import { runModeSchema, type RunMode } from "./runs";

export const ADMIN_ACTIVITY_LIMIT = 500;
export const ADMIN_HERO_ACTIVITY_WINDOW_MS = 5 * 60 * 1000;
export const ADMIN_REALTIME_NAMESPACE = "/admin-realtime";
export const ADMIN_ACTIVITY_EVENT = "admin-activity:entry";

export const adminRealtimeQuerySchema = z.object({ mode: runModeSchema.optional() });

export type AdminActivityEvent =
	| { type: "hero_created" }
	| {
			type: "battle_result";
			outcome: "victory" | "defeat";
			enemyName: string;
			battleNumber: number;
			encounterType: "standard" | "boss" | "ghost";
			finalBoss: boolean;
	  }
	| { type: "item_purchased"; itemName: string; rarity: Rarity; price: number }
	| { type: "potions_purchased"; quantity: number; cost: number }
	| {
			type: "level_up";
			level: number;
			selection: { type: "skill" | "feat"; name: string } | null;
	  }
	| { type: "legendary_reward"; itemName: string }
	| { type: "hero_rested"; day: number }
	| { type: "hero_retired" };

export interface AdminActivityEntry {
	id: string;
	createdAt: string;
	runId: string;
	heroName: string;
	classId: ClassId;
	mode: RunMode;
	displayName: string | null;
	event: AdminActivityEvent;
}

export interface AdminActiveHero {
	runId: string;
	heroName: string;
	displayName: string | null;
	classId: ClassId;
	level: number;
	battleNumber: number;
	zone: Zone;
	mode: RunMode;
	lastActivityAt: string;
}

export interface AdminActivityResponse {
	entries: AdminActivityEntry[];
}
export interface AdminActiveHeroesResponse {
	heroes: AdminActiveHero[];
}
