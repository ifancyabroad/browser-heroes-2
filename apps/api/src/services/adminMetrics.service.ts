import { classIds, type ClassId } from "@app/content";
import {
	runModes,
	type AdminClassMetricsResponse,
	type AdminEnemyMetricsResponse,
	type AdminEnemyMetricsQuery,
	type AdminMetricsOverviewResponse,
	type AdminMetricsQuery,
	type AdminPlayerMetricsResponse,
	type AdminRunMetricsDailyPoint,
	type AdminRunMetricsResponse,
	type AdminRunOutcomeCounts,
	type AdminSkillMetricsResponse,
} from "@app/shared";
import { RunActionModel } from "../models/runAction.model";
import { RunModel } from "../models/run.model";
import { UserModel } from "../models/user.model";
import type { PipelineStage } from "mongoose";

type IdentityType = "guest" | "registered";
type RunStatus = keyof AdminRunOutcomeCounts;
type CohortRun = {
	classId: ClassId;
	mode: "normal" | "dailyChallenge";
	status: RunStatus;
	battleNumber: number;
	kills: number;
	hasDefeatedFinalBoss: boolean;
	createdAt: Date;
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
type NewIdentity = {
	userId: string;
	type: IdentityType;
	createdAt: Date;
};
type PlayerActivity = {
	userId: string;
	type: IdentityType;
	userCreatedAt: Date;
	activityDates: string[];
	runStarts: Array<{ date: string; count: number }>;
};

const MILESTONES = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const;
const MAX_RETENTION_DAYS = 30;
const RETENTION_DAYS = [1, 7, MAX_RETENTION_DAYS] as const;
const DEPTH_BUCKETS = [
	{ label: "1–9", fromBattle: 1, toBattle: 9 },
	{ label: "10–19", fromBattle: 10, toBattle: 19 },
	{ label: "20–29", fromBattle: 20, toBattle: 29 },
	{ label: "30–39", fromBattle: 30, toBattle: 39 },
	{ label: "40–49", fromBattle: 40, toBattle: 49 },
	{ label: "50–59", fromBattle: 50, toBattle: 59 },
	{ label: "60–69", fromBattle: 60, toBattle: 69 },
	{ label: "70–79", fromBattle: 70, toBattle: 79 },
	{ label: "80–89", fromBattle: 80, toBattle: 89 },
	{ label: "90–99", fromBattle: 90, toBattle: 99 },
	{ label: "100+", fromBattle: 100, toBattle: null },
] as const;
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
				mode: 1,
				status: 1,
				battleNumber: "$summary.battleNumber",
				kills: "$summary.kills",
				hasDefeatedFinalBoss: "$summary.hasDefeatedFinalBoss",
				createdAt: 1,
			},
		},
	]);
}

async function loadPlayerActivity(query: AdminMetricsQuery): Promise<PlayerActivity[]> {
	const { start, end } = bounds(query);
	end.setUTCDate(end.getUTCDate() + MAX_RETENTION_DAYS);

	const runMatch: Record<string, unknown> = { createdAt: { $gte: start, $lt: end } };
	if (query.mode) {
		runMatch.mode = query.mode;
	}

	const actionPipeline: PipelineStage.UnionWithPipelineStage[] = [
		{ $match: { createdAt: { $gte: start, $lt: end } } },
	];
	if (query.mode) {
		actionPipeline.push(
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
	actionPipeline.push({
		$project: {
			userId: 1,
			date: dateExpression("$createdAt"),
			runsStarted: { $literal: 0 },
		},
	});

	return RunModel.aggregate<PlayerActivity>([
		{ $match: runMatch },
		{
			$project: {
				userId: 1,
				date: dateExpression("$createdAt"),
				runsStarted: { $literal: 1 },
			},
		},
		{
			$unionWith: {
				coll: RunActionModel.collection.name,
				pipeline: actionPipeline,
			},
		},
		{
			$group: {
				_id: { userId: "$userId", date: "$date" },
				runsStarted: { $sum: "$runsStarted" },
			},
		},
		{
			$group: {
				_id: "$_id.userId",
				activityDates: { $push: "$_id.date" },
				runStarts: { $push: { date: "$_id.date", count: "$runsStarted" } },
			},
		},
		{
			$lookup: {
				from: UserModel.collection.name,
				localField: "_id",
				foreignField: "_id",
				as: "user",
			},
		},
		{ $unwind: "$user" },
		{
			$project: {
				_id: 0,
				userId: { $toString: "$_id" },
				type: "$user.type",
				userCreatedAt: "$user.createdAt",
				activityDates: 1,
				runStarts: 1,
			},
		},
	]);
}

function runOutcomes(runs: CohortRun[]): AdminRunOutcomeCounts {
	const outcomes = emptyOutcomes();
	for (const run of runs) {
		outcomes[run.status] += 1;
	}
	return outcomes;
}

function average(runs: CohortRun[], field: "battleNumber" | "kills"): number {
	if (!runs.length) {
		return 0;
	}
	return runs.reduce((total, run) => total + run[field], 0) / runs.length;
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
		localField: "_id",
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

	const outcomes = runOutcomes(runs);
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
			const outcomes = runOutcomes(classRuns);
			const terminalRuns = outcomes.dead + outcomes.retired;
			const finalBossCompletions = classRuns.filter((run) => run.hasDefeatedFinalBoss).length;

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
				averageBattleReached: average(classRuns, "battleNumber"),
				averageKills: average(classRuns, "kills"),
			};
		}),
	};
}

