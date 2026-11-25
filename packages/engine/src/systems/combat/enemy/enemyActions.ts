import type { SkillId } from "@app/content";

export type EnemyAction =
	| { type: "basicAttack" }
	| { type: "skill"; skillId: SkillId }
	| { type: "skip" };
export type EnemySkillCategory = "standard" | "setup" | "recovery";
export type EnemyActionCategory = "basicAttack" | EnemySkillCategory;

export type EnemyActionCandidate = {
	action: Exclude<EnemyAction, { type: "skip" }>;
	category: EnemyActionCategory;
};

export type EnemyActionOptions =
	| { type: "choices"; candidates: EnemyActionCandidate[] }
	| { type: "fallback"; action: { type: "basicAttack" } | { type: "skip" } };

export function getPreferredSkillCategory(
	categories: readonly (EnemySkillCategory | null)[],
): EnemySkillCategory | null {
	if (categories.includes("recovery")) {
		return "recovery";
	}
	if (categories.includes("setup")) {
		return "setup";
	}
	return categories.includes("standard") ? "standard" : null;
}
