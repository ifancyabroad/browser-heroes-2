import type { EngineResult, RunState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";

export function retireRun(state: RunState): EngineResult {
	if (state.phase !== "complete") {
		return failureResult(state, "INVALID_PHASE");
	}

	return successResult(
		{
			...state,
			phase: "retired",
		},
		[
			{
				type: "RUN_RETIRED",
			},
		],
	);
}
