import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "hobgoblin",
	name: "Hobgoblin",
	portrait: "enemies/forest/hobgoblin.png",
	rank: "normal",
	threat: 9,
	attributes: {
		strength: 13,
		dexterity: 12,
		constitution: 12,
		intelligence: 10,
		wisdom: 10,
		charisma: 9,
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
			attackRange: "ranged",
			name: "Longbow",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["acrobatic_strike", "cripple"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
