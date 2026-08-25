import type { Zone } from "@app/content";

import { ZONE_ORDER } from "../constants/zoneOrder";

export function getZoneForRun(zoneNumber: number): Zone {
	const index = (((zoneNumber - 1) % ZONE_ORDER.length) + ZONE_ORDER.length) % ZONE_ORDER.length;

	return ZONE_ORDER[index];
}
