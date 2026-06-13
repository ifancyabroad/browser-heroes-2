import { Types } from "mongoose";
import { RunModel } from "../models/run.model";
import type { CreateRunBody } from "../schemas/runApi.schema";
import { createInitialRunState, RunState } from "@app/engine";

export function deriveRunSummary(state: RunState) {
	return {
		heroName: state.hero.name,
		classId: state.hero.classId,
		level: state.hero.level,
		battleNumber: state.battleNumber,
		zoneNumber: state.zoneNumber,
	};
}

export async function createRun(params: { userId: string; body: CreateRunBody }) {
	const runObjectId = new Types.ObjectId();
	const runId = runObjectId.toString();
	const seed = crypto.randomUUID();

	const state = createInitialRunState({
		runId,
		seed,
		heroName: params.body.heroName,
		classId: params.body.classId,
	});

	const run = await RunModel.create({
		_id: runObjectId,
		userId: params.userId,
		status: "active",
		state,
		summary: deriveRunSummary(state),
	});

	return run;
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
