import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "damp_high_priestess",
	name: "Damp High Priestess",
	portrait: "enemies/ocean/damp_high_priestess.png",
	rank: "normal",
	threat: 18,
	attributes: {
		strength: 11,
		dexterity: 14,
		constitution: 17,
		intelligence: 16,
		wisdom: 18,
		charisma: 14,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		damageAffinities: {
			resistances: ["cold"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Superior Spear",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+2",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["power_word_fortitude", "cure_major_wounds", "flamestrike", "holy_bolt"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["wisdom", "charisma"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
