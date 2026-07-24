import mongoose, { Types } from "mongoose";
import { HERO_NAME_MAX_LENGTH, HERO_NAME_PATTERN, type CreateRunBody } from "@app/shared";
import { createInitialRunState } from "@app/engine";
import profanityFilter from "leo-profanity";
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

export async function createRun(params: { userId: string; body: CreateRunBody }) {
	const heroName = normalizeAndValidateHeroName(params.body.heroName);

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
		const seed = crypto.randomUUID();

		const state = createInitialRunState({
			runId,
			seed,
			heroName,
			classId: params.body.classId,
		});

		const [run] = await RunModel.create(
			[
				{
					_id: runObjectId,
					userId: params.userId,
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
