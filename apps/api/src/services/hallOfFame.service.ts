import type {
	GetGhostHallOfFameQuery,
	GetHeroHallOfFameQuery,
	GhostHallOfFameEntryView,
	HeroHallOfFameEntryView,
} from "@app/shared";
import { Types } from "mongoose";
import { env } from "../config/env";
import { GhostModel, type GhostDocument } from "../models/ghost.model";
import { RunModel, type RunDocument } from "../models/run.model";
import { getRegisteredDisplayNames } from "./publicIdentity.service";

const COMPLETED_RUN_STATUSES = ["dead", "retired"] as const;

const HERO_RANKING = {
	"summary.kills": -1,
	"summary.day": 1,
	completedAt: 1,
	_id: 1,
} as const;

const GHOST_RANKING = {
	"stats.kills": -1,
	status: 1,
	createdAt: 1,
	_id: 1,
} as const;

export async function getHeroHallOfFame(params: {
	userId?: string;
	query: GetHeroHallOfFameQuery;
}) {
	const { query } = params;
	const season = getHallOfFameSeason(query.season);
	if (query.userOnly === "true" && !params.userId) {
		return {
			entries: [],
			season,
			currentSeason: env.CURRENT_SEASON,
			page: query.page,
			limit: query.limit,
			total: 0,
			totalPages: 0,
		};
	}

	const rankingFilter: Record<string, unknown> = {
		season,
		status: { $in: COMPLETED_RUN_STATUSES },
		completedAt: { $ne: null },
	};
	if (query.classId) {
		rankingFilter["summary.classId"] = query.classId;
	}

	const resultFilter = {
		...rankingFilter,
		...(query.userOnly === "true" ? { userId: params.userId } : {}),
	};
	const skip = (query.page - 1) * query.limit;
	const [runs, total] = await Promise.all([
		RunModel.find(resultFilter).sort(HERO_RANKING).skip(skip).limit(query.limit).lean(),
		RunModel.countDocuments(resultFilter),
	]);
	const ranks =
		query.userOnly === "true"
			? await Promise.all(runs.map((run) => getHeroRank(rankingFilter, run)))
			: runs.map((_, index) => skip + index + 1);
	const displayNames = await getRegisteredDisplayNames(runs.map((run) => run.userId));

	const entries: HeroHallOfFameEntryView[] = runs.map((run, index) => ({
		rank: ranks[index]!,
		runId: String(run._id),
		heroName: run.summary.heroName,
		displayName: displayNames.get(String(run.userId)) ?? null,
		classId: run.summary.classId,
		level: run.summary.level,
		zoneNumber: run.summary.zoneNumber,
		day: run.summary.day,
		kills: run.summary.kills,
		status: run.status as "dead" | "retired",
		mode: run.mode,
		slainBy: run.summary.slainBy ?? null,
		completedAt: run.completedAt?.toISOString() ?? "",
		isCurrentUser: String(run.userId) === params.userId,
	}));

	return {
		entries,
		season,
		currentSeason: env.CURRENT_SEASON,
		page: query.page,
		limit: query.limit,
		total,
		totalPages: Math.ceil(total / query.limit),
	};
}

export async function getGhostHallOfFame(params: {
	userId?: string;
	query: GetGhostHallOfFameQuery;
}) {
	const { query } = params;
	const season = getHallOfFameSeason(query.season);
	if (query.userOnly === "true" && !params.userId) {
		return {
			entries: [],
			season,
			currentSeason: env.CURRENT_SEASON,
			page: query.page,
			limit: query.limit,
			total: 0,
			totalPages: 0,
		};
	}

	const rankingFilter: Record<string, unknown> = { season };
	if (query.classId) {
		rankingFilter.classId = query.classId;
	}

	const resultFilter = {
		...rankingFilter,
		...(query.userOnly === "true" ? { userId: params.userId } : {}),
	};
	const skip = (query.page - 1) * query.limit;
	const [ghosts, total] = await Promise.all([
		GhostModel.find(resultFilter).sort(GHOST_RANKING).skip(skip).limit(query.limit).lean(),
		GhostModel.countDocuments(resultFilter),
	]);
	const ranks =
		query.userOnly === "true"
			? await Promise.all(ghosts.map((ghost) => getGhostRank(rankingFilter, ghost)))
			: ghosts.map((_, index) => skip + index + 1);
	const displayNames = await getRegisteredDisplayNames(ghosts.map((ghost) => ghost.userId));

	const entries: GhostHallOfFameEntryView[] = ghosts.map((ghost, index) => {
		const { kills } = ghost.stats;
		return {
			rank: ranks[index]!,
			ghostId: String(ghost._id),
			name: ghost.name,
			displayName: displayNames.get(String(ghost.userId)) ?? null,
			classId: ghost.classId,
			heroLevel: ghost.heroLevel,
			kills,
			status: ghost.status,
			banishedBy: ghost.banishedBy
				? {
						sourceId: ghost.banishedBy.sourceId,
						heroName: ghost.banishedBy.heroName,
						classId: ghost.banishedBy.classId,
						heroLevel: ghost.banishedBy.heroLevel,
					}
				: null,
			isCurrentUser: String(ghost.userId) === params.userId,
		};
	});

	return {
		entries,
		season,
		currentSeason: env.CURRENT_SEASON,
		page: query.page,
		limit: query.limit,
		total,
		totalPages: Math.ceil(total / query.limit),
	};
}

function getHallOfFameSeason(requestedSeason?: number): number {
	const season = requestedSeason ?? env.CURRENT_SEASON;
	if (season > env.CURRENT_SEASON) {
		throw Object.assign(new Error("SEASON_NOT_AVAILABLE"), { status: 400 });
	}
	return season;
}

async function getHeroRank(
	rankingFilter: Record<string, unknown>,
	run: RunDocument & { _id: unknown },
): Promise<number> {
	const completedAt = run.completedAt!;
	const id = new Types.ObjectId(String(run._id));
	const betterRuns = await RunModel.countDocuments({
		...rankingFilter,
		$or: [
			{ "summary.kills": { $gt: run.summary.kills } },
			{ "summary.kills": run.summary.kills, "summary.day": { $lt: run.summary.day } },
			{
				"summary.kills": run.summary.kills,
				"summary.day": run.summary.day,
				completedAt: { $lt: completedAt },
			},
			{
				"summary.kills": run.summary.kills,
				"summary.day": run.summary.day,
				completedAt,
				_id: { $lt: id },
			},
		],
	});
	return betterRuns + 1;
}

async function getGhostRank(
	rankingFilter: Record<string, unknown>,
	ghost: GhostDocument & { _id: unknown; createdAt: Date },
): Promise<number> {
	const { kills } = ghost.stats;
	const id = new Types.ObjectId(String(ghost._id));
	const betterGhosts = await GhostModel.countDocuments({
		...rankingFilter,
		$or: [
			{ "stats.kills": { $gt: kills } },
			{
				"stats.kills": kills,
				status: { $lt: ghost.status },
			},
			{
				"stats.kills": kills,
				status: ghost.status,
				createdAt: { $lt: ghost.createdAt },
			},
			{
				"stats.kills": kills,
				status: ghost.status,
				createdAt: ghost.createdAt,
				_id: { $lt: id },
			},
		],
	});
	return betterGhosts + 1;
}
