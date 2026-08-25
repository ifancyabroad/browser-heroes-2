import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_drake",
	name: "Fire Drake",
	portrait: "enemies/volcano/fire_drake.png",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 21,
		dexterity: 13,
		constitution: 18,
		intelligence: 14,
		wisdom: 11,
		charisma: 19,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 17,
		damageAffinities: {
			resistances: ["lightning"],
			immunities: ["fire"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["fire_breath", "drop_from_above"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "dexterity"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
