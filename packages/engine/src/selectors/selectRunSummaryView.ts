import type { ClassId } from "@app/content";

import type { CombatLogEntry, RunState } from "../schemas";

export type RunSummaryFinalEnemyView = {
	name: string;
};

export type RunSummaryHeroView = {
	name: string;
	classId: ClassId;
};

export type RunSummaryView = {
	hero: RunSummaryHeroView;
	battleNumber: number;
	finalEnemy: RunSummaryFinalEnemyView | null;
	finalMomentLog: readonly CombatLogEntry[];
};

export function selectRunSummaryView(state: RunState): RunSummaryView | null {
	if (state.phase !== "dead") {
		return null;
	}

	const combat = state.combat;

	return {
		hero: {
			name: state.hero.name,
			classId: state.hero.classId,
		},
		battleNumber: state.battleNumber,
		finalEnemy: combat
			? {
					name: combat.enemy.name,
				}
			: null,
		finalMomentLog: combat ? getFinalMomentLog(combat.log) : [],
	};
}

function getFinalMomentLog(entries: readonly CombatLogEntry[]): CombatLogEntry[] {
	let finalEntryIndex = -1;

	for (let index = entries.length - 1; index >= 0; index -= 1) {
		const entry = entries[index];

		if (entry.eventType === "combatant_slain" && entry.actor === "enemy") {
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
