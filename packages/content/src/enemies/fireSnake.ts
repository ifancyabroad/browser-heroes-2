import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_snake",
	name: "Fire Snake",
	portrait: "enemies/volcano/fire_snake.png",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 19,
		dexterity: 14,
		constitution: 12,
		intelligence: 1,
		wisdom: 10,
		charisma: 3,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		damageAffinities: {
			resistances: ["fire", "lightning"],
			immunities: [],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["constrict", "flame_bite"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
