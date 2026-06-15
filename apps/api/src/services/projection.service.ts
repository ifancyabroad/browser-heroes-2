import type { RunView } from "@app/shared";
import type { RunDocument } from "../models/run.model";

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
