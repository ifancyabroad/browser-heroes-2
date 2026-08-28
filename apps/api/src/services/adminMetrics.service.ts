import { classIds, type ClassId } from "@app/content";
import type {
	AdminClassMetricsResponse,
	AdminEnemyMetricsResponse,
	AdminMetricsOverviewResponse,
	AdminMetricsQuery,
	AdminRunOutcomeCounts,
	AdminSkillMetricsResponse,
} from "@app/shared";
import { RunActionModel } from "../models/runAction.model";
import { RunModel } from "../models/run.model";
import { UserModel } from "../models/user.model";
import type { PipelineStage } from "mongoose";

type IdentityType = "guest" | "registered";
type RunStatus = keyof AdminRunOutcomeCounts;
type CohortRun = {
	classId: ClassId;
	status: RunStatus;
	battleNumber: number;
	kills: number;
	hasDefeatedFinalBoss: boolean;
};
type CountByType = { _id: IdentityType; count: number };
type DailyCount = { _id: string; count: number };
type DailyActivity = { _id: string; userIds: unknown[] };
type EnemyMetricsAggregate = {
	_id: {
		enemyId: string;
		encounterType: "standard" | "boss" | "ghost";
	};
	combats: number;
	victories: number;
	defeats: number;
	averageTurns: number;
};
type SkillMetricsAggregate = {
	skillId: string;
	uses: number;
	runs: number;
	combats: number;
	battleTotal: number;
	turnTotal: number;
	resolvedCombats: number;
	combatWins: number;
};

const MILESTONES = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const;
const DAY_MS = 86_400_000;

function bounds(query: AdminMetricsQuery) {
	const start = new Date(`${query.from}T00:00:00.000Z`);
	const end = new Date(`${query.to}T00:00:00.000Z`);
	end.setUTCDate(end.getUTCDate() + 1);
	return { start, end };
}

function dateExpression(field: string) {
	return { $dateToString: { date: field, format: "%Y-%m-%d", timezone: "UTC" } };
}

function rangeView(query: AdminMetricsQuery) {
	return { from: query.from, to: query.to, mode: query.mode ?? null };
}

function identityBreakdown(rows: CountByType[]) {
	const guests = rows.find((row) => row._id === "guest")?.count ?? 0;
	const registered = rows.find((row) => row._id === "registered")?.count ?? 0;
	return { total: guests + registered, guests, registered };
}

function emptyOutcomes(): AdminRunOutcomeCounts {
	return { active: 0, dead: 0, retired: 0, abandoned: 0 };
}

function enumerateDates(query: AdminMetricsQuery): string[] {
	const dates: string[] = [];
	for (
		let value = new Date(`${query.from}T00:00:00.000Z`).getTime();
		value <= new Date(`${query.to}T00:00:00.000Z`).getTime();
		value += DAY_MS
	) {
		dates.push(new Date(value).toISOString().slice(0, 10));
	}
	return dates;
}

async function loadCohortRuns(query: AdminMetricsQuery): Promise<CohortRun[]> {
	const { start, end } = bounds(query);
	const match: Record<string, unknown> = { createdAt: { $gte: start, $lt: end } };
	if (query.mode) {
		match.mode = query.mode;
	}

	return RunModel.aggregate<CohortRun>([
		{ $match: match },
		{
			$project: {
				_id: 0,
				classId: "$summary.classId",
				status: 1,
				battleNumber: "$summary.battleNumber",
				kills: "$summary.kills",
				hasDefeatedFinalBoss: "$summary.hasDefeatedFinalBoss",
			},
		},
	]);
}

