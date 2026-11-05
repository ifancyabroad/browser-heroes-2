import { SKILLS_BY_ID } from "@app/content";

import type { HeroState } from "../../schemas";

export function isHeroFullyRested(hero: HeroState, maxHp: number): boolean {
	return (
		hero.currentHp >= maxHp &&
		hero.skills.every((skill) => {
			const maxUses = SKILLS_BY_ID[skill.skillId].maxUses;
			return maxUses === undefined || (skill.chargesRemaining ?? 0) >= maxUses;
		})
	);
}
