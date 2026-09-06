import mongoose, { Types } from "mongoose";
import { HERO_NAME_MAX_LENGTH, HERO_NAME_PATTERN, type RunMode } from "@app/shared";
import { createInitialRunState } from "@app/engine";
import type { ClassId } from "@app/content";
import profanityFilter from "leo-profanity";
import { env } from "../config/env";
import { RunModel } from "../models/run.model";
import { RunActionModel } from "../models/runAction.model";
import { toRunSummary } from "./projection.service";

function createHeroNameError(message: string): Error & { status: number } {
	return Object.assign(new Error(message), { status: 400 });
}

function normalizeHeroName(heroName: string): string {
	const trimmedName = heroName.trim();

	if (!trimmedName) {
		return "";
	}

	const lowerCaseName = trimmedName.toLowerCase();

	return `${lowerCaseName.charAt(0).toUpperCase()}${lowerCaseName.slice(1)}`;
}

function normalizeAndValidateHeroName(heroName: string): string {
	const normalizedName = normalizeHeroName(heroName);

	if (!normalizedName) {
		throw createHeroNameError("Hero name is required.");
	}

	if (normalizedName.length > HERO_NAME_MAX_LENGTH) {
		throw createHeroNameError(`Hero name must be ${HERO_NAME_MAX_LENGTH} characters or fewer.`);
	}

	if (!HERO_NAME_PATTERN.test(normalizedName)) {
		throw createHeroNameError("Hero name can only contain letters.");
	}

	if (profanityFilter.check(normalizedName)) {
		throw createHeroNameError("Hero name is not allowed.");
	}

	return normalizedName;
}

export async function createRun(params: { userId: string; heroName: string; classId: ClassId }) {
	return createRunRecord({
		season: env.CURRENT_SEASON,
		mode: "normal",
		userId: params.userId,
		heroName: params.heroName,
		classId: params.classId,
		seed: crypto.randomUUID(),
	});
}

export function createDailyChallengeRun(params: {
	season: number;
	userId: string;
	heroName: string;
	classId: ClassId;
	seed: string;
	dailyChallengeDate: string;
}) {
	return createRunRecord({ mode: "dailyChallenge", ...params });
}

async function createRunRecord(params: {
	season: number;
	userId: string;
	heroName: string;
	classId: ClassId;
	seed: string;
	mode: RunMode;
	dailyChallengeDate?: string;
}) {
	const heroName = normalizeAndValidateHeroName(params.heroName);

	return mongoose.connection.transaction(async (session) => {
		const now = new Date();

		await RunModel.updateMany(
			{
				userId: params.userId,
				status: "active",
			},
			{
				$set: {
					status: "abandoned",
					completedAt: now,
				},
			},
			{ session },
		);

		const runObjectId = new Types.ObjectId();
		const runId = runObjectId.toString();
		const state = createInitialRunState({
			runId,
			seed: params.seed,
			heroName,
			classId: params.classId,
		});

		const [run] = await RunModel.create(
			[
				{
					_id: runObjectId,
					season: params.season,
					userId: params.userId,
					mode: params.mode,
					dailyChallengeDate:
						params.mode === "dailyChallenge" ? params.dailyChallengeDate : undefined,
					status: "active",
					state,
					summary: toRunSummary(state),
				},
			],
			{ session },
		);

		return run;
	});
}

export async function getCurrentRunForUser(userId: string) {
	return RunModel.findOne({
		userId,
		status: "active",
	}).sort({ createdAt: -1 });
}

export async function getRunForUser(params: { userId: string; runId: string }) {
	return RunModel.findOne({
		_id: params.runId,
		userId: params.userId,
	});
}

export async function getRunForHero(runId: string) {
	if (!Types.ObjectId.isValid(runId)) {
		return null;
	}

	return RunModel.findOne({
		_id: runId,
		status: {
			$in: ["dead", "retired"],
		},
		completedAt: {
			$ne: null,
		},
	});
}

export async function getRunActions(input: { userId: string; runId: string }) {
	const runExists = await RunModel.exists({
		_id: input.runId,
		userId: input.userId,
	});

	if (!runExists) {
		throw new Error("RUN_NOT_FOUND");
	}

	return RunActionModel.find({
		runId: input.runId,
		userId: input.userId,
	})
		.sort({ sequence: 1 })
		.lean();
}
