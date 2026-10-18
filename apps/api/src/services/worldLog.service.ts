import type { EngineEvent, RunState } from "@app/engine";
import { WORLD_LOG_LIMIT, type RunMode, type WorldLogEntry } from "@app/shared";
import type { ClientSession, Types } from "mongoose";
import { WorldLogModel, type WorldLogRecord } from "../models/worldLog.model";
import { getRegisteredDisplayName } from "./publicIdentity.service";
import { mapWorldLogEvents } from "./worldLog.events";
import { notifyWorldLogEntry } from "../notifications/worldLog";

export async function recordWorldLog(input: {
	runId: string;
	userId: string;
	mode: RunMode;
	state: RunState;
	sequence: number;
	events: readonly EngineEvent[];
	session: ClientSession;
}): Promise<WorldLogEntry[]> {
	const events = mapWorldLogEvents(input.events, input.state);

	if (!events.length) {
		return [];
	}

	const displayName = await getRegisteredDisplayName(input.userId);
	const records = await WorldLogModel.create(
		events.map(({ index, event }) => ({
			sourceKey: `${input.runId}:${input.sequence}:${index}`,
			createdAt: new Date(),
			heroName: input.state.hero.name,
			classId: input.state.hero.classId,
			displayName,
			mode: input.mode,
			event,
		})),
		{ session: input.session, ordered: true },
	);

	return records.map(toWorldLogEntry);
}

export async function getWorldLog(): Promise<WorldLogEntry[]> {
	const records = await WorldLogModel.find()
		.sort({ createdAt: -1, _id: -1 })
		.limit(WORLD_LOG_LIMIT)
		.lean();

	return records.reverse().map(toWorldLogEntry);
}

export async function pruneWorldLog(): Promise<void> {
	try {
		const cutoff = await WorldLogModel.findOne()
			.sort({ createdAt: -1, _id: -1 })
			.skip(WORLD_LOG_LIMIT - 1)
			.lean();

		if (!cutoff) {
			return;
		}

		await WorldLogModel.deleteMany({
			$or: [
				{ createdAt: { $lt: cutoff.createdAt } },
				{ createdAt: cutoff.createdAt, _id: { $lt: cutoff._id } },
			],
		});
	} catch (error) {
		console.error("World log cleanup failed", error);
	}
}

// Only call after the gameplay transaction resolves; delivery cannot undo committed play.
export async function publishWorldLog(entries: WorldLogEntry[]): Promise<void> {
	for (const entry of entries) {
		notifyWorldLogEntry(entry);
	}

	if (entries.length) {
		await pruneWorldLog();
	}
}

function toWorldLogEntry(record: WorldLogRecord & { _id: Types.ObjectId }): WorldLogEntry {
	return {
		id: String(record._id),
		createdAt: record.createdAt.toISOString(),
		heroName: record.heroName,
		classId: record.classId,
		displayName: record.displayName,
		mode: record.mode,
		event: record.event,
	};
}
