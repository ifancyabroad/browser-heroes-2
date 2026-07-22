import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_engineer",
	name: "Goblin Engineer",
	portrait: "enemies/abyss/goblin_engineer.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 10,
		intelligence: 10,
		wisdom: 8,
		charisma: 8,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 12,
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
		skillIds: ["acid_bomb", "poison_bomb"],
		featIds: ["corrosive_craft"],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
