import type { RunState } from "@app/engine";

export function isPlayableRunState(state: RunState): boolean {
	return state.phase === "town" || state.phase === "combat";
}
