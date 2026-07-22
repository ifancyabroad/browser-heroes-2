import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "glompling",
	name: "Glompling",
	portrait: "enemies/forest/glompling.png",
	rank: "normal",
	threat: 5,
	attributes: {
		strength: 7,
		dexterity: 14,
		constitution: 9,
		intelligence: 8,
		wisdom: 7,
		charisma: 8,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 7,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "dexterity",
			},
		},
		skillIds: ["acid_bite"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
