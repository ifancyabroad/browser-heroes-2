import type { Zone } from "@app/content";

import type { CombatLogEntry, RunState } from "../schemas";
import { getZoneForRun } from "../systems/encounters/zones/getZoneForRun";
import { selectHeroView, type HeroView } from "./selectHeroView";

export type RunSummaryOutcome = "dead" | "retired";

export type RunSummaryFinalEnemyView = {
	name: string;
};

export type RunSummaryView = {
	outcome: RunSummaryOutcome;

	hero: HeroView;

	battleNumber: number;
	zone: Zone;
	gold: number;
	xp: number;

	finalEnemy: RunSummaryFinalEnemyView | null;
	finalMomentLog: readonly CombatLogEntry[];
};

export function selectRunSummaryView(state: RunState): RunSummaryView | null {
	if (state.phase !== "dead" && state.phase !== "retired") {
		return null;
	}

	const hero = selectHeroView(state);
	const combat = state.combat;

	return {
		outcome: state.phase,

		hero,

		battleNumber: state.battleNumber,
		zone: getZoneForRun(state.zoneNumber),
		gold: state.gold,
		xp: state.hero.xp,

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
