import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "giant_yeti",
	name: "Giant Yeti",
	portrait: "enemies/dungeon/giant_yeti.png",
	rank: "normal",
	threat: 25,
	attributes: {
		strength: 24,
		dexterity: 14,
		constitution: 22,
		intelligence: 6,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDie: "1d10",
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
				dice: "2d8",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "deafening_roar", "tenderise"],
		featIds: [],
		tactic: "aggressive",
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
