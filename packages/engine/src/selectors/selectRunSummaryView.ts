import type { ClassId } from "@app/content";

import type { CombatLogEntry, RunState } from "../schemas";

export type RunSummaryFinalEnemyView = {
	name: string;
};

export type RunSummaryHeroView = {
	name: string;
	classId: ClassId;
	level: number;
};

export type RunSummaryView = {
	status: "dead" | "retired";
	hero: RunSummaryHeroView;
	battleNumber: number;
	zoneNumber: number;
	gold: number;
	streak: number;
	finalEnemy: RunSummaryFinalEnemyView | null;
	finalMomentLog: readonly CombatLogEntry[];
};

export function selectRunSummaryView(state: RunState): RunSummaryView | null {
	if (state.phase !== "dead" && state.phase !== "retired") {
		return null;
	}

	const combat = state.combat;
	const finalMomentActor = state.phase === "dead" ? "enemy" : "player";

	return {
		status: state.phase,
		hero: {
			name: state.hero.name,
			classId: state.hero.classId,
			level: state.hero.level,
		},
		battleNumber: state.battleNumber,
		zoneNumber: state.zoneNumber,
		gold: state.gold,
		streak: state.streak,
		finalEnemy: combat
			? {
					name: combat.enemy.name,
				}
			: null,
		finalMomentLog: combat ? getFinalMomentLog(combat.log, finalMomentActor) : [],
	};
}

function getFinalMomentLog(
	entries: readonly CombatLogEntry[],
	finalMomentActor: CombatLogEntry["actor"],
): CombatLogEntry[] {
	let finalEntryIndex = -1;

	for (let index = entries.length - 1; index >= 0; index -= 1) {
		const entry = entries[index];

		if (entry.eventType === "combatant_slain" && entry.actor === finalMomentActor) {
			finalEntryIndex = index;
			break;
		}
	}

	if (finalEntryIndex === -1) {
		return [];
	}

	const finalTurnNumber = entries[finalEntryIndex].turnNumber;
	let firstFinalTurnEntryIndex = finalEntryIndex;

	while (
		firstFinalTurnEntryIndex > 0 &&
		entries[firstFinalTurnEntryIndex - 1].turnNumber === finalTurnNumber
	) {
		firstFinalTurnEntryIndex -= 1;
	}

	return entries.slice(firstFinalTurnEntryIndex, finalEntryIndex + 1);
}
