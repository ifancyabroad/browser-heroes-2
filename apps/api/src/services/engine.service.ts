import { applyAction, runStateSchema, type EngineAction, type RunState } from "@app/engine";
import { RunActionModel } from "../models/runAction.model";
import { RunModel, type RunDocument } from "../models/run.model";

export type ApplyRunActionInput = {
	userId: string;
	runId: string;
	action: EngineAction;
};

export async function applyRunAction(input: ApplyRunActionInput) {
	const run = await RunModel.findOne({
		_id: input.runId,
		userId: input.userId,
		status: "active",
	});

	if (!run) {
		throw new Error("RUN_NOT_FOUND");
	}

	const currentState = runStateSchema.parse(run.state);
	const result = applyAction(currentState, input.action);
	const nextState = runStateSchema.parse(result.state);

	const sequence = run.nextActionSequence;

	applyStateToRun(run, nextState);
	run.nextActionSequence += 1;

	await run.save();

	await RunActionModel.create({
		runId: run._id,
		userId: input.userId,
		sequence,
		action: input.action,
		success: result.ok,
		error: result.ok ? undefined : result.error,
	});

	return {
		run,
		result,
	};
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

		case "complete":
			return "victory";

		default:
			return "active";
	}
}
