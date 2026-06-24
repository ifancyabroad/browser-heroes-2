import type { Zone } from "@app/content";

import { ZONE_ORDER } from "../constants/zoneOrder";

export function getZoneForRun(zoneNumber: number): Zone {
	const index = Math.min(Math.max(0, zoneNumber - 1), ZONE_ORDER.length - 1);

	return ZONE_ORDER[index];
}
