import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_beetle",
	name: "Fire Beetle",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTnsfQ_nzEzn_ochM3?alt=media&token=fd6e145d-18ef-4869-88b7-d35fd0d9d1bb",
	rank: "normal",
	level: 12,
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
		maxHp: 82,
		armourClass: 13,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: ["fire"],
			immunities: [],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Bite",
			attackBonus: 4,
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
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
