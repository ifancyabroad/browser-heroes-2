import type { RunDocument } from "../models/run.model";

export function toRunView(run: RunDocument & { _id: unknown }) {
	return {
		id: String(run._id),
		status: run.status,
		summary: run.summary,
		state: run.state,
		createdAt: run.createdAt,
		updatedAt: run.updatedAt,
		completedAt: run.completedAt ?? null,
	};
}
