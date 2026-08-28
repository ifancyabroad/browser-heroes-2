import { z } from "zod";
import type { ClassId } from "@app/content";
import type { RunMode } from "./runs";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

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

export const adminMetricsQuerySchema = z
	.object({
		from: z.string().optional(),
		to: z.string().optional(),
		mode: z.enum(["normal", "dailyChallenge"]).optional(),
	})
	.transform((query, context) => {
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

		return { from, to, mode: query.mode };
	});

export type AdminMetricsQuery = z.infer<typeof adminMetricsQuerySchema>;

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
