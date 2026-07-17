import { classIdSchema, type ClassId } from "@app/content";
import { engineActionSchema, type EngineResult, type RunState } from "@app/engine";
import { z } from "zod";
import { HERO_NAME_MAX_LENGTH } from "./heroNames";

export const createRunBodySchema = z.object({
	heroName: z.string().trim().min(1).max(HERO_NAME_MAX_LENGTH),
	classId: classIdSchema,
});

export type CreateRunBody = z.infer<typeof createRunBodySchema>;

export type RunStatus = "active" | "dead" | "retired" | "abandoned";

export interface RunSummaryView {
	heroName: string;
	classId: ClassId;
	level: number;
	battleNumber: number;
	zoneNumber: number;
	endlessCycle: number;
	day: number;
	kills: number;
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

export interface ApplyRunActionResponse {
	run: RunView;
	result: EngineResult;
}

export const runActionPayloadSchema = z.object({
	runId: z.string().nonempty(),
	action: engineActionSchema,
});

export type RunActionPayload = z.infer<typeof runActionPayloadSchema>;

export type SocketResponse<T> =
	| {
			ok: true;
			data: T;
	  }
	| {
			ok: false;
			error: string;
	  };

export type RunActionResponse = SocketResponse<ApplyRunActionResponse>;
