import type { EngineErrorCode, EngineEvent, EngineResult, RunState } from "../schemas";

export function successResult(state: RunState, events: EngineEvent[] = []): EngineResult {
	return {
		ok: true,
		state,
		events,
	};
}

export function failureResult(
	state: RunState,
	error: EngineErrorCode,
	events: EngineEvent[] = [],
): EngineResult {
	return {
		ok: false,
		state,
		events,
		error,
	};
}
