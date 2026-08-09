import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_engineer",
	name: "Goblin Engineer",
	portrait: "enemies/abyss/goblin_engineer.png",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 10,
		intelligence: 10,
		wisdom: 8,
		charisma: 8,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Exceptional Dagger",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d4+3",
				type: "piercing",
				attribute: "dexterity",
			},
		},
		skillIds: ["acid_bomb", "acid_trap", "poison_bomb"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
