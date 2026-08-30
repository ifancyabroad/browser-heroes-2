import { classIdSchema, type ClassId } from "@app/content";
import { z } from "zod";
import type { RunMode, RunSlainByView } from "./runs";

const hallOfFameQueryFields = {
	classId: classIdSchema.optional(),
	userOnly: z.enum(["true", "false"]).optional(),
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
};

export const getHeroHallOfFameQuerySchema = z.object(hallOfFameQueryFields);
export const getGhostHallOfFameQuerySchema = z.object(hallOfFameQueryFields);

export type GetHeroHallOfFameQuery = z.infer<typeof getHeroHallOfFameQuerySchema>;
export type GetGhostHallOfFameQuery = z.infer<typeof getGhostHallOfFameQuerySchema>;

export interface HeroHallOfFameEntryView {
	rank: number;
	runId: string;
	heroName: string;
	classId: ClassId;
	level: number;
	zoneNumber: number;
	day: number;
	kills: number;
	status: "dead" | "retired";
	mode: RunMode;
	slainBy: RunSlainByView | null;
	completedAt: string;
	isCurrentUser: boolean;
}

export interface GhostHallOfFameEntryView {
	rank: number;
	ghostId: string;
	name: string;
	classId: ClassId;
	heroLevel: number;
	kills: number;
	status: "active" | "banished";
	encounters: number;
	winRate: number;
	isCurrentUser: boolean;
}

export interface HallOfFameResponse<TEntry> {
	entries: TEntry[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export type GetHeroHallOfFameResponse = HallOfFameResponse<HeroHallOfFameEntryView>;
export type GetGhostHallOfFameResponse = HallOfFameResponse<GhostHallOfFameEntryView>;
