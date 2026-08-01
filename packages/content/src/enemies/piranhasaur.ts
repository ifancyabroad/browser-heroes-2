import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "piranhasaur",
	name: "Piranhasaur",
	portrait: "enemies/ocean/piranhasaur.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 16,
		dexterity: 14,
		constitution: 14,
		intelligence: 6,
		wisdom: 12,
		charisma: 5,
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
				dice: "1d6",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["cold_bite", "detect_blood"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "dexterity"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
