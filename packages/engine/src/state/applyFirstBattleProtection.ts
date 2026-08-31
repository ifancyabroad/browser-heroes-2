import { SKILLS_BY_ID } from "@app/content";

import { createContextRngState } from "../core/rng";
import type { CombatState } from "../schemas";
import { resolveSkillEffects } from "../systems/combat/skills/resolveSkillEffects";

const ADVENTURERS_GRACE = SKILLS_BY_ID.adventurers_grace;

export function applyFirstBattleProtection(combat: CombatState, seed: string): CombatState {
	const [effect] = ADVENTURERS_GRACE.effects;

	if (ADVENTURERS_GRACE.effects.length !== 1 || effect?.type !== "modifyDamageTaken") {
		throw new Error("Adventurer's Grace must define one incoming-damage modifier");
	}

	return resolveSkillEffects({
		combat,
		actorSide: "player",
		effects: [effect],
		skillId: ADVENTURERS_GRACE.id,
		skillName: ADVENTURERS_GRACE.name,
		rngState: createContextRngState(seed, "first-battle-protection"),
	}).value;
}
