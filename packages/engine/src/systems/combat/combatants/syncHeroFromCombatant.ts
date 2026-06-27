import type { CombatantState, HeroState } from "../../../schemas";

export function syncHeroFromPlayerCombatant(hero: HeroState, player: CombatantState): HeroState {
	return {
		...hero,
		currentHp: player.currentHp,

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
