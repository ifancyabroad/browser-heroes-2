import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_grunt",
	name: "Orc Grunt",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-gF7y0QsH82eTrh7n?alt=media&token=3b725386-b016-4347-bdfe-64f4f64d8b21",
	rank: "normal",
	level: 11,
	threat: 11,
	attributes: {
		strength: 16,
		dexterity: 14,
		constitution: 16,
		intelligence: 7,
		wisdom: 11,
		charisma: 10,
	},
	combat: {
		maxHp: 98,
		armourClass: 13,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 7,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["battle_cry", "armour_break"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
