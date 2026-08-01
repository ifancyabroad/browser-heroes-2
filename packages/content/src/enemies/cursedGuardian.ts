import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "cursed_guardian",
	name: "Cursed Guardian",
	portrait: "enemies/abyss/cursed_guardian.png",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 22,
		dexterity: 14,
		constitution: 21,
		intelligence: 5,
		wisdom: 10,
		charisma: 13,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 18,
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
		skillIds: ["obliterate", "devour_soul", "double_strike"],
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
