import { classIdSchema, type ClassId } from "@app/content";
import { z } from "zod";

export const historySortDirectionSchema = z.enum(["asc", "desc"]);

export const runHistorySortSchema = z.enum([
	"completedAt",
	"createdAt",
	"battleNumber",
	"endlessCycle",
	"day",
	"kills",
	"level",
	"heroName",
]);

export const getRunHistoryQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	classId: classIdSchema.optional(),
	search: z.string().trim().min(1).max(64).optional(),
	sort: runHistorySortSchema.default("completedAt"),
	direction: historySortDirectionSchema.default("desc"),
});

export type GetRunHistoryQuery = z.infer<typeof getRunHistoryQuerySchema>;

export interface RunHistoryEntryView {
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

export interface GetRunHistoryResponse {
	entries: RunHistoryEntryView[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export const ghostHistorySortSchema = z.enum([
	"createdAt",
	"updatedAt",
	"kills",
	"deaths",
	"encounters",
	"heroLevel",
	"encounterLevel",
	"name",
]);

export const getGhostHistoryQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	classId: classIdSchema.optional(),
	search: z.string().trim().min(1).max(64).optional(),
	sort: ghostHistorySortSchema.default("createdAt"),
	direction: historySortDirectionSchema.default("desc"),
});

export type GetGhostHistoryQuery = z.infer<typeof getGhostHistoryQuerySchema>;

export interface GhostHistoryEntryView {
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

export interface GetGhostHistoryResponse {
	entries: GhostHistoryEntryView[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}
