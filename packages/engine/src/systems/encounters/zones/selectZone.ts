import type { Zone } from "@app/content";
import { randomInt, type RngState } from "../../../core/rng";
import { getZoneOptions } from "./getZoneOptions";

export function selectZone(zoneNumber: number, rngState: RngState): Zone {
	const options = getZoneOptions(zoneNumber);
	return options[randomInt(rngState, 0, options.length - 1).value];
}
