import type {
	GetGhostHistoryQuery,
	GetRunHistoryQuery,
	GhostHistoryEntryView,
	RunHistoryEntryView,
} from "@app/shared";
import { RunModel } from "../models/run.model";
import { GhostModel } from "../models/ghost.model";

const COMPLETED_RUN_STATUSES = ["dead", "retired"] as const;

const runHistorySortMap = {
	completedAt: "completedAt",
	createdAt: "createdAt",
	battleNumber: "summary.battleNumber",
	endlessCycle: "summary.endlessCycle",
	day: "summary.day",
	kills: "summary.kills",
	level: "summary.level",
	heroName: "summary.heroName",
} satisfies Record<GetRunHistoryQuery["sort"], string>;

const ghostHistorySortMap = {
	createdAt: "createdAt",
	updatedAt: "updatedAt",
	kills: "stats.kills",
	deaths: "stats.deaths",
	encounters: "stats.encounters",
	heroLevel: "heroLevel",
	encounterLevel: "encounterLevel",
	name: "name",
} satisfies Record<GetGhostHistoryQuery["sort"], string>;

function escapeRegex(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getRunHistory(params: { userId: string; query: GetRunHistoryQuery }) {
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
	const sortField = runHistorySortMap[query.sort];
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

	const entries: RunHistoryEntryView[] = runs.map((run) => ({
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

export async function getGhostHistory(params: { userId: string; query: GetGhostHistoryQuery }) {
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
	const sortField = ghostHistorySortMap[query.sort];
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

	const entries: GhostHistoryEntryView[] = ghosts.map((ghost) => {
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
