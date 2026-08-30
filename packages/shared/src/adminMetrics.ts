import { z } from "zod";
import { classIdSchema, type ClassId } from "@app/content";
import type { RunMode } from "./runs";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
export const ADMIN_ENEMY_METRICS_MAX_MIN_COMBATS = 100_000;

function parseUtcDate(value: string): Date | null {
	if (!datePattern.test(value)) {
		return null;
	}
	const date = new Date(`${value}T00:00:00.000Z`);
	return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : date;
}

function formatUtcDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}

function defaultRange(): { from: string; to: string } {
	const to = new Date();
	to.setUTCHours(0, 0, 0, 0);
	const from = new Date(to);
	from.setUTCDate(from.getUTCDate() - 29);
	return { from: formatUtcDate(from), to: formatUtcDate(to) };
}

const metricsQueryFields = {
	from: z.string().optional(),
	to: z.string().optional(),
	mode: z.enum(["normal", "dailyChallenge"]).optional(),
};

type MetricsQueryInput = {
	from?: string;
	to?: string;
};

function normalizeMetricsRange(query: MetricsQueryInput, context: z.RefinementCtx) {
	const defaults = defaultRange();
	const from = query.from ?? defaults.from;
	const to = query.to ?? defaults.to;
	const fromDate = parseUtcDate(from);
	const toDate = parseUtcDate(to);

	if (!fromDate) {
		context.addIssue({ code: "custom", path: ["from"], message: "Invalid UTC date." });
		return z.NEVER;
	}
	if (!toDate) {
		context.addIssue({ code: "custom", path: ["to"], message: "Invalid UTC date." });
		return z.NEVER;
	}

	const days = Math.floor((toDate.getTime() - fromDate.getTime()) / 86_400_000) + 1;
	if (days < 1 || days > 366) {
		context.addIssue({
			code: "custom",
			message: "Date range must contain between 1 and 366 inclusive UTC dates.",
		});
		return z.NEVER;
	}

	return { from, to };
}

function createMetricsQuerySchema<Fields extends z.ZodRawShape>(fields: Fields) {
	return z.object({ ...metricsQueryFields, ...fields }).transform((query, context) => {
		const range = normalizeMetricsRange(query as MetricsQueryInput, context);
		if (range === z.NEVER) {
			return z.NEVER;
		}
		return { ...query, ...range };
	});
}

export const adminMetricsQuerySchema = createMetricsQuerySchema({});

export type AdminMetricsQuery = z.infer<typeof adminMetricsQuerySchema>;

export const adminEnemyMetricsQuerySchema = createMetricsQuerySchema({
	classId: classIdSchema.optional(),
	encounterType: z.enum(["standard", "boss", "ghost"]).optional(),
	battleFrom: z.coerce.number().int().min(1).optional(),
	battleTo: z.coerce.number().int().min(1).optional(),
	minCombats: z.coerce.number().int().min(1).max(ADMIN_ENEMY_METRICS_MAX_MIN_COMBATS).default(1),
}).refine((query) => !query.battleFrom || !query.battleTo || query.battleFrom <= query.battleTo, {
	message: "Battle range must end on or after it starts.",
});

export type AdminEnemyMetricsQuery = z.infer<typeof adminEnemyMetricsQuerySchema>;

export const adminSkillMetricsQuerySchema = createMetricsQuerySchema({
	classId: classIdSchema.optional(),
});

export type AdminSkillMetricsQuery = z.infer<typeof adminSkillMetricsQuerySchema>;

export interface AdminMetricsRange {
	from: string;
	to: string;
	mode: RunMode | null;
}

export interface AdminIdentityBreakdown {
	total: number;
	guests: number;
	registered: number;
}

export interface AdminRunOutcomeCounts {
	active: number;
	dead: number;
	retired: number;
	abandoned: number;
}

export interface AdminMetricsDailyPoint {
	date: string;
	activePlayers: number;
	newPlayers: number;
	runsStarted: number;
}

