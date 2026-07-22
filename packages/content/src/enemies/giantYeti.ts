import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "giant_yeti",
	name: "Giant Yeti",
	portrait: "enemies/dungeon/giant_yeti.png",
	rank: "normal",
	threat: 19,
	attributes: {
		strength: 24,
		dexterity: 14,
		constitution: 22,
		intelligence: 6,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 18,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "deafening_roar", "tenderise"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
