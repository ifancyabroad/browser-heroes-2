import type { SkillId } from "@app/content";

import type { CombatState } from "../../../schemas";

export function consumePlayerSkillCharge(combat: CombatState, skillId: SkillId): CombatState {
	return {
		...combat,
		player: {
			...combat.player,
			skills: combat.player.skills.map((skill) => {
				if (skill.skillId !== skillId) {
					return skill;
				}

				if (skill.chargesRemaining === undefined) {
					return skill;
				}

				return {
					...skill,
					chargesRemaining: Math.max(0, skill.chargesRemaining - 1),
				};
			}),
		},
	};
}
