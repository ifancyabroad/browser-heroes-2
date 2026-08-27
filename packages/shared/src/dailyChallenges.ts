import type { ClassId } from "@app/content";
import { z } from "zod";
import { HERO_NAME_MAX_LENGTH } from "./heroNames";
import type { RunSlainByView, RunStatus, RunView } from "./runs";

export const dailyChallengeDateSchema = z.iso.date();

export const challengeLeaderboardQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const startChallengeBodySchema = z.object({
	heroName: z.string().trim().min(1).max(HERO_NAME_MAX_LENGTH),
});

export type ChallengeLeaderboardQuery = z.infer<typeof challengeLeaderboardQuerySchema>;
export type StartChallengeBody = z.infer<typeof startChallengeBodySchema>;

export interface ChallengeEntryView {
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
	slainBy: RunSlainByView | null;
	completedAt: string;
	isCurrentUser: boolean;
}

export interface ChallengeAttemptView {
	runId: string;
	status: RunStatus;
	rankedEntry: ChallengeEntryView | null;
}

export interface ChallengeSummaryView {
	date: string;
	classId: ClassId;
	attemptCount: number;
	leader: ChallengeEntryView | null;
	attempt: ChallengeAttemptView | null;
	canStart: boolean;
}

export interface GetChallengeSummaryResponse {
	challenge: ChallengeSummaryView;
}

export interface GetChallengeLeaderboardResponse {
	challenge: Pick<ChallengeSummaryView, "date" | "classId">;
	currentUserEntry: ChallengeEntryView | null;
	entries: ChallengeEntryView[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface StartChallengeResponse {
	run: RunView;
}
