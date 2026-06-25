import type { ApplyRunActionResponse, RunView } from "@app/shared";
import type { RunDocument } from "../models/run.model";
import type { EngineResult } from "@app/engine";

function toIsoString(value: Date): string {
	return value.toISOString();
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
