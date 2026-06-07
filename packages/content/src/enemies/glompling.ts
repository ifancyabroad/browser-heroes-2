import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "glompling",
	name: "Glompling",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkUQSsszVLO_4PrBQy?alt=media&token=1bfab329-0a88-42a0-99e2-c0fd7e915fed",
	rank: "normal",
	level: 5,
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
		hitDice: "5d8+7",
		armourClass: 7,
		proficiencyBonus: 3,
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
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
