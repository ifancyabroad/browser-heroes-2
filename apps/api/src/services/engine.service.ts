import { applyAction, runStateSchema, type EngineAction, type RunState } from "@app/engine";
import { RunModel } from "../models/run.model";

export async function applyRunAction(input: {
	userId: string;
	runId: string;
	action: EngineAction;
}) {
	const run = await RunModel.findOne({
		_id: input.runId,
		userId: input.userId,
		status: "active",
	});

	if (!run) {
		throw new Error("RUN_NOT_FOUND");
	}

	// Important when loading Schema.Types.Mixed from persistence.
	const currentState = runStateSchema.parse(run.state);

	const result = applyAction(currentState, input.action);
	const nextState = runStateSchema.parse(result.state);

	run.state = nextState;
	run.summary = deriveRunSummary(nextState);
	run.status = deriveRunStatus(nextState);

	if (run.status !== "active") {
		run.completedAt = new Date();
	}

	await run.save();

	return {
		result,
		run,
	};
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
