import { enemies, type Enemy, type Zone } from "@app/content";
import type { CombatState, RunState } from "../../schemas";
import { randomFloat, type RngResult, type RngState } from "../../core/rng";

export const ZONE_ORDER = [
	"plains",
	"forest",
	"hills",
	"dungeon",
	"desert",
	"ocean",
	"castle",
	"tower",
	"volcano",
	"abyss",
] as const satisfies readonly Zone[];

export function selectEnemyForRun(state: RunState): RngResult<Enemy> | null {
	const zone = getZoneForRun(state.zoneNumber);
	const encounterType = getEncounterTypeForBattle(state.battleNumber);
	const candidates = getEncounterCandidates(zone, state.battleNumber, encounterType);

	if (candidates.length === 0) {
		return null;
	}

	return selectWeightedEnemy(state.rngState, candidates);
}

export function getZoneForRun(zoneNumber: number): Zone {
	const index = Math.min(Math.max(0, zoneNumber - 1), ZONE_ORDER.length - 1);

	return ZONE_ORDER[index];
}

export function getEncounterTypeForBattle(battleNumber: number): CombatState["encounterType"] {
	return battleNumber % 10 === 0 ? "boss" : "standard";
}

function getEncounterCandidates(
	zone: Zone,
	battleNumber: number,
	encounterType: CombatState["encounterType"],
): readonly Enemy[] {
	return enemies.filter((enemy) =>
		isEnemyEligibleForEncounter(enemy, zone, battleNumber, encounterType),
	);
}

export function isEnemyEligibleForEncounter(
	enemy: Enemy,
	zone: Zone,
	battleNumber: number,
	encounterType: CombatState["encounterType"],
): boolean {
	return (
		enemy.encounter.zone === zone &&
		isInBattleRange(enemy, battleNumber) &&
		(encounterType === "boss" ? enemy.rank === "boss" : enemy.rank !== "boss")
	);
}

function selectWeightedEnemy(rngState: RngState, candidates: readonly Enemy[]): RngResult<Enemy> {
	const totalWeight = candidates.reduce((sum, enemy) => sum + enemy.encounter.weight, 0);
	const roll = randomFloat(rngState);
	const targetWeight = roll.value * totalWeight;
	let runningWeight = 0;

	for (const enemy of candidates) {
		runningWeight += enemy.encounter.weight;

		if (targetWeight < runningWeight) {
			return {
				value: enemy,
				rngState: roll.rngState,
			};
		}
	}

	return {
		value: candidates[candidates.length - 1],
		rngState: roll.rngState,
	};
}

function isInBattleRange(enemy: Enemy, battleNumber: number): boolean {
	const { minBattle, maxBattle } = enemy.encounter;

	return (
		(minBattle === undefined || battleNumber >= minBattle) &&
		(maxBattle === undefined || battleNumber <= maxBattle)
	);
}
