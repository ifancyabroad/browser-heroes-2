import type {
	GetGhostLeaderboardQuery,
	GetRunLeaderboardQuery,
	GhostLeaderboardEntryView,
	RunLeaderboardEntryView,
} from "@app/shared";
import { RunModel } from "../models/run.model";
import { GhostModel } from "../models/ghost.model";

const LEADERBOARD_STATUSES = ["dead", "retired"] as const;

function getDailyDateRange(date: string) {
	const start = new Date(`${date}T00:00:00.000Z`);
	const end = new Date(start);

	end.setUTCDate(end.getUTCDate() + 1);

	return { start, end };
}

export async function getRunLeaderboard(params: { userId: string; query: GetRunLeaderboardQuery }) {
	const { query } = params;

	const filter: Record<string, unknown> = {
		status: {
			$in: LEADERBOARD_STATUSES,
		},
		completedAt: {
			$ne: null,
		},
	};

	if (query.scope === "daily") {
		if (!query.date) {
			throw new Error("DAILY_LEADERBOARD_REQUIRES_DATE");
		}

		const { start, end } = getDailyDateRange(query.date);

		filter.completedAt = {
			$gte: start,
			$lt: end,
		};
	}

	if (query.classId) {
		filter["summary.classId"] = query.classId;
	}

	if (query.userOnly === "true") {
		filter.userId = params.userId;
	}

	const skip = (query.page - 1) * query.limit;

	const [runs, total] = await Promise.all([
		RunModel.find(filter)
			.sort({
				"summary.battleNumber": -1,
				completedAt: 1,
				_id: 1,
			})
			.skip(skip)
			.limit(query.limit)
			.lean(),

		RunModel.countDocuments(filter),
	]);

	const entries: RunLeaderboardEntryView[] = runs.map((run, index) => ({
		rank: skip + index + 1,
		runId: String(run._id),
		heroName: run.summary.heroName,
		classId: run.summary.classId,
		level: run.summary.level,
		battleNumber: run.summary.battleNumber,
		zoneNumber: run.summary.zoneNumber,
		status: run.status as "dead" | "retired",
		completedAt: run.completedAt?.toISOString() ?? "",
		isCurrentUser: String(run.userId) === params.userId,
	}));

	return {
		entries,
		page: query.page,
		limit: query.limit,
		total,
		totalPages: Math.ceil(total / query.limit),
	};
}

export async function getGhostLeaderboard(params: {
	userId: string;
	query: GetGhostLeaderboardQuery;
}) {
	const { query } = params;

	const filter: Record<string, unknown> = {};

	if (query.classId) {
		filter.classId = query.classId;
	}

	if (query.userOnly === "true") {
		filter.userId = params.userId;
	}

	const skip = (query.page - 1) * query.limit;

	const [ghosts, total] = await Promise.all([
		GhostModel.find(filter)
			.sort({
				"stats.kills": -1,
				"stats.deaths": 1,
				"stats.encounters": -1,
				createdAt: 1,
				_id: 1,
			})
			.skip(skip)
			.limit(query.limit)
			.lean(),

		GhostModel.countDocuments(filter),
	]);

	const entries: GhostLeaderboardEntryView[] = ghosts.map((ghost, index) => {
		const kills = ghost.stats.kills;
		const deaths = ghost.stats.deaths;
		const encounters = ghost.stats.encounters;
		const completedCombats = kills + deaths;

		return {
			rank: skip + index + 1,
			ghostId: String(ghost._id),
			name: ghost.name,
			classId: ghost.classId,
			heroLevel: ghost.heroLevel,
			encounterLevel: ghost.encounterLevel,
			kills,
			deaths,
			encounters,
			winRate: completedCombats > 0 ? kills / completedCombats : 0,
			createdAt: ghost.createdAt.toISOString(),
			isCurrentUser: String(ghost.userId) === params.userId,
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
