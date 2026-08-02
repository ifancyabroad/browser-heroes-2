import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "sharkman",
	name: "Sharkman",
	portrait: "enemies/ocean/sharkman.png",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 16,
		dexterity: 15,
		constitution: 16,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: ["cold"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["charge", "detect_blood", "cold_bite", "rend"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
