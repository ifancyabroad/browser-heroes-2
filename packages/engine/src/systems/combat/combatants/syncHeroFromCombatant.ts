import type { CombatantState, HeroState } from "../../../schemas";
import { adjustCurrentHpForMaxHpChange } from "../../health/adjustCurrentHpForMaxHpChange";
import { getEffectiveCombatStatValue } from "../effects/getEffectiveCombatStatValue";

export function syncHeroFromPlayerCombatant(hero: HeroState, player: CombatantState): HeroState {
	const temporaryMaxHpDelta =
		getEffectiveCombatStatValue(player, "maxHpBonus") - player.combatStats.maxHpBonus;

	return {
		...hero,
		currentHp: adjustCurrentHpForMaxHpChange(player.currentHp, -temporaryMaxHpDelta),

		skills: hero.skills.map((heroSkill) => {
			const combatSkill = player.skills.find((skill) => skill.skillId === heroSkill.skillId);

			if (!combatSkill) {
				return heroSkill;
			}

			return {
				...heroSkill,
				chargesRemaining: combatSkill.chargesRemaining,
			};
		}),
	};
}
