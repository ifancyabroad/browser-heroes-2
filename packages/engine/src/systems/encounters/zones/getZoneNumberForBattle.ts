import { BATTLES_PER_ENDLESS_CYCLE } from "../../endless/endlessConstants";

const BATTLES_PER_ZONE = 10;

export function getZoneNumberForBattle(battleNumber: number): number {
	const battleNumberInCycle = ((battleNumber - 1) % BATTLES_PER_ENDLESS_CYCLE) + 1;

	return Math.ceil(battleNumberInCycle / BATTLES_PER_ZONE);
}
