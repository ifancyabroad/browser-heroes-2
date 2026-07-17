import type {
	GetGhostStatsQuery,
	GetRunStatsQuery,
	GhostStatsEntryView,
	RunStatsEntryView,
} from "@app/shared";
import { RunModel } from "../models/run.model";
import { GhostModel } from "../models/ghost.model";
import { Types } from "mongoose";

const COMPLETED_RUN_STATUSES = ["dead", "retired"] as const;

const runStatsSortMap = {
	completedAt: "completedAt",
	createdAt: "createdAt",
	battleNumber: "summary.battleNumber",
	endlessCycle: "summary.endlessCycle",
	day: "summary.day",
	kills: "summary.kills",
	level: "summary.level",
	heroName: "summary.heroName",
} satisfies Record<GetRunStatsQuery["sort"], string>;

const ghostStatsSortMap = {
	createdAt: "createdAt",
	updatedAt: "updatedAt",
	kills: "stats.kills",
	deaths: "stats.deaths",
	encounters: "stats.encounters",
	heroLevel: "heroLevel",
	encounterLevel: "encounterLevel",
	name: "name",
} satisfies Record<GetGhostStatsQuery["sort"], string>;

function escapeRegex(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getRunStats(params: { userId: string; query: GetRunStatsQuery }) {
	const { query } = params;

	const filter: Record<string, unknown> = {
		userId: params.userId,
		status: {
			$in: COMPLETED_RUN_STATUSES,
		},
		completedAt: {
			$ne: null,
		},
	};

	if (query.classId) {
		filter["summary.classId"] = query.classId;
	}

	if (query.search) {
		filter["summary.heroName"] = {
			$regex: escapeRegex(query.search),
			$options: "i",
		};
	}

	const skip = (query.page - 1) * query.limit;
	const sortField = runStatsSortMap[query.sort];
	const sortDirection = query.direction === "asc" ? 1 : -1;

	const [runs, total] = await Promise.all([
		RunModel.find(filter)
			.sort({
				[sortField]: sortDirection,
				_id: 1,
			})
			.skip(skip)
			.limit(query.limit)
			.lean(),

		RunModel.countDocuments(filter),
	]);

	const entries: RunStatsEntryView[] = runs.map((run) => ({
		runId: String(run._id),
		heroName: run.summary.heroName,
		classId: run.summary.classId,
		level: run.summary.level,
		battleNumber: run.summary.battleNumber,
		zoneNumber: run.summary.zoneNumber,
		endlessCycle: run.summary.endlessCycle,
		day: run.summary.day,
		kills: run.summary.kills,
		status: run.status as "dead" | "retired",
		createdAt: run.createdAt.toISOString(),
		completedAt: run.completedAt?.toISOString() ?? "",
	}));

	return {
		entries,
		page: query.page,
		limit: query.limit,
		total,
		totalPages: Math.ceil(total / query.limit),
	};
}

export async function getGhostStats(params: { userId: string; query: GetGhostStatsQuery }) {
	const { query } = params;

	const filter: Record<string, unknown> = {
		userId: params.userId,
	};

	if (query.classId) {
		filter.classId = query.classId;
	}

	if (query.search) {
		filter.name = {
			$regex: escapeRegex(query.search),
			$options: "i",
		};
	}

	const skip = (query.page - 1) * query.limit;
	const sortField = ghostStatsSortMap[query.sort];
	const sortDirection = query.direction === "asc" ? 1 : -1;

	const [ghosts, total] = await Promise.all([
		GhostModel.find(filter)
			.sort({
				[sortField]: sortDirection,
				_id: 1,
			})
			.skip(skip)
			.limit(query.limit)
			.lean(),

		GhostModel.countDocuments(filter),
	]);

	const entries: GhostStatsEntryView[] = ghosts.map((ghost) => {
		const kills = ghost.stats.kills;
		const deaths = ghost.stats.deaths;
		const completedCombats = kills + deaths;

		return {
			ghostId: String(ghost._id),
			sourceRunId: String(ghost.sourceRunId),
			name: ghost.name,
			classId: ghost.classId,
			heroLevel: ghost.heroLevel,
			encounterLevel: ghost.encounterLevel,
			kills,
			deaths,
			encounters: ghost.stats.encounters,
			winRate: completedCombats > 0 ? kills / completedCombats : 0,
			createdAt: ghost.createdAt.toISOString(),
			updatedAt: ghost.updatedAt.toISOString(),
		};
	});

	return {
		entries,
		page: query.page,
		limit: query.limit,
		total,
		totalPages: Math.ceil(total / query.limit),
	};
}

export async function getUserStatsSummary(userId: string) {
	const userObjectId = new Types.ObjectId(userId);

	const [runStats, ghostStats] = await Promise.all([
		RunModel.aggregate<{
			total: number;
			dead: number;
			retired: number;
			bestBattleNumber: number;
			bestZoneNumber: number;
			bestEndlessCycle: number;
			bestDay: number;
			totalKills: number;
		}>([
			{
				$match: {
					userId: userObjectId,
					status: {
						$in: COMPLETED_RUN_STATUSES,
					},
					completedAt: {
						$ne: null,
					},
				},
			},
			{
				$group: {
					_id: null,
					total: { $sum: 1 },
					dead: {
						$sum: {
							$cond: [{ $eq: ["$status", "dead"] }, 1, 0],
						},
					},
					retired: {
						$sum: {
							$cond: [{ $eq: ["$status", "retired"] }, 1, 0],
						},
					},
					bestBattleNumber: { $max: "$summary.battleNumber" },
					bestZoneNumber: { $max: "$summary.zoneNumber" },
					bestEndlessCycle: { $max: "$summary.endlessCycle" },
					bestDay: { $max: "$summary.day" },
					totalKills: { $sum: "$summary.kills" },
				},
			},
		]),

		GhostModel.aggregate<{
			total: number;
			kills: number;
			deaths: number;
			encounters: number;
		}>([
			{
				$match: {
					userId: userObjectId,
				},
			},
			{
				$group: {
					_id: null,
					total: { $sum: 1 },
					kills: { $sum: "$stats.kills" },
					deaths: { $sum: "$stats.deaths" },
					encounters: { $sum: "$stats.encounters" },
				},
			},
		]),
	]);

	const runs = runStats[0];
	const ghosts = ghostStats[0];

	const ghostKills = ghosts?.kills ?? 0;
	const ghostDeaths = ghosts?.deaths ?? 0;
	const ghostCompletedCombats = ghostKills + ghostDeaths;

	return {
		summary: {
			runs: {
				total: runs?.total ?? 0,
				dead: runs?.dead ?? 0,
				retired: runs?.retired ?? 0,
				bestBattleNumber: runs?.bestBattleNumber ?? 0,
				bestZoneNumber: runs?.bestZoneNumber ?? 0,
				bestEndlessCycle: runs?.bestEndlessCycle ?? 0,
				bestDay: runs?.bestDay ?? 0,
				totalKills: runs?.totalKills ?? 0,
			},
			ghosts: {
				total: ghosts?.total ?? 0,
				kills: ghostKills,
				deaths: ghostDeaths,
				encounters: ghosts?.encounters ?? 0,
				winRate: ghostCompletedCombats > 0 ? ghostKills / ghostCompletedCombats : 0,
			},
		},
	};
}
