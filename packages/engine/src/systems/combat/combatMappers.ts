import type { CombatantState, HeroState, RunState } from "../../schemas";

export function createPlayerCombatantFromHero(hero: HeroState): CombatantState {
	return {
		id: "player",
		side: "player",
		name: hero.name,
		level: hero.level,
		maxHp: hero.maxHp,
		currentHp: hero.currentHp,
		stats: hero.stats,
		skills: hero.skills,
		items: hero.items,
		activeEffects: [],
		isDead: hero.currentHp <= 0,
	};
}

export function createEnemyCombatantForRun(state: RunState): CombatantState {
	const maxHp = 20 + state.battleNumber * 2;

	return {
		id: "enemy",
		side: "enemy",
		name: `Enemy ${state.battleNumber}`,
		level: state.zoneNumber,
		maxHp,
		currentHp: maxHp,
		stats: {
			attack: 4 + state.zoneNumber,
			defense: 2 + state.zoneNumber,
			speed: 1,
		},
		skills: [],
		items: [],
		activeEffects: [],
		isDead: false,
	};
}

export function syncHeroFromPlayerCombatant(hero: HeroState, player: CombatantState): HeroState {
	return {
		...hero,
		maxHp: player.maxHp,
		currentHp: player.currentHp,
	};
}