export async function getAdminRunMetrics(
	query: AdminMetricsQuery,
): Promise<AdminRunMetricsResponse> {
	const runs = await loadCohortRuns(query);
	const outcomes = runOutcomes(runs);
	const resolvedRuns = outcomes.dead + outcomes.retired;
	const finalBossCompletions = runs.filter((run) => run.hasDefeatedFinalBoss).length;
	const dailyRuns = new Map<string, AdminRunMetricsDailyPoint>();

	for (const run of runs) {
		const date = run.createdAt.toISOString().slice(0, 10);
		const day = dailyRuns.get(date) ?? {
			date,
			runsStarted: 0,
			...emptyOutcomes(),
		};
		day.runsStarted += 1;
		day[run.status] += 1;
		dailyRuns.set(date, day);
	}

	return {
		range: rangeView(query),
		totals: {
			runsStarted: runs.length,
			...outcomes,
			resolvedRuns,
			abandonmentRate: runs.length ? outcomes.abandoned / runs.length : 0,
			averageBattleReached: average(runs, "battleNumber"),
			averageKills: average(runs, "kills"),
			finalBossCompletions,
			finalBossCompletionRate: runs.length ? finalBossCompletions / runs.length : 0,
		},
		daily: enumerateDates(query).map(
			(date) => dailyRuns.get(date) ?? { date, runsStarted: 0, ...emptyOutcomes() },
		),
		depth: DEPTH_BUCKETS.map((bucket) => {
			const count = runs.filter(
				(run) =>
					run.battleNumber >= bucket.fromBattle &&
					(bucket.toBattle === null || run.battleNumber <= bucket.toBattle),
			).length;
			return { ...bucket, runs: count, percentage: runs.length ? count / runs.length : 0 };
		}),
		modes: runModes
			.filter((mode) => !query.mode || mode === query.mode)
			.map((mode) => {
				const modeRuns = runs.filter((run) => run.mode === mode);
				const modeOutcomes = runOutcomes(modeRuns);
				const modeCompletions = modeRuns.filter((run) => run.hasDefeatedFinalBoss).length;
				return {
					mode,
					runsStarted: modeRuns.length,
					share: runs.length ? modeRuns.length / runs.length : 0,
					...modeOutcomes,
					averageBattleReached: average(modeRuns, "battleNumber"),
					averageKills: average(modeRuns, "kills"),
					finalBossCompletions: modeCompletions,
					finalBossCompletionRate: modeRuns.length
						? modeCompletions / modeRuns.length
						: 0,
				};
			}),
	};
}

