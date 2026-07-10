import {
	applyAction,
	engineResultSchema,
	runStateSchema,
	type EngineAction,
	type RunState,
} from "@app/engine";
import { RunActionModel } from "../models/runAction.model";
import { RunModel, type RunDocument } from "../models/run.model";
import mongoose from "mongoose";

export type ApplyRunActionInput = {
	userId: string;
	runId: string;
	action: EngineAction;
};

export async function applyRunAction(input: ApplyRunActionInput) {
	return mongoose.connection.transaction(async (session) => {
		const run = await RunModel.findOne({
			_id: input.runId,
			userId: input.userId,
			status: "active",
		}).session(session);

		if (!run) {
			throw new Error("RUN_NOT_FOUND");
		}

		const currentState = runStateSchema.parse(run.state);

		const result = engineResultSchema.parse(applyAction(currentState, input.action));

		const sequence = run.nextActionSequence;

		applyStateToRun(run, result.state);
		run.nextActionSequence += 1;

		await run.save({ session });

		await RunActionModel.create(
			[
				{
					runId: run._id,
					userId: input.userId,
					sequence,
					action: input.action,
					success: result.ok,
					error: result.ok ? undefined : result.error,
				},
			],
			{ session },
		);

		return { run, result };
	});
}

function applyStateToRun(run: RunDocument, state: RunState): void {
	run.state = state;
	run.summary = deriveRunSummary(state);
	run.status = deriveRunStatus(state);

	if (run.status !== "active" && !run.completedAt) {
		run.completedAt = new Date();
	}
}

function deriveRunSummary(state: RunState) {
	return {
		heroName: state.hero.name,
		classId: state.hero.classId,
		level: state.hero.level,
		battleNumber: state.battleNumber,
		zoneNumber: state.zoneNumber,
	};
}

function deriveRunStatus(state: RunState): "active" | "dead" | "victory" {
	switch (state.phase) {
		case "dead":
			return "dead";

		case "retired":
			return "victory";

		default:
			return "active";
	}
}
