import {
	ADMIN_HERO_ACTIVITY_WINDOW_MS,
	type AdminActiveHero,
	type RunMode,
	type RunSummaryView,
} from "@app/shared";
import type { PipelineStage, Types } from "mongoose";
import { RunModel } from "../models/run.model";
import { RunActionModel } from "../models/runAction.model";
import { getRegisteredDisplayNames } from "./publicIdentity.service";

// Start with indexed time ranges. Invalid actions and incidental run saves do not imply activity.
function recentHeroesPipeline(mode: RunMode | undefined, now: Date): PipelineStage[] {
	const cutoff = new Date(now.getTime() - ADMIN_HERO_ACTIVITY_WINDOW_MS);
	return [
		{ $match: { createdAt: { $gte: cutoff, $lte: now }, success: true } },
		{ $project: { runId: 1, lastActivityAt: "$createdAt" } },
		{
			$unionWith: {
				coll: RunModel.collection.name,
				pipeline: [
					{
						$match: {
							createdAt: { $gte: cutoff, $lte: now },
							status: "active",
							...(mode ? { mode } : {}),
						},
					},
					{ $project: { runId: "$_id", lastActivityAt: "$createdAt" } },
				],
			},
		},
		{ $group: { _id: "$runId", lastActivityAt: { $max: "$lastActivityAt" } } },
		{
			$lookup: {
				from: RunModel.collection.name,
				localField: "_id",
				foreignField: "_id",
				pipeline: [
					{ $match: { status: "active", ...(mode ? { mode } : {}) } },
					{ $project: { summary: 1, userId: 1, mode: 1 } },
				],
				as: "run",
			},
		},
		{ $unwind: "$run" },
		{ $sort: { lastActivityAt: -1, _id: -1 } },
		{ $limit: 50 },
	];
}

export async function getAdminActiveHeroes(mode?: RunMode): Promise<AdminActiveHero[]> {
	const rows = await RunActionModel.aggregate<{
		_id: Types.ObjectId;
		lastActivityAt: Date;
		run: { userId: Types.ObjectId; mode: RunMode; summary: RunSummaryView };
	}>(recentHeroesPipeline(mode, new Date()));
	const names = await getRegisteredDisplayNames(rows.map((row) => row.run.userId));
	return rows.map(({ _id, lastActivityAt, run }) => ({
		runId: String(_id),
		heroName: run.summary.heroName,
		displayName: names.get(String(run.userId)) ?? null,
		classId: run.summary.classId,
		level: run.summary.level,
		battleNumber: run.summary.battleNumber,
		zone: run.summary.zone,
		mode: run.mode,
		lastActivityAt: lastActivityAt.toISOString(),
	}));
}
