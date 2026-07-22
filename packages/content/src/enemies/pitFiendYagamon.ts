import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "pit_fiend_yagamon",
	name: "Pit Fiend Yagamon",
	portrait: "enemies/volcano/pit_fiend_yagamon.png",
	rank: "boss",
	threat: 22,
	attributes: {
		strength: 26,
		dexterity: 14,
		constitution: 24,
		intelligence: 22,
		wisdom: 18,
		charisma: 24,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 20,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "fireball", "fire_strike", "yagamons_revenge"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "charisma"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
