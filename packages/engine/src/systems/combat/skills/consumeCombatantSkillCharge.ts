import type { SkillId } from "@app/content";

import type { CombatantSide, CombatState } from "../../../schemas";

import { getCombatant, replaceCombatant } from "../combatants/combatantSelectors";

export function consumeCombatantSkillCharge(
	combat: CombatState,
	combatantSide: CombatantSide,
	skillId: SkillId,
): CombatState {
	const combatant = getCombatant(combat, combatantSide);

	return replaceCombatant(combat, {
		...combatant,
		skills: combatant.skills.map((skill) => {
			if (skill.skillId !== skillId || skill.chargesRemaining === undefined) {
				return skill;
			}

			return {
				...skill,
				chargesRemaining: Math.max(0, skill.chargesRemaining - 1),
			};
		}),
	});
}
