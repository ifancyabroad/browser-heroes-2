import { classIdSchema, type ClassId } from "@app/content";
import { engineActionSchema, type RunState } from "@app/engine";
import { z } from "zod";

export const createRunBodySchema = z.object({
	heroName: z.string().trim().min(1).max(32),
	classId: classIdSchema,
});

export type CreateRunBody = z.infer<typeof createRunBodySchema>;

export type RunStatus = "active" | "dead" | "victory" | "abandoned";

export interface RunSummaryView {
	heroName: string;
	classId: ClassId;
	level: number;
	battleNumber: number;
	zoneNumber: number;
}

export interface RunView {
	id: string;
	status: RunStatus;
	summary: RunSummaryView;
	state: RunState;
	createdAt: string;
	updatedAt: string;
	completedAt: string | null;
}

export interface CreateRunResponse {
	run: RunView;
}

export interface CurrentRunResponse {
	run: RunView | null;
}

export interface GetRunResponse {
	run: RunView;
}

export interface ApiErrorResponse {
	error: string;
	message?: string;
	details?: unknown;
}

export const applyRunActionBodySchema = z.object({
	action: engineActionSchema,
});

export type ApplyRunActionBody = z.infer<typeof applyRunActionBodySchema>;
