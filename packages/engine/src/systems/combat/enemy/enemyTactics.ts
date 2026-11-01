import type { Tactic } from "@app/content";
import type { EnemyActionCandidate, EnemyActionCategory } from "./enemyActions";

export type StandardEnemyTactic = Exclude<Tactic, "conceder" | "binkus">;
export type EnemyBehaviour = Exclude<StandardEnemyTactic, "aggressive" | "defensive">;

const BEHAVIOUR_WEIGHTS = {
	default: { basicAttack: 6, standard: 6, setup: 48, recovery: 72 },
	caster: { basicAttack: 1, standard: 6, setup: 48, recovery: 72 },
	random: { basicAttack: 1, standard: 1, setup: 1, recovery: 1 },
} satisfies Record<EnemyBehaviour, Record<EnemyActionCategory, number>>;

export function normalizeEnemyTactic(tactic: StandardEnemyTactic): EnemyBehaviour {
	return tactic === "aggressive" || tactic === "defensive" ? "default" : tactic;
}

export function getEnemyActionWeight(
	behaviour: EnemyBehaviour,
	candidate: EnemyActionCandidate,
): number {
	return BEHAVIOUR_WEIGHTS[behaviour][candidate.category];
}
