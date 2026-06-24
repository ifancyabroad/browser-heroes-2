import type { Zone } from "@app/content";

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
