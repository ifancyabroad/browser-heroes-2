import type { Zone } from "@app/content";
import { ZONE_GROUPS } from "../constants/zoneOrder";

export function getZoneOptions(zoneNumber: number): readonly Zone[] {
	return ZONE_GROUPS[(zoneNumber - 1) % ZONE_GROUPS.length];
}