export async function getAdminPlayerMetrics(
	query: AdminMetricsQuery,
): Promise<AdminPlayerMetricsResponse> {
	const { start, end } = bounds(query);
	const [newIdentities, activity, unfilteredActivity] = await Promise.all([
		UserModel.aggregate<NewIdentity>([
			{ $match: { createdAt: { $gte: start, $lt: end } } },
			{
				$project: {
					_id: 0,
					userId: { $toString: "$_id" },
					type: 1,
					createdAt: 1,
				},
			},
		]),
		loadPlayerActivity(query),
		query.mode ? loadPlayerActivity({ ...query, mode: undefined }) : Promise.resolve(null),
	]);
	const retentionActivity = unfilteredActivity ?? activity;

	const dates = enumerateDates(query);
	const selectedDates = new Set(dates);
	const selectedActivity = activity.filter((player) =>
		player.activityDates.some((date) => selectedDates.has(date)),
	);
	const runCount = (player: PlayerActivity) =>
		player.runStarts.reduce(
			(total, row) => total + (selectedDates.has(row.date) ? row.count : 0),
			0,
		);
	const returningPlayers = selectedActivity.filter((player) => player.userCreatedAt < start);
	const repeatPlayers = selectedActivity.filter((player) => runCount(player) >= 2);
	const runsStarted = selectedActivity.reduce((total, player) => total + runCount(player), 0);

	const daily = new Map(
		dates.map((date) => [date, { date, activePlayers: 0, newPlayers: 0, returningPlayers: 0 }]),
	);
	for (const identity of newIdentities) {
		const date = identity.createdAt.toISOString().slice(0, 10);
		const day = daily.get(date);
		if (day) {
			day.newPlayers += 1;
		}
	}
	for (const player of selectedActivity) {
		const createdDate = player.userCreatedAt.toISOString().slice(0, 10);
		for (const date of player.activityDates) {
			const day = daily.get(date);
			if (!day) {
				continue;
			}
			day.activePlayers += 1;
			if (createdDate < date) {
				day.returningPlayers += 1;
			}
		}
	}

	const types = (["guest", "registered"] as const).map((type) => {
		const typeActivity = selectedActivity.filter((player) => player.type === type);
		const typeReturning = returningPlayers.filter((player) => player.type === type);
		const typeRuns = typeActivity.reduce((total, player) => total + runCount(player), 0);
		return {
			type,
			activePlayers: typeActivity.length,
			newPlayers: newIdentities.filter((identity) => identity.type === type).length,
			returningPlayers: typeReturning.length,
			repeatPlayers: typeActivity.filter((player) => runCount(player) >= 2).length,
			runsStarted: typeRuns,
			runsPerActivePlayer: typeActivity.length ? typeRuns / typeActivity.length : 0,
		};
	});

	const activityByUser = new Map(retentionActivity.map((player) => [player.userId, player]));
	const today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	const todayDate = today.toISOString().slice(0, 10);
	const retention = RETENTION_DAYS.map((day) => {
		const eligible = newIdentities.filter((identity) => {
			const target = new Date(identity.createdAt);
			target.setUTCHours(0, 0, 0, 0);
			target.setUTCDate(target.getUTCDate() + day);
			return target.toISOString().slice(0, 10) < todayDate;
		});
		const returnedPlayers = eligible.filter((identity) => {
			const target = new Date(identity.createdAt);
			target.setUTCHours(0, 0, 0, 0);
			target.setUTCDate(target.getUTCDate() + day);
			return activityByUser
				.get(identity.userId)
				?.activityDates.includes(target.toISOString().slice(0, 10));
		}).length;
		return {
			day,
			eligiblePlayers: eligible.length,
			returnedPlayers,
			rate: eligible.length ? returnedPlayers / eligible.length : 0,
		};
	});

	return {
		range: rangeView(query),
		totals: {
			activePlayers: selectedActivity.length,
			newPlayers: newIdentities.length,
			returningPlayers: returningPlayers.length,
			repeatPlayers: repeatPlayers.length,
			runsStarted,
			runsPerActivePlayer: selectedActivity.length
				? runsStarted / selectedActivity.length
				: 0,
		},
		daily: [...daily.values()],
		types,
		retention,
	};
}

export async function getAdminEnemyMetrics(
	query: AdminEnemyMetricsQuery,
): Promise<AdminEnemyMetricsResponse> {
	const { start, end } = bounds(query);
	const pipeline: PipelineStage[] = [{ $match: { createdAt: { $gte: start, $lt: end } } }];

	if (query.mode || query.classId) {
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
		);
		const runMatch: Record<string, unknown> = {};
		if (query.mode) {
			runMatch["run.mode"] = query.mode;
		}
		if (query.classId) {
			runMatch["run.summary.classId"] = query.classId;
		}
		pipeline.push({ $match: runMatch });
	}
	const eventMatch: Record<string, unknown> = { "events.type": "COMBAT_ENDED" };
	if (query.encounterType) {
		eventMatch["events.encounterType"] = query.encounterType;
	}
	if (query.battleFrom || query.battleTo) {
		eventMatch["events.battleNumber"] = {
			...(query.battleFrom ? { $gte: query.battleFrom } : {}),
			...(query.battleTo ? { $lte: query.battleTo } : {}),
		};
	}

	pipeline.push(
		{ $unwind: "$events" },
		{ $match: eventMatch },
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
		{ $match: { combats: { $gte: query.minCombats } } },
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
