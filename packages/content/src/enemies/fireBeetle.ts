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
		hitDice: "12d8+28",
		armourClass: 13,
		proficiencyBonus: 4,
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
		skills: [
			{
				skillId: "combust",
				rank: 2,
			},
		],
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
