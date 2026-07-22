import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_drake",
	name: "Fire Drake",
	portrait: "enemies/volcano/fire_drake.png",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 21,
		dexterity: 13,
		constitution: 18,
		intelligence: 14,
		wisdom: 11,
		charisma: 19,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		damageAffinities: {
			resistances: ["fire", "lightning"],
			immunities: [],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+2",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["fire_breath", "drop_from_above"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "charisma"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
