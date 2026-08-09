import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "colossal_piranhasaur",
	name: "Colossal Piranhasaur",
	portrait: "enemies/ocean/colossal_piranhasaur.png",
	rank: "normal",
	threat: 19,
	attributes: {
		strength: 22,
		dexterity: 10,
		constitution: 20,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 16,
		damageAffinities: {
			resistances: ["cold"],
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
		skillIds: ["knock_down", "double_strike", "powerful_blow"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
