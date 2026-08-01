import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "colossal_piranhasaur",
	name: "Colossal Piranhasaur",
	portrait: "enemies/ocean/colossal_piranhasaur.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 22,
		dexterity: 10,
		constitution: 20,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 16,
		damageAffinities: {
			resistances: ["cold"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+2",
				type: "crushing",
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
