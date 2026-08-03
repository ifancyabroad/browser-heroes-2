import type { Rarity } from "@app/content";

export const SKILL_RARITY_WEIGHTS = {
	common: 1,
	uncommon: 0.6,
	rare: 0.3,
	epic: 0.15,
	legendary: 0.05,
} as const satisfies Record<Rarity, number>;

export function getSkillRarityWeight(rarity: Rarity): number {
	return SKILL_RARITY_WEIGHTS[rarity];
}
