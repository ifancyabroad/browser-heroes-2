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
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["cripple"],
		featIds: ["acrobatic_training"],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "dexterity"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
