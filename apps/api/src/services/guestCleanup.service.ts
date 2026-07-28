import mongoose, { type ClientSession, type Types } from "mongoose";
import { GhostModel } from "../models/ghost.model";
import { RunModel } from "../models/run.model";
import { RunActionModel } from "../models/runAction.model";
import { UserModel } from "../models/user.model";

export const EMPTY_GUEST_RETENTION_DAYS = 7;
export const INACTIVE_RUN_RETENTION_MONTHS = 12;

const BATCH_SIZE = 100;
const DAY_MS = 24 * 60 * 60 * 1000;

type GuestCleanupPlanInput = {
	userIds: string[];
	eligibleRuns: Array<{ id: string; userId: string; status: "active" | "abandoned" }>;
	eligibleActionCount: number;
	allRunUserIds: string[];
	allActionUserIds: string[];
	retainedRunUserIds: string[];
	retainedActionUserIds: string[];
	ghostUserIds: string[];
};

export type GuestCleanupPlan = {
	emptyGuestIds: string[];
	deletableGuestIds: string[];
	eligibleRunIds: string[];
	activeRuns: number;
	abandonedRuns: number;
	runActions: number;
	retainedGuests: number;
};

export type GuestCleanupReport = {
	mode: "dry-run" | "execute";
	guestsExamined: number;
	emptyGuests: number;
	activeRuns: number;
	abandonedRuns: number;
	runActions: number;
	deletableGuests: number;
	retainedGuests: number;
};

function asStrings(values: unknown[]) {
	return values.map(String);
}

function subtractCalendarMonths(date: Date, months: number) {
	const result = new Date(date);
	result.setUTCMonth(result.getUTCMonth() - months);
	return result;
}

export function planGuestCleanup(input: GuestCleanupPlanInput): GuestCleanupPlan {
	const allRunUsers = new Set(input.allRunUserIds);
	const allActionUsers = new Set(input.allActionUserIds);
	const retainedRunUsers = new Set(input.retainedRunUserIds);
	const retainedActionUsers = new Set(input.retainedActionUserIds);
	const ghostUsers = new Set(input.ghostUserIds);

	const emptyGuestIds = input.userIds.filter(
		(userId) =>
			!allRunUsers.has(userId) && !allActionUsers.has(userId) && !ghostUsers.has(userId),
	);
	const deletableGuestIds = input.userIds.filter(
		(userId) =>
			!retainedRunUsers.has(userId) &&
			!retainedActionUsers.has(userId) &&
			!ghostUsers.has(userId),
	);

	return {
		emptyGuestIds,
		deletableGuestIds,
		eligibleRunIds: input.eligibleRuns.map((run) => run.id),
		activeRuns: input.eligibleRuns.filter((run) => run.status === "active").length,
		abandonedRuns: input.eligibleRuns.filter((run) => run.status === "abandoned").length,
		runActions: input.eligibleActionCount,
		retainedGuests: input.userIds.length - deletableGuestIds.length,
	};
}

async function inspectGuestBatch(
	userIds: Types.ObjectId[],
	inactiveCutoff: Date,
	session?: ClientSession,
) {
	const inactiveUserIds = (await UserModel.distinct("_id", {
		_id: { $in: userIds },
		lastActiveAt: { $lt: inactiveCutoff },
		type: "guest",
	}).session(session ?? null)) as Types.ObjectId[];
	const ghosts = await GhostModel.find(
		{ userId: { $in: userIds } },
		{ userId: 1, sourceRunId: 1 },
		{ session },
	).lean();
	const protectedRunIds = ghosts.map((ghost) => ghost.sourceRunId);
	const eligibleRuns = await RunModel.find(
		{
			userId: { $in: inactiveUserIds },
			status: { $in: ["active", "abandoned"] as const },
			...(protectedRunIds.length > 0 ? { _id: { $nin: protectedRunIds } } : {}),
		},
		{ userId: 1, status: 1 },
		{ session },
	).lean();
	const eligibleRunIds = eligibleRuns.map((run) => run._id);
	const retainedRunFilter = {
		userId: { $in: userIds },
		...(eligibleRunIds.length > 0 ? { _id: { $nin: eligibleRunIds } } : {}),
	};
	const retainedActionFilter = {
		userId: { $in: userIds },
		...(eligibleRunIds.length > 0 ? { runId: { $nin: eligibleRunIds } } : {}),
	};

	const [
		eligibleActionCount,
		allRunUserIds,
		allActionUserIds,
		retainedRunUserIds,
		retainedActionUserIds,
	] = await Promise.all([
		eligibleRunIds.length > 0
			? RunActionModel.countDocuments({ runId: { $in: eligibleRunIds } }).session(
					session ?? null,
				)
			: 0,
		RunModel.distinct("userId", { userId: { $in: userIds } }).session(session ?? null),
		RunActionModel.distinct("userId", { userId: { $in: userIds } }).session(session ?? null),
		RunModel.distinct("userId", retainedRunFilter).session(session ?? null),
		RunActionModel.distinct("userId", retainedActionFilter).session(session ?? null),
	]);

	return planGuestCleanup({
		userIds: asStrings(userIds),
		eligibleRuns: eligibleRuns.map((run) => ({
			id: String(run._id),
			userId: String(run.userId),
			status: run.status as "active" | "abandoned",
		})),
		eligibleActionCount,
		allRunUserIds: asStrings(allRunUserIds),
		allActionUserIds: asStrings(allActionUserIds),
		retainedRunUserIds: asStrings(retainedRunUserIds),
		retainedActionUserIds: asStrings(retainedActionUserIds),
		ghostUserIds: ghosts.map((ghost) => String(ghost.userId)),
	});
}

