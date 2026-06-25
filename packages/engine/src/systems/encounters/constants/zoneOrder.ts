import type { Zone } from "@app/content";

export const ZONE_ORDER = [
	"forest",
	"castle",
	"desert",
	"plains",
	"hills",
	"ocean",
	"volcano",
	"abyss",
	"dungeon",
	"tower",
] as const satisfies readonly Zone[];
