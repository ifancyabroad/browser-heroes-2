import { classIdSchema, type ClassId } from "@app/content";
import { z } from "zod";

export const statsSortDirectionSchema = z.enum(["asc", "desc"]);

export const runStatsSortSchema = z.enum([
	"completedAt",
	"createdAt",
	"battleNumber",
	"endlessCycle",
	"day",
	"kills",
	"level",
	"heroName",
]);

export const getRunStatsQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	classId: classIdSchema.optional(),
	search: z.string().trim().min(1).max(64).optional(),
	sort: runStatsSortSchema.default("completedAt"),
	direction: statsSortDirectionSchema.default("desc"),
});

export type GetRunStatsQuery = z.infer<typeof getRunStatsQuerySchema>;

export interface RunStatsEntryView {
	runId: string;
	heroName: string;
	classId: ClassId;
	level: number;
	battleNumber: number;
	zoneNumber: number;
	endlessCycle: number;
	day: number;
	kills: number;
	status: "dead" | "retired";
	createdAt: string;
	completedAt: string;
}

export interface GetRunStatsResponse {
	entries: RunStatsEntryView[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export const ghostStatsSortSchema = z.enum([
	"createdAt",
	"updatedAt",
	"kills",
	"deaths",
	"encounters",
	"heroLevel",
	"encounterLevel",
	"name",
]);

export const getGhostStatsQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	classId: classIdSchema.optional(),
	search: z.string().trim().min(1).max(64).optional(),
	sort: ghostStatsSortSchema.default("createdAt"),
	direction: statsSortDirectionSchema.default("desc"),
});

export type GetGhostStatsQuery = z.infer<typeof getGhostStatsQuerySchema>;

export interface GhostStatsEntryView {
	ghostId: string;
	sourceRunId: string;
	name: string;
	classId: ClassId;
	heroLevel: number;
	encounterLevel: number;
	kills: number;
	deaths: number;
	encounters: number;
	winRate: number;
	createdAt: string;
	updatedAt: string;
}

export interface GetGhostStatsResponse {
	entries: GhostStatsEntryView[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface UserStatsSummaryView {
	runs: {
		total: number;
		dead: number;
		retired: number;
		wins: number;
		bestBattleNumber: number;
		bestZoneNumber: number;
		bestEndlessCycle: number;
		bestDay: number;
		totalKills: number;
	};

	ghosts: {
		total: number;
		kills: number;
		deaths: number;
		encounters: number;
		winRate: number;
	};
}

export interface GetUserStatsSummaryResponse {
	summary: UserStatsSummaryView;
}