function addPlanToReport(report: GuestCleanupReport, plan: GuestCleanupPlan) {
	report.guestsExamined += plan.deletableGuestIds.length + plan.retainedGuests;
	report.emptyGuests += plan.emptyGuestIds.length;
	report.activeRuns += plan.activeRuns;
	report.abandonedRuns += plan.abandonedRuns;
	report.runActions += plan.runActions;
	report.deletableGuests += plan.deletableGuestIds.length;
	report.retainedGuests += plan.retainedGuests;
}

async function executeGuestBatch(
	candidateIds: Types.ObjectId[],
	emptyCutoff: Date,
	inactiveCutoff: Date,
) {
	return mongoose.connection.transaction(async (session) => {
		const eligibleGuests = await UserModel.find(
			{
				_id: { $in: candidateIds },
				type: "guest",
				lastActiveAt: { $lt: emptyCutoff },
			},
			{ _id: 1 },
			{ session },
		).lean();
		const userIds = eligibleGuests.map((guest) => guest._id);
		const plan = await inspectGuestBatch(userIds, inactiveCutoff, session);

		if (plan.eligibleRunIds.length > 0) {
			await RunActionModel.deleteMany({ runId: { $in: plan.eligibleRunIds } }, { session });
			await RunModel.deleteMany({ _id: { $in: plan.eligibleRunIds } }, { session });
		}

		if (plan.deletableGuestIds.length > 0) {
			await UserModel.deleteMany(
				{ _id: { $in: plan.deletableGuestIds }, type: "guest" },
				{ session },
			);
		}

		return plan;
	});
}

export async function cleanupGuestAccounts(options: {
	execute: boolean;
	now?: Date;
}): Promise<GuestCleanupReport> {
	const now = options.now ?? new Date();
	const emptyCutoff = new Date(now.getTime() - EMPTY_GUEST_RETENTION_DAYS * DAY_MS);
	const inactiveCutoff = subtractCalendarMonths(now, INACTIVE_RUN_RETENTION_MONTHS);
	const report: GuestCleanupReport = {
		mode: options.execute ? "execute" : "dry-run",
		guestsExamined: 0,
		emptyGuests: 0,
		activeRuns: 0,
		abandonedRuns: 0,
		runActions: 0,
		deletableGuests: 0,
		retainedGuests: 0,
	};
	let cursor: Types.ObjectId | undefined;

	while (true) {
		const candidates = await UserModel.find(
			{
				type: "guest",
				lastActiveAt: { $lt: emptyCutoff },
				...(cursor ? { _id: { $gt: cursor } } : {}),
			},
			{ _id: 1 },
		)
			.sort({ _id: 1 })
			.limit(BATCH_SIZE)
			.lean();

		if (candidates.length === 0) {
			break;
		}

		const candidateIds = candidates.map((candidate) => candidate._id);
		cursor = candidateIds.at(-1);
		const plan = options.execute
			? await executeGuestBatch(candidateIds, emptyCutoff, inactiveCutoff)
			: await inspectGuestBatch(candidateIds, inactiveCutoff);
		addPlanToReport(report, plan);
	}

	return report;
}