export async function getAdminMetricsOverview(
	query: AdminMetricsQuery,
): Promise<AdminMetricsOverviewResponse> {
	const { start, end } = bounds(query);
	const runMatch: Record<string, unknown> = { createdAt: { $gte: start, $lt: end } };
	if (query.mode) {
		runMatch.mode = query.mode;
	}

	const activityRunMatch: Record<string, unknown> = { ...runMatch };
	const actionMatch = { createdAt: { $gte: start, $lt: end } };
	const actionSource = (includeDay: boolean): PipelineStage.UnionWithPipelineStage[] => {
		const pipeline: PipelineStage.UnionWithPipelineStage[] = [{ $match: actionMatch }];
		if (query.mode) {
			pipeline.push(
				{
					$lookup: {
						from: RunModel.collection.name,
						localField: "runId",
						foreignField: "_id",
						as: "run",
					},
				},
				{ $unwind: "$run" },
				{ $match: { "run.mode": query.mode } },
			);
		}
		pipeline.push({
			$project: includeDay ? { userId: 1, day: dateExpression("$createdAt") } : { userId: 1 },
		});
		return pipeline;
	};
	const userTypeLookup = {
		from: UserModel.collection.name,
		localField: "userId",
		foreignField: "_id",
		as: "user",
	};

	const [runs, newByType, activeByType, dailyActivity, dailyNew, dailyRuns] = await Promise.all([
		loadCohortRuns(query),
		UserModel.aggregate<CountByType>([
			{ $match: { createdAt: { $gte: start, $lt: end } } },
			{ $group: { _id: "$type", count: { $sum: 1 } } },
		]),
		RunModel.aggregate<CountByType>([
			{ $match: activityRunMatch },
			{ $project: { userId: 1 } },
			{
				$unionWith: {
					coll: RunActionModel.collection.name,
					pipeline: actionSource(false),
				},
			},
			{ $group: { _id: "$userId" } },
			{ $lookup: userTypeLookup },
			{ $unwind: "$user" },
			{ $group: { _id: "$user.type", count: { $sum: 1 } } },
		]),
		RunModel.aggregate<DailyActivity>([
			{ $match: activityRunMatch },
			{ $project: { userId: 1, day: dateExpression("$createdAt") } },
			{
				$unionWith: {
					coll: RunActionModel.collection.name,
					pipeline: actionSource(true),
				},
			},
			{ $group: { _id: "$day", userIds: { $addToSet: "$userId" } } },
		]),
		UserModel.aggregate<DailyCount>([
			{ $match: { createdAt: { $gte: start, $lt: end } } },
			{ $group: { _id: dateExpression("$createdAt"), count: { $sum: 1 } } },
		]),
		RunModel.aggregate<DailyCount>([
			{ $match: runMatch },
			{ $group: { _id: dateExpression("$createdAt"), count: { $sum: 1 } } },
		]),
	]);

	const outcomes = emptyOutcomes();
	for (const run of runs) {
		outcomes[run.status] += 1;
	}
	const finalBossCompletions = runs.filter((run) => run.hasDefeatedFinalBoss).length;
	const toMap = (rows: DailyCount[]) => new Map(rows.map((row) => [row._id, row.count]));
	const activityMap = new Map(dailyActivity.map((row) => [row._id, row.userIds.length]));
	const newMap = toMap(dailyNew);
	const runsMap = toMap(dailyRuns);

	return {
		range: rangeView(query),
		players: { active: identityBreakdown(activeByType), new: identityBreakdown(newByType) },
		runs: {
			started: runs.length,
			outcomes,
			finalBossCompletions,
			finalBossCompletionRate: runs.length ? finalBossCompletions / runs.length : 0,
		},
		daily: enumerateDates(query).map((date) => ({
			date,
			activePlayers: activityMap.get(date) ?? 0,
			newPlayers: newMap.get(date) ?? 0,
			runsStarted: runsMap.get(date) ?? 0,
		})),
		progression: MILESTONES.map((battle) => {
			const count = runs.filter((run) => run.battleNumber >= battle).length;
			return { battle, runs: count, percentage: runs.length ? count / runs.length : 0 };
		}),
	};
}

export async function getAdminClassMetrics(
	query: AdminMetricsQuery,
): Promise<AdminClassMetricsResponse> {
	const runs = await loadCohortRuns(query);

	return {
		range: rangeView(query),
		classes: classIds.map((classId) => {
			const classRuns = runs.filter((run) => run.classId === classId);
			const outcomes = emptyOutcomes();
			for (const run of classRuns) {
				outcomes[run.status] += 1;
			}
			const terminalRuns = outcomes.dead + outcomes.retired;
			const finalBossCompletions = classRuns.filter((run) => run.hasDefeatedFinalBoss).length;
			const sum = (field: "battleNumber" | "kills") =>
				classRuns.reduce((total, run) => total + run[field], 0);

			return {
				classId,
				runsStarted: classRuns.length,
				pickRate: runs.length ? classRuns.length / runs.length : 0,
				...outcomes,
				terminalRuns,
				deathRate: terminalRuns ? outcomes.dead / terminalRuns : 0,
				finalBossCompletions,
				finalBossCompletionRate: classRuns.length
					? finalBossCompletions / classRuns.length
					: 0,
				averageBattleReached: classRuns.length ? sum("battleNumber") / classRuns.length : 0,
				averageKills: classRuns.length ? sum("kills") / classRuns.length : 0,
			};
		}),
	};
}

