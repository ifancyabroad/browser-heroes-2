import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "lurker",
	name: "Lurker",
	portrait: "enemies/abyss/lurker.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 20,
		dexterity: 10,
		constitution: 20,
		intelligence: 5,
		wisdom: 12,
		charisma: 13,
	},
	combat: {
		hitDie: "1d8",
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
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "obliterate", "powerful_blow"],
		featIds: [],
		tactic: "default",
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
