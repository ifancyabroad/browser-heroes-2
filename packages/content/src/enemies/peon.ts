import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "peon",
	name: "Peon",
	portrait: "enemies/plains/peon.png",
	rank: "normal",
	threat: 10,
	attributes: {
		strength: 16,
		dexterity: 12,
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
			attackRange: "melee",
			name: "Hammer",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["heavy_strike"],
		featIds: [],
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