export async function getAdminEnemyMetrics(
	query: AdminMetricsQuery,
): Promise<AdminEnemyMetricsResponse> {
	const { start, end } = bounds(query);
	const pipeline: PipelineStage[] = [{ $match: { createdAt: { $gte: start, $lt: end } } }];

	if (query.mode) {
		pipeline.push(
			{
				$lookup: {
					from: RunModel.collection.name,
					localField: "runId",
					foreignField: "_id",
					as: "run",
				},
			},
			{ $unwind: "$run" },
			{ $match: { "run.mode": query.mode } },
		);
	}

	pipeline.push(
		{ $unwind: "$events" },
		{ $match: { "events.type": "COMBAT_ENDED" } },
		{
			$group: {
				_id: {
					enemyId: {
						$cond: [
							{ $eq: ["$events.encounterType", "ghost"] },
							"ghost",
							"$events.enemySourceId",
						],
					},
					encounterType: "$events.encounterType",
				},
				combats: { $sum: 1 },
				victories: {
					$sum: { $cond: [{ $eq: ["$events.outcome", "victory"] }, 1, 0] },
				},
				defeats: {
					$sum: { $cond: [{ $eq: ["$events.outcome", "defeat"] }, 1, 0] },
				},
				averageTurns: { $avg: "$events.turnNumber" },
			},
		},
		{ $sort: { combats: -1 } },
	);

	const rows = await RunActionModel.aggregate<EnemyMetricsAggregate>(pipeline);

	return {
		range: rangeView(query),
		enemies: rows.map((row) => ({
			enemyId: row._id.enemyId,
			encounterType: row._id.encounterType,
			combats: row.combats,
			victories: row.victories,
			defeats: row.defeats,
			winRate: row.combats ? row.victories / row.combats : 0,
			averageTurns: row.averageTurns,
		})),
	};
}

export async function getAdminSkillMetrics(
	query: AdminMetricsQuery,
): Promise<AdminSkillMetricsResponse> {
	const { start, end } = bounds(query);
	const pipeline: PipelineStage[] = [{ $match: { createdAt: { $gte: start, $lt: end } } }];

	if (query.mode) {
		pipeline.push(
			{
				$lookup: {
					from: RunModel.collection.name,
					localField: "runId",
					foreignField: "_id",
					as: "run",
				},
			},
			{ $unwind: "$run" },
			{ $match: { "run.mode": query.mode } },
		);
	}

	pipeline.push(
		{ $unwind: "$events" },
		{ $match: { "events.type": { $in: ["SKILL_USED", "COMBAT_ENDED"] } } },
		{
			$group: {
				_id: { runId: "$runId", combatId: "$events.combatId" },
				skillUses: {
					$push: {
						$cond: [
							{ $eq: ["$events.type", "SKILL_USED"] },
							{
								skillId: "$events.skillId",
								battleNumber: "$events.battleNumber",
								turnNumber: "$events.turnNumber",
							},
							null,
						],
					},
				},
				outcome: {
					$max: {
						$cond: [{ $eq: ["$events.type", "COMBAT_ENDED"] }, "$events.outcome", null],
					},
				},
			},
		},
		{ $unwind: "$skillUses" },
		{ $match: { skillUses: { $ne: null } } },
		{
			$group: {
				_id: {
					runId: "$_id.runId",
					combatId: "$_id.combatId",
					skillId: "$skillUses.skillId",
				},
				uses: { $sum: 1 },
				battleTotal: { $sum: "$skillUses.battleNumber" },
				turnTotal: { $sum: "$skillUses.turnNumber" },
				outcome: { $first: "$outcome" },
			},
		},
		{
			$group: {
				_id: "$_id.skillId",
				uses: { $sum: "$uses" },
				runIds: { $addToSet: "$_id.runId" },
				combats: { $sum: 1 },
				battleTotal: { $sum: "$battleTotal" },
				turnTotal: { $sum: "$turnTotal" },
				resolvedCombats: {
					$sum: { $cond: [{ $ne: ["$outcome", null] }, 1, 0] },
				},
				combatWins: {
					$sum: { $cond: [{ $eq: ["$outcome", "victory"] }, 1, 0] },
				},
			},
		},
		{
			$project: {
				_id: 0,
				skillId: "$_id",
				uses: 1,
				runs: { $size: "$runIds" },
				combats: 1,
				battleTotal: 1,
				turnTotal: 1,
				resolvedCombats: 1,
				combatWins: 1,
			},
		},
		{ $sort: { uses: -1 } },
	);

	const rows = await RunActionModel.aggregate<SkillMetricsAggregate>(pipeline);
	const totalUses = rows.reduce((total, row) => total + row.uses, 0);

	return {
		range: rangeView(query),
		skills: rows.map((row) => ({
			skillId: row.skillId,
			uses: row.uses,
			usageShare: totalUses ? row.uses / totalUses : 0,
			runs: row.runs,
			combats: row.combats,
			averageUsesPerRun: row.runs ? row.uses / row.runs : 0,
			averageBattle: row.uses ? row.battleTotal / row.uses : 0,
			averageTurn: row.uses ? row.turnTotal / row.uses : 0,
			resolvedCombats: row.resolvedCombats,
			combatWins: row.combatWins,
			combatWinRate: row.resolvedCombats ? row.combatWins / row.resolvedCombats : 0,
		})),
	};
}
