import { classIdSchema, type ClassId } from "@app/content";
import { z } from "zod";

export const leaderboardScopeSchema = z.enum(["overall", "daily"]);

export const getRunLeaderboardQuerySchema = z
	.object({
		scope: leaderboardScopeSchema.default("overall"),
		date: z.iso.date().optional(),
		classId: classIdSchema.optional(),
		userOnly: z.enum(["true", "false"]).optional(),
		page: z.coerce.number().int().min(1).default(1),
		limit: z.coerce.number().int().min(1).max(100).default(20),
	})
	.refine((query) => query.scope !== "daily" || Boolean(query.date), {
		message: "Daily leaderboards require a date.",
		path: ["date"],
	});

export type LeaderboardScope = z.infer<typeof leaderboardScopeSchema>;

export type GetRunLeaderboardQuery = z.infer<typeof getRunLeaderboardQuerySchema>;

export interface RunLeaderboardEntryView {
	rank: number;
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
	completedAt: string;
	isCurrentUser: boolean;
}

export interface GetRunLeaderboardResponse {
	entries: RunLeaderboardEntryView[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export const getGhostLeaderboardQuerySchema = z.object({
	classId: classIdSchema.optional(),
	userOnly: z.enum(["true", "false"]).optional(),
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type GetGhostLeaderboardQuery = z.infer<typeof getGhostLeaderboardQuerySchema>;

export interface GhostLeaderboardEntryView {
	rank: number;
	ghostId: string;
	name: string;
	classId: ClassId;
	heroLevel: number;
	encounterLevel: number;
	kills: number;
	deaths: number;
	encounters: number;
	winRate: number;
	createdAt: string;
	isCurrentUser: boolean;
}

export interface GetGhostLeaderboardResponse {
	entries: GhostLeaderboardEntryView[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}
