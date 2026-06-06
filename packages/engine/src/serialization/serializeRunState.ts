import { runStateSchema, type RunState } from "../schemas";

export function serializeRunState(state: RunState): string {
	const parsed = runStateSchema.parse(state);
	return JSON.stringify(parsed);
}
