import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "runtling",
	name: "Runtling",
	portrait: "enemies/forest/runtling.png",
	rank: "normal",
	threat: 4,
	attributes: {
		strength: 8,
		dexterity: 13,
		constitution: 9,
		intelligence: 10,
		wisdom: 8,
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
		skillIds: ["charge", "acid_bite"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "intelligence"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
