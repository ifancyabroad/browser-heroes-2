import type { EngineResult, RunState } from "@app/engine";
import type { ApplyRunActionResponse, RunHeroView, RunSummaryView, RunView } from "@app/shared";
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
		hasDefeatedFinalBoss: state.hasDefeatedFinalBoss,
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

export function toRunHeroView(state: RunState): RunHeroView | null {
	if (state.phase !== "dead" && state.phase !== "retired") {
		return null;
	}

	return {
		hero: state.hero,
		run: {
			status: state.phase,
			battleNumber: state.battleNumber,
			zoneNumber: state.zoneNumber,
			endlessCycle: state.endlessCycle,
			day: state.day,
			kills: state.kills,
			gold: state.gold,
			streak: state.streak,
			hasDefeatedFinalBoss: state.hasDefeatedFinalBoss,
		},
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
