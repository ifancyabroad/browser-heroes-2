import { classIdSchema, type ClassId } from "@app/content";
import {
	engineActionSchema,
	type EngineAction,
	type EngineResult,
	type HeroState,
	type RunState,
} from "@app/engine";
import { z } from "zod";
import type { AchievementUnlockView } from "./achievements";
import { HERO_NAME_MAX_LENGTH } from "./heroNames";

export const runModes = ["normal", "dailyChallenge"] as const;
export const runModeSchema = z.enum(runModes);
export type RunMode = z.infer<typeof runModeSchema>;

export const createRunBodySchema = z.object({
	heroName: z.string().trim().min(1).max(HERO_NAME_MAX_LENGTH),
	classId: classIdSchema,
});

export type CreateRunBody = z.infer<typeof createRunBodySchema>;

export type RunStatus = "active" | "dead" | "retired" | "abandoned";

export interface RunSlainByView {
	sourceId: string;
	name: string;
	encounterType: "standard" | "boss" | "ghost";
}

export interface RunSummaryView {
	heroName: string;
	classId: ClassId;
	level: number;
	battleNumber: number;
	zoneNumber: number;
	endlessCycle: number;
	day: number;
	kills: number;
	hasDefeatedFinalBoss: boolean;
	slainBy: RunSlainByView | null;
}

export interface RunView {
	id: string;
	mode: RunMode;
	dailyChallengeDate: string | null;
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

export interface RunHeroView {
	displayName: string | null;
	hero: HeroState;
	run: {
		status: "dead" | "retired";
		battleNumber: number;
		zoneNumber: number;
		endlessCycle: number;
		day: number;
		kills: number;
		gold: number;
		streak: number;
		hasDefeatedFinalBoss: boolean;
		slainBy: RunSlainByView | null;
	};
}

export type GetRunHeroResponse = RunHeroView;

export interface ApiErrorResponse {
	error: string;
	message?: string;
	details?: unknown;
}

export type ApplyRunActionBody = {
	action: EngineAction;
};

export const applyRunActionBodySchema: z.ZodType<ApplyRunActionBody> = z.object({
	action: engineActionSchema,
});

export interface ApplyRunActionResponse {
	run: RunView;
	result: EngineResult;
	unlockedAchievements: AchievementUnlockView[];
}

export type RunActionPayload = {
	runId: string;
	action: EngineAction;
};

export const runActionPayloadSchema: z.ZodType<RunActionPayload> = z.object({
	runId: z.string().nonempty(),
	action: engineActionSchema,
});

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
