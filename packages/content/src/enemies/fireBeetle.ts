import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_beetle",
	name: "Fire Beetle",
	portrait: "enemies/volcano/fire_beetle.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 8,
		dexterity: 10,
		constitution: 12,
		intelligence: 1,
		wisdom: 7,
		charisma: 3,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: ["fire"],
			immunities: [],
			vulnerabilities: ["cold"],
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
		skillIds: ["combust"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution", "dexterity"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
