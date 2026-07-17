import type { EngineResult, RunState } from "@app/engine";
import type { ApplyRunActionResponse, RunSummaryView, RunView } from "@app/shared";
import type { RunDocument } from "../models/run.model";

function toIsoString(value: Date): string {
	return value.toISOString();
}

export function toRunSummary(state: RunState): RunSummaryView {
	return {
		heroName: state.hero.name,
		classId: state.hero.classId,
		level: state.hero.level,
		battleNumber: state.battleNumber,
		zoneNumber: state.zoneNumber,
		endlessCycle: state.endlessCycle,
		day: state.day,
		kills: state.kills,
	};
}

export function toRunView(run: RunDocument & { _id: unknown }): RunView {
	return {
		id: String(run._id),
		status: run.status,
		summary: run.summary,
		state: run.state,
		createdAt: toIsoString(run.createdAt),
		updatedAt: toIsoString(run.updatedAt),
		completedAt: run.completedAt ? toIsoString(run.completedAt) : null,
	};
}

export function toApplyRunActionResponse(
	run: RunDocument & { _id: unknown },
	result: EngineResult,
): ApplyRunActionResponse {
	return {
		run: toRunView(run),
		result,
	};
}