export interface AdminProgressionMilestone {
	battle: number;
	runs: number;
	percentage: number;
}

export interface AdminMetricsOverviewResponse {
	range: AdminMetricsRange;
	players: {
		active: AdminIdentityBreakdown;
		new: AdminIdentityBreakdown;
	};
	runs: {
		started: number;
		outcomes: AdminRunOutcomeCounts;
		finalBossCompletions: number;
		finalBossCompletionRate: number;
	};
	daily: AdminMetricsDailyPoint[];
	progression: AdminProgressionMilestone[];
}

export interface AdminClassMetricsRow extends AdminRunOutcomeCounts {
	classId: ClassId;
	runsStarted: number;
	pickRate: number;
	terminalRuns: number;
	deathRate: number;
	finalBossCompletions: number;
	finalBossCompletionRate: number;
	averageBattleReached: number;
	averageKills: number;
}

export interface AdminClassMetricsResponse {
	range: AdminMetricsRange;
	classes: AdminClassMetricsRow[];
}

export interface AdminRunMetricsDailyPoint extends AdminRunOutcomeCounts {
	date: string;
	runsStarted: number;
}

export interface AdminRunDepthBucket {
	label: string;
	fromBattle: number;
	toBattle: number | null;
	runs: number;
	percentage: number;
}

export interface AdminRunModeMetricsRow extends AdminRunOutcomeCounts {
	mode: RunMode;
	runsStarted: number;
	share: number;
	averageBattleReached: number;
	averageKills: number;
	finalBossCompletions: number;
	finalBossCompletionRate: number;
}

export interface AdminRunMetricsResponse {
	range: AdminMetricsRange;
	totals: AdminRunOutcomeCounts & {
		runsStarted: number;
		resolvedRuns: number;
		abandonmentRate: number;
		averageBattleReached: number;
		averageKills: number;
		finalBossCompletions: number;
		finalBossCompletionRate: number;
	};
	daily: AdminRunMetricsDailyPoint[];
	depth: AdminRunDepthBucket[];
	modes: AdminRunModeMetricsRow[];
}

export interface AdminPlayerMetricsDailyPoint {
	date: string;
	activePlayers: number;
	newPlayers: number;
	returningPlayers: number;
}

export interface AdminPlayerTypeMetricsRow {
	type: "guest" | "registered";
	activePlayers: number;
	newPlayers: number;
	returningPlayers: number;
	repeatPlayers: number;
	runsStarted: number;
	runsPerActivePlayer: number;
}

export interface AdminPlayerRetentionRow {
	day: 1 | 7 | 30;
	eligiblePlayers: number;
	returnedPlayers: number;
	rate: number;
}

export interface AdminPlayerMetricsResponse {
	range: AdminMetricsRange;
	totals: {
		activePlayers: number;
		newPlayers: number;
		returningPlayers: number;
		repeatPlayers: number;
		runsStarted: number;
		runsPerActivePlayer: number;
	};
	daily: AdminPlayerMetricsDailyPoint[];
	types: AdminPlayerTypeMetricsRow[];
	retention: AdminPlayerRetentionRow[];
}

export interface AdminEnemyMetricsRow {
	enemyId: string;
	encounterType: "standard" | "boss" | "ghost";
	combats: number;
	victories: number;
	defeats: number;
	winRate: number;
	averageTurns: number;
}

export interface AdminEnemyMetricsResponse {
	range: AdminMetricsRange;
	enemies: AdminEnemyMetricsRow[];
}

export interface AdminSkillMetricsRow {
	skillId: string;
	uses: number;
	usageShare: number;
	runs: number;
	combats: number;
	averageUsesPerRun: number;
	averageBattle: number;
	averageTurn: number;
	resolvedCombats: number;
	combatWins: number;
	combatWinRate: number;
}

export interface AdminSkillMetricsResponse {
	range: AdminMetricsRange;
	skills: AdminSkillMetricsRow[];
}
