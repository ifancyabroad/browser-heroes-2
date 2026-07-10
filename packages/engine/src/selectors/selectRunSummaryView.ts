import {
	CLASSES_BY_ID,
	FEATS_BY_ID,
	ITEMS_BY_ID,
	SKILLS_BY_ID,
	type Class,
	type Feat,
	type Item,
	type Skill,
	type Zone,
} from "@app/content";

import type { CombatLogEntry, EquippedItemState, RunState } from "../schemas";

import { getZoneForRun } from "../systems/encounters/zones/getZoneForRun";
import { selectHeroView, type HeroView } from "./selectHeroView";

export type RunSummaryOutcome = "dead" | "retired";

export type RunSummaryEquipmentItemView = {
	slot: keyof HeroView["equipment"];
	equippedItem: EquippedItemState;
	item: Item | null;
};

export type RunSummaryFinalEnemyView = {
	name: string;
	level: number;
	currentHp: number;
	maxHp: number;
};

export type RunSummaryDeathView = {
	slainBy: RunSummaryFinalEnemyView | null;
	finalLogEntry: CombatLogEntry | null;
};

export type RunSummaryView = {
	outcome: RunSummaryOutcome;

	hero: HeroView;
	heroClass: Class | null;

	battleNumber: number;
	zoneNumber: number;
	zone: Zone;
	endlessCycle: number;
	streak: number;
	gold: number;
	xp: number;

	enemiesDefeated: number;

	equipment: readonly RunSummaryEquipmentItemView[];
	skills: readonly Skill[];
	feats: readonly Feat[];

	finalEnemy: RunSummaryFinalEnemyView | null;
	death: RunSummaryDeathView | null;

	finalCombatLog: readonly CombatLogEntry[];
};

export function selectRunSummaryView(state: RunState): RunSummaryView | null {
	if (state.phase !== "dead" && state.phase !== "retired") {
		return null;
	}

	const hero = selectHeroView(state);
	const combat = state.combat;

	const finalEnemy = combat
		? {
				name: combat.enemy.name,
				level: combat.enemy.level,
				currentHp: combat.enemy.currentHp,
				maxHp: combat.enemy.maxHp,
			}
		: null;

	return {
		outcome: state.phase,

		hero,
		heroClass: CLASSES_BY_ID[hero.classId] ?? null,

		battleNumber: state.battleNumber,
		zoneNumber: state.zoneNumber,
		zone: getZoneForRun(state.zoneNumber),
		endlessCycle: state.endlessCycle,
		streak: state.streak,
		gold: state.gold,
		xp: state.hero.xp,

		enemiesDefeated: getEnemiesDefeated(state),

		equipment: getEquipmentSummary(hero),
		skills: state.hero.skills.flatMap((skill) => {
			const skillDefinition = SKILLS_BY_ID[skill.skillId];
			return skillDefinition ? [skillDefinition] : [];
		}),
		feats: hero.featIds.flatMap((featId) => {
			const featDefinition = FEATS_BY_ID[featId];
			return featDefinition ? [featDefinition] : [];
		}),

		finalEnemy,
		death:
			state.phase === "dead"
				? {
						slainBy: finalEnemy,
						finalLogEntry: combat?.log.at(-1) ?? null,
					}
				: null,

		finalCombatLog: combat?.log ?? [],
	};
}

function getEnemiesDefeated(state: RunState): number {
	if (state.phase === "dead") {
		return Math.max(0, state.battleNumber - 1);
	}

	return state.battleNumber;
}

function getEquipmentSummary(hero: HeroView): RunSummaryEquipmentItemView[] {
	return Object.entries(hero.equipment).flatMap(([slot, equippedItem]) => {
		if (!equippedItem) {
			return [];
		}

		return [
			{
				slot: slot as keyof HeroView["equipment"],
				equippedItem,
				item: ITEMS_BY_ID[equippedItem.itemId] ?? null,
			},
		];
	});
}
