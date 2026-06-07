import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "gremlin_cultist",
	name: "Gremlin Cultist",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9PwVr22rd-Chw1ykw?alt=media&token=1812558e-0bdc-49e0-8074-1ad8680833b4",
	rank: "normal",
	level: 14,
	threat: 14,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 12,
		intelligence: 10,
		wisdom: 16,
		charisma: 12,
	},
	combat: {
		maxHp: 94,
		armourClass: 14,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 4,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["curse", "chosen_by_the_nameless", "drain_life", "power_word_confusion"],
		featIds: [],
		tactic: "caster",
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
