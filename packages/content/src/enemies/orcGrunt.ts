import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_grunt",
	name: "Orc Grunt",
	portrait: "enemies/plains/orc_grunt.png",
	rank: "normal",
	threat: 11,
	attributes: {
		strength: 16,
		dexterity: 14,
		constitution: 16,
		intelligence: 7,
		wisdom: 11,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Spear",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["armour_break"],
		featIds: ["brute_strength"],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
