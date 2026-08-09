import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "lurker",
	name: "Lurker",
	portrait: "enemies/abyss/lurker.png",
	rank: "normal",
	threat: 23,
	attributes: {
		strength: 20,
		dexterity: 10,
		constitution: 20,
		intelligence: 5,
		wisdom: 12,
		charisma: 13,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 16,
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
			name: "Claws",
			attackAttribute: "strength",
			damage: {
				dice: "2d8",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "obliterate", "powerful_blow"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
