import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "flame_shrieker",
	name: "Flame Shrieker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O1g2suyagydsOiCLMPZ?alt=media&token=2220862d-2939-4c71-a1b7-c0c9635fabfd",
	rank: "normal",
	level: 14,
	threat: 14,
	attributes: {
		strength: 18,
		dexterity: 16,
		constitution: 14,
		intelligence: 3,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		maxHp: 108,
		armourClass: 14,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackBonus: 9,
			damage: {
				dice: "1d8",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["burning_rampage", "deafening_screech", "leap_attack"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
