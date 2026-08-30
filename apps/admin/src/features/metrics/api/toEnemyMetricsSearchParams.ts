import { enemyBattleBands, type EnemyMetricsQuery } from "../types";
import { toMetricsSearchParams } from "./toMetricsSearchParams";

export type EnemyMetricsSearchParams = {
	from: string;
	to: string;
	mode?: "normal" | "dailyChallenge";
	classId?: string;
	encounterType?: "standard" | "boss" | "ghost";
	battleFrom?: number;
	battleTo?: number;
	minCombats: number;
};

export function toEnemyMetricsSearchParams(query: EnemyMetricsQuery): EnemyMetricsSearchParams {
	const searchParams: EnemyMetricsSearchParams = {
		...toMetricsSearchParams(query),
		minCombats: query.minCombats,
	};
	const battleBand = enemyBattleBands.find(({ value }) => value === query.battleBand);

	if (query.classId) {
		searchParams.classId = query.classId;
	}
	if (query.encounterType !== "all") {
		searchParams.encounterType = query.encounterType;
	}
	if (battleBand?.from !== null && battleBand?.from !== undefined) {
		searchParams.battleFrom = battleBand.from;
	}
	if (battleBand?.to !== null && battleBand?.to !== undefined) {
		searchParams.battleTo = battleBand.to;
	}

	return searchParams;
}
