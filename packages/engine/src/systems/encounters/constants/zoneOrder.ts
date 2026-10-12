import type { Zone } from "@app/content";

// Each group occupies one ten-battle difficulty slot. Add alternatives within a group.
export const ZONE_GROUPS = [
	["forest"],
	["castle"],
	["desert"],
	["plains"],
	["hills"],
	["ocean"],
	["volcano"],
	["abyss"],
	["dungeon"],
	["tower"],
] as const satisfies readonly (readonly [Zone, ...Zone[]])[];

// Catalogue order includes every alternative, without adding progression slots.
export const ZONE_ORDER: readonly Zone[] = ZONE_GROUPS.flat();
