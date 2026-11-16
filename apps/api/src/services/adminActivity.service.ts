import type { EngineEvent, RunState } from "@app/engine";
import { ADMIN_ACTIVITY_LIMIT, type AdminActivityEntry, type RunMode } from "@app/shared";
import type { Types } from "mongoose";
import { AdminActivityModel, type AdminActivityRecord } from "../models/adminActivity.model";
import { notifyAdminActivity } from "../notifications/adminActivity";
import { getRegisteredDisplayName } from "./publicIdentity.service";
import { toAdminActivityEvent } from "./adminActivity.events";

type AdminActivityInput = {
	runId: string;
	userId: string;
	mode: RunMode;
	state: RunState;
	sequence: number;
	events: readonly EngineEvent[];
};

// Best effort: callers start this after commit without awaiting it. Restarts can leave feed gaps.
export async function recordAndPublishAdminActivity(input: AdminActivityInput): Promise<void> {
	try {
		const entries = await recordAdminActivity(input);
		await publishAdminActivity(entries);
	} catch (error) {
		console.error("Admin activity recording failed", error);
	}
}

export async function recordAdminActivity(
	input: AdminActivityInput,
): Promise<AdminActivityEntry[]> {
	const events = input.events.flatMap((event, index) => {
		const mapped = toAdminActivityEvent(event, input.state);
		return mapped ? [{ index, event: mapped }] : [];
	});
	if (!events.length) {
		return [];
	}
	const createdAt = new Date();
	const displayName = await getRegisteredDisplayName(input.userId);
	const records = await AdminActivityModel.create(
		events.map(({ index, event }) => ({
			sourceKey: `${input.runId}:${input.sequence}:${index}`,
			createdAt,
			runId: input.runId,
			heroName: input.state.hero.name,
			classId: input.state.hero.classId,
			mode: input.mode,
			displayName,
			event,
		})),
		{ ordered: true },
	);
	return records.map(toEntry);
}

export async function getAdminActivity(): Promise<AdminActivityEntry[]> {
	const records = await AdminActivityModel.find()
		.sort({ createdAt: -1, _id: -1 })
		.limit(ADMIN_ACTIVITY_LIMIT)
		.lean();
	return records.reverse().map(toEntry);
}

export async function pruneAdminActivity(): Promise<void> {
	const cutoff = await AdminActivityModel.findOne()
		.sort({ createdAt: -1, _id: -1 })
		.skip(ADMIN_ACTIVITY_LIMIT - 1)
		.lean();
	if (!cutoff) {
		return;
	}
	await AdminActivityModel.deleteMany({
		$or: [
			{ createdAt: { $lt: cutoff.createdAt } },
			{ createdAt: cutoff.createdAt, _id: { $lt: cutoff._id } },
		],
	});
}

// Delivery and cleanup failures must not affect already committed gameplay.
export async function publishAdminActivity(entries: AdminActivityEntry[]): Promise<void> {
	if (!entries.length) {
		return;
	}
	try {
		await notifyAdminActivity(entries);
	} catch (error) {
		console.error("Admin activity delivery failed", error);
	}
	try {
		await pruneAdminActivity();
	} catch (error) {
		console.error("Admin activity cleanup failed", error);
	}
}

function toEntry(record: AdminActivityRecord & { _id: Types.ObjectId }): AdminActivityEntry {
	return {
		id: String(record._id),
		createdAt: record.createdAt.toISOString(),
		runId: record.runId,
		heroName: record.heroName,
		classId: record.classId,
		mode: record.mode,
		displayName: record.displayName,
		event: record.event,
	};
}
